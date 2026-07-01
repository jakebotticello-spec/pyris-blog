---
title: "Build Log: Architecting Cypher — The Auxiliary Brain We're Building for Ourselves First"
slug: "build-log-1-cypher-auxiliary-brain"
description: "Pyris Build Log Entry: A look behind the curtain at Cypher — the institutional-memory system we're building, why it surfaces patterns instead of making decisions, and the node-map that came out of it."
date: "2026-06-14"
icon: "integration_instructions"
---

*Most of what we publish here is educational — how to scale operations, [how to implement AI](/blog/how-to-implement-ai-in-small-business/) without joining the failure pile, how to keep your systems from drifting. This is different. This is a build log: an honest look at what we're actually building in the workshop, why, and what we're learning. We build serious systems for our clients, and we build them for ourselves first. This is one of the ones we're building for ourselves.*

![Cypher's AstroSynapses node map — the company's institutional memory rendered as a brain-like field of connected nodes](/blog/astro-1.png)

---

**What if your business had a *working* memory?**  

Every company has a memory problem it's learned to live with. Not a data problem — companies are drowning in data. A *memory* problem. The data is all there, sitting in the Slack threads and the docs and the recorded calls and the dead Notion pages. What's gone is the *why.* Why we killed that product line. What the person who left actually knew. Which objection really keeps killing deals — not the tidy one in the CRM dropdown, the real one, worded forty different ways across forty lost-deal notes.

The company experienced all of it. It just can't *remember* it, because the memory walked out with the people, and every tool built to fix this throws away the only part that mattered — the reasoning, the dead ends, the verbatim record of how the call actually got made.

I've been chewing on this problem for a while, and we're building something for it. We call it *Cypher*.

Fair warning before I go further: **this is a big idea on a piece of paper that's becoming a real thing slowly.** I'm not going to oversell it. It's early. But the architecture is live in a working deployment, the thing does what it's supposed to do, and it produced a visual I think is genuinely cool — so I want to show you the shape of it.

**What's in this one:**

