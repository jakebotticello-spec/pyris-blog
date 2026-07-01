import fs from 'fs';
import path from 'path';

const STATIC_DIR = '.vercel/output/static';
const BLOG_DIR = '.vercel/output/static/blog';
const CONFIG_PATH = '.vercel/output/config.json';
const OLD_ASTRO_ROUTE = '^/_astro/(.*)$';
const NEW_ASTRO_ROUTE = '^/blog/_astro/(.*)$';

fs.mkdirSync(BLOG_DIR, { recursive: true });

const entries = fs.readdirSync(STATIC_DIR, { withFileTypes: true });

const dirsToMove = entries
  .filter(e => e.isDirectory() && e.name !== 'blog')
  .map(e => e.name);

const filesToMove = entries
  .filter(e => e.isFile() && (e.name === 'index.html' || /^sitemap.*\.xml$/.test(e.name)))
  .map(e => e.name);

// GUARD: scan all HTML files being moved for root-absolute refs not under /blog/
const htmlFilesToCheck = [
  ...filesToMove.filter(f => f.endsWith('.html')).map(f => path.join(STATIC_DIR, f)),
  ...dirsToMove.map(d => path.join(STATIC_DIR, d, 'index.html')),
];

const badRefs = [];
for (const htmlFile of htmlFilesToCheck) {
  if (!fs.existsSync(htmlFile)) continue;
  const content = fs.readFileSync(htmlFile, 'utf8');
  const matches = [...content.matchAll(/(?:href|src)="(\/[^"#][^"]*)"/g)];
  for (const [, ref] of matches) {
    if (!ref.startsWith('/blog/') && !ref.startsWith('//')) {
      badRefs.push(`${htmlFile}: ${ref}`);
    }
  }
}

if (badRefs.length > 0) {
  console.error('GUARD FAILED — root-absolute refs found that are not under /blog/:');
  for (const r of badRefs) console.error('  ' + r);
  process.exit(1);
}

// Move directories
for (const dir of dirsToMove) {
  const src = path.join(STATIC_DIR, dir);
  const dest = path.join(BLOG_DIR, dir);
  if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true, force: true });
  fs.renameSync(src, dest);
  console.log(`moved dir  ${dir} → blog/${dir}`);
}

// Move files
for (const file of filesToMove) {
  const src = path.join(STATIC_DIR, file);
  const dest = path.join(BLOG_DIR, file);
  if (fs.existsSync(dest)) fs.rmSync(dest);
  fs.renameSync(src, dest);
  console.log(`moved file ${file} → blog/${file}`);
}

// Patch config.json
const raw = fs.readFileSync(CONFIG_PATH, 'utf8');
const config = JSON.parse(raw);

const route = config.routes?.find(r => r.src === NEW_ASTRO_ROUTE);
if (route) {
  console.log('config.json _astro route already patched — skipping');
} else {
  const oldRoute = config.routes?.find(r => r.src === OLD_ASTRO_ROUTE);
  if (!oldRoute) {
    console.error('FATAL — could not find _astro route in config.json (neither old nor new form)');
    process.exit(1);
  }
  oldRoute.src = NEW_ASTRO_ROUTE;
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
  console.log(`patched config.json: ${OLD_ASTRO_ROUTE} → ${NEW_ASTRO_ROUTE}`);
}

console.log('post-build complete');
