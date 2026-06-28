---
title: "The three CyberArk gaps we find in almost every health check"
category: "CyberArk · PAM"
date: "2026-05-20"
readingTime: "6 min read"
excerpt: "A PAM platform that's installed isn't the same as one that's protecting you. The most common gaps aren't exotic — they're quiet drift that no dashboard surfaces until something breaks."
---

A privileged access management platform that has been *installed* is not the same as one that is *protecting you*. That distinction is where most of the risk lives, and it is the single most common misunderstanding we encounter when we open up a CyberArk environment for review.

The gaps we find are rarely exotic. There is almost never a single dramatic misconfiguration. Instead there is quiet drift — small deviations that accumulate over months and years, none of which trip an alarm, until the day someone needs the control to work and discovers it has not been working for a long time.

Three patterns show up in almost every engagement.

## 1. Reconciliation is failing silently

When the Central Policy Manager cannot verify a managed account, it is supposed to reconcile — to reset the credential to a known value and bring it back under management. That self-healing behavior is one of the core reasons to run PAM in the first place.

But reconciliation only works if the reconciliation account has the rights to perform the reset on the target system. Those rights get revoked during an unrelated cleanup, or the account itself gets disabled, or the target's local policy changes. From that point on, every failed verification stays failed. The accounts sit in an error state that nobody is watching, and the credentials they hold quietly stop rotating.

The dangerous part is the *appearance* of management. The account shows up in the vault. It looks managed. Everyone assumes it is rotating. In reality the password has been static for months, and if it leaked before it was vaulted, that exposure has never been closed.

> A credential believed to be rotating is, in practice, static. That is worse than an unmanaged credential, because it carries false confidence.

## 2. Accounts are vaulted but excluded from rotation

This one almost always starts with good intentions. A service account or an application identity gets onboarded to a safe, but rotating it would break a dependent system — a scheduled task, an integration, a legacy app that has the password hardcoded somewhere. So the account is added to the vault but excluded from automatic rotation, "temporarily," while someone figures out the dependency.

Temporary becomes permanent. The dependency is never mapped, the exclusion is never revisited, and the credential never changes. You end up with privileged accounts that are technically in the vault — which looks like progress on every report — but functionally are no better protected than they were before.

The fix is not to force rotation and break production. It is to **map the dependency, stage the change, and rotate deliberately** — and in the meantime to track every excluded account as an open risk item rather than letting it disappear into the vault's "managed" count.

## 3. Safe membership has quietly grown

Least privilege is the entire point of a vault. But safe membership tends to expand over time through convenience grants and nested group memberships that were never intended to reach privileged credentials.

We frequently find that the safe holding tier-0 credentials — Domain Admin, enterprise admin, the genuinely dangerous accounts — is reachable by far more people than anyone realizes, often via a group that was added for one person two years ago and never trimmed. The blast radius of any one of those identities being compromised now includes the keys to the entire domain.

The remediation is unglamorous but high-impact: re-baseline membership to a named, justified set, remove the nested-group grants, and ideally require dual control for retrieval of the most sensitive credentials.

## The pattern underneath all three

None of these are platform failures. CyberArk is doing exactly what it was configured to do. The problem is that the configuration drifted away from intent, and nothing in the day-to-day operation of the platform makes that drift visible.

That is precisely why a periodic health check matters. Not because the platform is bad, but because *any* control degrades without verification — and privileged access is the last control you want to discover has degraded.

If any of this sounds familiar, a focused health check will surface all three with evidence, ranked by risk, and give you a remediation path that closes the highest-risk gaps first.
