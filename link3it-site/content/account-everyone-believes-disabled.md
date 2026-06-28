---
title: "The account everyone believes is disabled"
category: "Identity Governance"
date: "2026-05-04"
readingTime: "5 min read"
excerpt: "The scariest failure in automated deprovisioning isn't the account that fails loudly. It's the one that looks terminated on every dashboard while cloud sessions stay alive."
---

When people worry about employee offboarding, they picture the obvious failure: a termination that doesn't run, an account that stays enabled, an ex-employee who can still log in. That failure is real, but it is not the one that should keep you up at night, because it is *visible*. Someone notices. An alert fires. The account is still clearly active.

The failure that actually causes incidents is quieter: the **silent partial success**.

## What partial success looks like

Modern offboarding is rarely a single action. A proper termination is a sequence: disable the Active Directory account, strip group memberships, move the object to a quarantine organizational unit, force a directory sync to the cloud so sessions are revoked, and rotate any privileged credentials the person held.

Now imagine the first three steps succeed and the fourth — the cloud session revocation — throws an error that nobody catches. The account is disabled on-premises. The ticket auto-closes as "terminated." Every dashboard shows the identity as gone.

But the cloud refresh tokens are still alive. To every system anyone looks at, the person is offboarded. In reality they can still reach email, SaaS applications, and anything else that trusts those tokens — for hours, sometimes longer.

> To every dashboard the identity looks gone. In reality it can still log in. That gap between appearance and reality is where the incident lives.

## Why this happens

Deprovisioning pipelines are usually built to optimize for the happy path. When every step succeeds, everything is fine. The trouble is that the steps are not equally reliable. A local AD disable is fast and almost always works. A cloud session revocation depends on a sync cycle, an API call, and token propagation that is eventually-consistent — it can fail or lag in ways the local step never does.

If the pipeline treats "ran the step" as equivalent to "the step worked," a failure in the least reliable step gets papered over by the success of the reliable ones. The overall job reports success because most of it succeeded.

## The fix: verify, don't assume

The principle that closes this gap is simple to state and surprisingly rare to implement: **every step in a termination should be independently verified after it executes, and the termination should refuse to report success unless every verification passes.**

Concretely, that means after disabling the account, confirm it reads as disabled. After stripping groups, confirm zero remain. After the cloud sync, confirm sessions are actually revoked — with a short retry loop, because revocation is eventually-consistent. After rotating vaulted credentials, confirm none of the old ones still validate.

If any verification fails, the identity should be flagged as incompletely deprovisioned — loudly — rather than quietly marked done. A high-severity alert on "this account looks terminated but we could not prove its cloud sessions are dead" is exactly the signal you want, and exactly the one most pipelines never produce.

## Two adjacent gaps worth closing at the same time

While you are hardening termination, two related issues are worth addressing:

- **Ambiguous identity resolution.** Duplicate or recycled usernames mean an HR record can map to more than one directory object. Auto-terminating the wrong "jsmith" is a self-inflicted incident. A safe pipeline disambiguates on a stable key — an employee ID or object GUID — and refuses to act when it cannot resolve to exactly one identity.
- **Structured, correlated audit.** Every step of every termination should emit a structured event with a correlation ID, so a single query can reconstruct what happened to a given identity. When something does go wrong, that audit trail is the difference between a five-minute answer and a frantic afternoon.

## The takeaway

Offboarding is not done when the account is disabled. It is done when every layer of access — on-premises, cloud, and privileged — has been *verified* closed. The difference between those two definitions is the account everyone believes is disabled, and it is worth engineering out of your process deliberately.
