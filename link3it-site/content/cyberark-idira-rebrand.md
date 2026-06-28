---
title: "CyberArk is now Idira. Here's what actually changes for your PAM program."
category: "CyberArk · Idira · PAM"
date: "2026-06-02"
readingTime: "5 min read"
excerpt: "Palo Alto Networks rebranded CyberArk to Idira. The name on the box changed — almost nothing under the hood did. Here's the practical read for teams running the platform."
---

If you run privileged access management on CyberArk, you've probably seen the news: following Palo Alto Networks' acquisition, **CyberArk is being rebranded to Idira**, folded into Palo Alto's broader identity-security portfolio. If you're a security leader, the immediate question is the practical one — *what does this change for the platform I depend on?*

The short answer: **the name changed, the engineering didn't.** Here's the grounded version.

## What is changing

- **The product name.** CyberArk becomes Idira. Customer-facing materials, login screens, and documentation will rebrand progressively over the coming months.
- **Vendor positioning.** Idira is now positioned as part of the Palo Alto Networks identity-security platform, alongside their other lines. The pitch is a single, integrated identity platform spanning human, machine, and AI-agent identities.
- **Sales and contracting.** Increasingly, these route through Palo Alto Networks account teams rather than standalone CyberArk channels.

## What is *not* changing

This is the part that matters operationally, and it's reassuring:

- **The architecture is the same.** Vault, CPM, PVWA, PSM, and PSMP all remain. The components that do the work — store credentials, rotate them, broker and record sessions — are unchanged.
- **Component names are unchanged.** Palo Alto has not renamed the core components. Historically, component-level renames lag a parent rebrand by a year or more, if they happen at all. In technical contexts, the existing terminology still applies.
- **The engineering skill set carries over completely.** Everything a CyberArk engineer knows still holds. Safe design, rotation policy, session isolation, reconciliation health — none of that is affected by a logo change.
- **Certifications.** The established CyberArk credential paths remain the relevant ones at this time, with no announced replacement program. If you're mid-path, you complete it under the current naming.

> A rebrand changes the name on the box. It does not change whether your credentials are rotating, your sessions are recorded, or your tier-0 safes are scoped correctly.

## The real risk in a transition like this

Here's what actually concerns me as someone who works inside these platforms: **transitions create drift.** When ownership changes, account teams shuffle, and documentation is mid-migration, the routine health of a deployment is exactly the kind of thing that quietly slips. Not because the technology changed — because attention moved.

The deployments most exposed right now aren't the ones worried about the new name. They're the ones where:

- Nobody is certain who owns platform health during the handoff
- A planned upgrade or review got deferred "until the dust settles"
- The team assumes a rebrand implies the configuration was somehow refreshed (it wasn't)

A name change is a good prompt to confirm the fundamentals are still solid — because the one thing a rebrand definitely doesn't do is fix a silent reconciliation failure or a safe that's grown over-permissive.

## What to actually do

If you run the platform, three practical moves:

- **Keep using current component terminology** in runbooks and technical docs. Don't rush to rename internally ahead of the vendor.
- **Confirm ownership of platform health** through the transition — internally and with whichever account team you now work through.
- **Treat the moment as a checkpoint.** If it's been a while since your deployment had an independent review, the rebrand is as good a reason as any to verify it's still configured the way you think it is.

The platform you trusted last month is the same platform this month. It just has a new name — and the same gaps it had before, if nobody's looked lately.

If you want a clear, independent read on where your CyberArk (Idira) deployment actually stands — under either name — that's exactly what a health check is for.
