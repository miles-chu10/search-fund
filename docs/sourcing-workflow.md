# Sourcing and refresh workflow

## Purpose

Refresh unverified public acquisition leads without turning incomplete listing claims into diligence-grade truth. The credential-free fixture is the reproducible fallback when live services are unavailable.

## Proposed schedule

- Weekdays at **7:30 AM America/Los_Angeles**: search, fetch/validate, normalize, dedupe, change-detect, score, brief, human review.
- Daily brief: new or materially changed in-thesis leads only, sorted by final score, data-confidence points, then retrieval date.
- Weekly rollup: top new/changed leads, score movements, critical gaps, pipeline stages, and source coverage; suppress unchanged noise.

No schedule or connector is created by this prototype.

## Source roles

| System | Proposed role | Important boundary |
|---|---|---|
| Exa | Primary on-market discovery and canonical-page fetch | A fetch proves retrieval, not current availability or accuracy. |
| Parallel Search | Secondary validation and enrichment | Two engines finding the same broker page are one lineage, not independent corroboration. |
| Airtable | Future persistent source of truth | Proposed only; this demo does not create or mutate a base. |
| Clay | Future proprietary target research | A company record does not imply seller intent or availability. No outreach is configured. |

## Identity and provenance

The primary deal key is `marketplace + ":" + listingId`. When no stable listing ID exists, canonicalize the URL and use a deterministic URL hash. A production implementation should use SHA-256; the demo uses a compact deterministic hash to exercise fallback behavior without infrastructure.

Preserve each field observation with:

- publisher and canonical URL;
- original retrieved URL when it differs;
- retrieval timestamp and source lineage;
- raw display text and source label;
- normalized value and field state;
- conflicting observations without overwrite.

Field states are `sourced`, `calculated`, `inferred`, and `unknown`. Missing or conflicting inputs remain unknown; no peer median or model guess fills them.

## Change rules

A material field change, status change, source conflict, thesis version, screen version, or capital scenario triggers re-evaluation. A missing or blocked page keeps the prior lead and creates a review item. A sold or pending change appears in the brief even when the numerical score is unchanged.

The machine-readable preview is [`contracts/refresh-contract.json`](../contracts/refresh-contract.json). Every displayed source is checked by `npm run validate:sources`.
