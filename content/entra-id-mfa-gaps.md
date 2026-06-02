---
title: "Your MFA is on. Here's where the gaps still hide."
category: "Microsoft · Entra ID"
date: "2026-05-12"
readingTime: "5 min read"
excerpt: "\"We require MFA\" is rarely the whole story. Cloud identity gaps tend to live in the exceptions — the carve-outs and legacy paths that were meant to be temporary."
---

"We require MFA across the organization" is one of the most common things a security team will tell you, and it is almost never the whole story. Multi-factor authentication is rarely *off* — but coverage has holes, and those holes tend to live in the exceptions rather than the rule.

When we assess a Microsoft Entra ID tenant, the MFA gaps cluster in three places. Each one started as a reasonable decision.

## 1. Legacy authentication is still permitted

Older authentication protocols — the ones used by legacy mail clients and some line-of-business apps — predate modern controls and can bypass Conditional Access entirely. If legacy authentication is not explicitly blocked, an attacker can often authenticate through one of these paths and never be prompted for a second factor.

This is the gap that quietly undoes everything else. You can have a beautifully constructed Conditional Access policy requiring MFA on every modern sign-in, and it accomplishes nothing for an account that can still authenticate over a legacy protocol.

The fix is to **block legacy authentication outright**, then handle the handful of genuine dependencies as narrow, monitored exceptions rather than leaving the whole door open.

## 2. Exclusion groups that grew

Almost every Conditional Access policy starts with a small, sensible exclusion. Break-glass emergency-access accounts must be excluded from MFA enforcement, because if your MFA provider has an outage you still need a way in. That is correct and necessary.

The problem is what happens next. Over time, more accounts get added to that exclusion — a service account here, a contractor there, an executive who travels and kept getting locked out. Each addition felt justified in the moment. Nobody ever removes anything. The exclusion that was meant for two break-glass accounts now quietly contains eleven identities, and every one of them is exempt from the control you believe is universal.

> The exclusion list is where MFA coverage goes to erode. It almost never shrinks on its own.

The remediation is straightforward and worth doing on a schedule: **audit every Conditional Access exclusion, confirm each one is still justified, and remove the rest.**

## 3. Privileged roles without just-in-time

Standing privileged role assignments — a permanent Global Administrator, for instance — are a high-value, always-available target. If that account is compromised, the attacker inherits standing tenant-wide control.

Privileged Identity Management (PIM) shrinks that window dramatically by making elevation just-in-time: the role is dormant until someone activates it, with approval and a time limit. The privilege exists only when it is being used. We frequently find tenants with several permanent Global Administrators where just-in-time elevation would reduce the standing attack surface to near zero with almost no operational cost.

## The theme: assume nothing, verify coverage

The common thread is that "we require MFA" is a statement of *intent*, and the gaps live in the distance between intent and *coverage*. The only way to close that distance is to verify — to actually map who is covered, who is excluded, which protocols can bypass the controls, and where standing privilege still sits.

An Entra ID assessment produces exactly that map, so the real gaps become visible rather than assumed.