- [The Problem Nobody Prices Correctly](#the-problem)
- [What Cypher Is (Four Ideas That Don't Usually Sit Together)](#what-cypher-is)
- [The Part That's Actually New: Roaming Intelligence](#roaming)
- [The Wall: It Surfaces, It Never Rules](#the-wall)
- [The Node Map](#node-map)
- [Why We're Building Our Own First](#own-first)

<a id="the-problem"></a>

## The Problem Nobody Prices Correctly

Companies pay to solve this all the time — they just don't recognize it as one problem. They buy a knowledge base, which retrieves documents but doesn't hold judgment; it gives you the sanitized retro, not the argument that produced it. You get the *what*, but not the *why*. They hire a strategy consultant, who finds the cross-silo insight nobody inside could see — brilliant, expensive, and gone in ninety days, taking all the context with them. So eighteen months later they hire a different firm to rediscover what the last one found.

The single most expensive thing a company owns is the accumulated reasoning of everyone who ever worked there. And it evaporates a little more with every departure, every reorg, every "wait, why did we decide that again?" Nobody puts a line item on it because it doesn't show up missing until you need it.

That's the problem Cypher is built around.

<a id="what-cypher-is"></a>

## What Cypher Is (Four Ideas That Don't Usually Sit Together)

Cypher is an institutional auxiliary brain. Four layers, and the interesting part is that they don't normally appear in the same system:

**The Floor** — an immutable, verbatim record of how the company actually reasoned. Decisions, debates, the dead ends and the failures held at the same resolution as the wins. Not summarized. Not cleaned into a highlight reel. The actual record, held permanently and read by pointer, never reworded. Most systems put their intelligence in storage — better search, smarter index. Cypher leaves storage deliberately dumb and puts the intelligence in the *reading*. The floor is a vault; the genius — I think, anyway — is in how it gets recalled and recombined.

**The Read** — ask it anything about the company's own history — what did we decide about X, why, who pushed back — and it reads the full record into a true, sourced answer. Not a search result. A comprehended account of what actually happened, with receipts.

**The Roam** — the part no one else has. More on that below; it's the core.

**The Filter** — a role-aware layer that learns, from feedback, what *this* company's people actually need surfaced, and to whom. It becomes the company's taste for its own blind spots, sharpening every week.

Vault, librarian, consultant, chief of staff. One brain.

<a id="roaming"></a>

## The Part That's Actually New: Roaming Intelligence

Here's the piece I'm most interested in, because I haven't seen anyone else build it.

Every retrieval tool on the market is bounded by the query. You can only ever find what you thought to ask. Search *answers* questions — it cannot *find* them. Cypher's roaming layer is bounded by nothing. Its entire job is to wander the full corpus (the full written record, "The Floor" above) with no query and no target, looking for the thing nobody asked about: the cross-domain rhyme. The churn pattern in the support tickets that rhymes with the objection the lost deals keep hitting that rhymes with the risk an engineer flagged in a doc no one read.

No single person in a company can see that, structurally — because every person lives in one silo. Support sees support. Sales sees sales. Cypher sees the shape across all of them and surfaces it: *these three things you're treating as separate problems are one problem — did you notice?*

That's the deliverable companies pay consultants millions for, once. Cypher does it continuously, on the full record, and it never leaves.

<a id="the-wall"></a>

## The Wall: It Surfaces, It Never Rules

This is the part I care about most, and it's not a feature we bolted on for safety — it's the conviction the whole thing was built around.

**Cypher does not decide.** It doesn't approve, it doesn't recommend-as-truth, it doesn't take accountability for a call. It brings the pattern to the human who owns the decision and it stops there. The human decides. Always.

That's not a limitation. It's the entire reason a system like this is safe to let into a business. There's no accountable machine in the loop, no liability transfer, no automated judgment you'd have to audit. An advisor that never takes the wheel. The org's accountability stays exactly where it legally and culturally has to.

Most of the industry is racing the other direction, toward AI that decides, because deciding demos better. I think they're all building toward a wall they'll eventually hit. We started on the other side of it.

<a id="node-map"></a>

## The Node Map

Here's the thing I actually wanted to show you. As part of building the comprehension layer, we built a tool that maps the corpus — every node a piece of reasoning, every edge a connection the system found between them. We call it AstroSynapses. This is what the institutional memory *looks like* when you render it:

![AstroSynapses — the full corpus rendered as a node map: 8,288 nodes and 49,078 synapses forming an organic, brain-like silhouette against a dark field](/blog/astro-3.png)

*Above: AstroSynapses, the corpus Cypher reads, rendered whole — 8,288 nodes, 49,078 synapses, every line a real connection (cosine similarity in 384 dimensions) the system found between two pieces of reasoning. The overall silhouette is a projection artifact, not a real shape — but the local structure, the clusters and the bridges between them, is genuine. This is what "remembering the why" looks like when you can finally see it.*

I'm not going to pretend the picture *is* the product — it's a visualization, and a visualization is not a deliverable. But it's a real render of a real corpus in a real deployment, and it maps something companies have never been able to see: the actual shape of their own accumulated reasoning, with the cross-silo connections drawn in. The first time it rendered, it was hard not to stare at it. (And in the spirit of not overselling: that brain-like outline is partly an artifact of squashing 384 dimensions down to two for your screen — the honest version is in the fine print on the render itself. The *connections* are real; the silhouette is the projection's editorializing.) But — I needed to *see* what the connections looked like. I got tired of staring at numbers and counts. So… here's what it looks like.

<a id="own-first"></a>

## Why We're Building Our Own First

We build systems for clients. We also build them for ourselves — and we build ours first, on purpose, because we refuse to sell a thing we haven't run in our own shop under real conditions. Cypher is the institutional memory *we* wanted: something that holds the reasoning behind everything we've built, catches the patterns across our own work that no single project window can see, and makes sure our own agents never drift onto a stale instruction. We're our own first hard test case.

Where it goes from here — whether the single-subject version becomes the org-scale version, on what timeline — is genuinely still being figured out. It's a big idea on paper that's earning its way into being real one proven layer at a time. It's one of those projects whose architecture has to be torn apart and put back together repeatedly at every step, *because it's new ground*. That's the honest status, and I'd rather give you the honest status than the pitch.

But that's the workshop right now. That's what we're building. And if you want the people building *this* to build *yours* —

**[Let's talk](https://pyrisconsulting.com/#cyris).** 20 minutes, no pitch deck. Bring us the chaos; we like the hard ones.

---

*Jake Botticello is the founder of [Pyris Consulting](https://pyrisconsulting.com). This is the latest entry in the Pyris build log — an ongoing, honest look at what we're building in the workshop. More to come, every time we ship something worth showing.*
