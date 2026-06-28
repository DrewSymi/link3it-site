# Link3IT — The Mark

## "The Privileged Path"

The Link3IT mark is the **numeral 3 built as an access path**: identities flow
along it and converge at a single secured core at its pinch — the one verified
control point every privileged action must pass through. It compresses the whole
job of identity security into a glyph that is, unmistakably, the 3 in the brand
name.

It is built to be read three ways at once, and each reading is intentional.

### 1. The "3" in Link3IT
The mark *is* the numeral. Not three loose dots hoping to suggest a three — a
single, confident 3 you read instantly. The brand number is the form itself, so
the mark and the wordmark reinforce each other: the 3 in "Link**3**IT" is the same
3 you see in the tile.

### 2. An access path with identities
The 3 isn't drawn as a typographic glyph — it's drawn as a *path*, with identity
nodes at its terminals. That's the universal shorthand for an access route: an
identity travelling toward a resource. Anyone who scopes a CyberArk vault, an
Entra ID tenant, or an AD tier model reads it as domain language, not decoration.

### 3. One verified core — the privileged control point
Every part of the 3 routes through a single emerald core at its center pinch. That
is the heart of privileged access management: you don't secure privilege by
guarding every door — you force all of it through *one* brokered, verified,
recorded checkpoint. The core carries a checkmark — the instant a request becomes
a *verified, granted, recorded* action. The green is the only non-cobalt element
in the system, on purpose: everything blue is the path, the green is the verified
control point. The fact that this point sits at the exact pinch of the 3 — the
single place the whole numeral narrows to — is the entire idea of PAM, rendered
as geometry.

## Why it fits the work

This mark was designed around a specific career, not pulled from a template.

- **Privileged Access Management is one controlled chokepoint.** You don't protect
  privilege by watching every account — you route it all through a single verified
  broker. The mark puts that control point at the literal pinch of the 3.
- **Identity is the new perimeter.** The old castle-and-moat logo language (shields,
  locks, walls) describes a perimeter that no longer exists. An access graph
  describes the perimeter that actually matters now: who can reach what, and whether
  it was verified. The mark is deliberately post-perimeter.
- **The checkmark is the deliverable.** Link3IT sells verified outcomes — a health
  check that ends in *"this is now under control."* The carved check is that promise,
  rendered as form.

## The animation tells the story

When the mark animates (hero and navigation), it performs the narrative in about
two seconds:

1. **The path draws itself, terminal to terminal.** The 3 traces on as an access
   route — identity finding its way toward the resource.
2. **The identity nodes appear at the terminals.** The endpoints of the path light
   up: the identities entering and leaving.
3. **The core forms at the pinch and the checkmark completes.** Everything routes
   through one point, and that point verifies. Access is now brokered and recorded.

That sequence is the Link3IT value proposition with no words. A prospective client
watches access resolve into a single verified control point before they have read
a line of copy.

## Construction & spec

- **Grid:** 100×100 viewBox, 24px corner radius on the tile.
- **The 3:** one continuous stroked path (width 7.5) with terminals at (34,30) and
  (34,70) and its pinch at center (50,50). Drawn as a path, never a font glyph, so
  it renders identically everywhere.
- **Identity nodes:** two circles (r4.6) seated on the path terminals.
- **Core:** emerald fill (r9.5) with a faint surrounding ring (r13.5) at the center
  pinch — the single privileged control point.
- **Check:** three-point stroke path, carved in the core's contrast color.

## Color

| Token | Hex | Role |
|---|---|---|
| Cobalt | `#2563eb` | Primary — paths, brand, the journey |
| Cobalt bright | `#5b8def` | Node highlights, accents |
| Verified emerald | `#10e0a0` | The core + checkmark — used *only* here and for "verified/done" states |
| Base | `#0a0a0a` | The tile, the canvas |

The discipline that makes it feel enterprise: **emerald is rationed.** It appears
on the verified core and almost nowhere else. Scarcity is what makes it read as
significant rather than decorative.

## Typography pairing

- **Display / wordmark:** Fraunces — a high-contrast serif with optical sizing.
  Serious, editorial, and human; the opposite of generic tech sans. It signals a
  practitioner who writes real reports, not a SaaS funnel.
- **Body / UI:** Inter — quiet, legible, gets out of the way.
- **Mono (data, code, evidence):** JetBrains Mono — used for technical artifacts,
  reinforcing the hands-on engineering credibility.

The wordmark renders **Link3IT** with the `3` in cobalt — tying the number in the
name back to the three nodes in the mark.

## Usage

- **Default tone** — dark tile, cobalt gradient paths. For light or neutral
  surfaces and the primary brand presentation.
- **Mono tone** — solid cobalt tile, light paths. For dark footers and places where
  a single confident block reads better than detail.
- **Animated** — reserve for first-paint moments (hero) and the nav (a subtle
  one-time draw + hover spin). Do not animate it in dense lists; motion should feel
  earned, not constant.
- **Clear space:** keep at least one node-diameter of padding around the tile.
- **Minimum size:** 24px. Below that the checkmark stops reading; use the wordmark alone.

## What it is not

No padlock. No shield. No keyhole. No fingerprint. Those are the visual clichés of
security vendors who sell fear. Link3IT sells *control and verification*, and the
mark says exactly that — a path brought to a verified center. Quiet confidence,
not alarm.

---

## Brand assets included (in `/public`)

| File | Use |
|---|---|
| `logo-lockup-dark.svg` / `.png` | Horizontal lockup (mark + wordmark + tagline) for **dark** surfaces — slide title pages, dark email signatures. PNG is 2x retina. |
| `logo-lockup-light.svg` / `.png` | Same lockup for **white/light** surfaces — proposals, letterhead, documents, light email signatures. |
| `og-image.png` | 1200×630 social share image. Auto-used when link3it.com is posted to LinkedIn, Slack, Twitter/X, iMessage. Wired into site metadata. |
| `og-source.svg` | Editable source for the share image. |

### Email signature usage
Use `logo-lockup-light.png` (or dark, matching your client). In most email clients,
insert as an image sized to ~260px wide and link it to https://link3it.com. The SVG
versions stay crisp at any size if your tool supports SVG.

### Proposal / deck usage
Use the SVG lockups where possible (infinitely scalable). Keep the mark's emerald
core intact — it's the one element that should never be recolored.
