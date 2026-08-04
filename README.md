# Main Street Radar

Partner-facing local prototype for sourcing, screening, and discussing small-business acquisition leads. It turns a reproducible set of public listings into a transparent triage workflow: edit the thesis, inspect fixed-weight scores and caps, compare candidates, open a deal memo, preview refresh operations, and test illustrative capital paths.

Every opportunity is an **unverified lead**, not an investment recommendation or proof of availability. Source-reported facts, calculations, underwriting inferences, and unknowns remain visibly separate.

## Run the demo

Requirements: Node.js 22+ and npm 10+.

```bash
npm ci
npm run dev
```

Open `http://127.0.0.1:4173`. No API key, `.env` file, connector, database, or paid service is required.

For a partner walkthrough:

1. Change target geography, included/excluded industries, minimum SDE/EBITDA, or maximum equity check.
2. Note the separate fixed 100-point screen, thesis eligibility gates, and visible score caps.
3. Select two or three rows and open **Compare**.
4. Open a deal memo to inspect source facts, inference rationale, unknowns, and canonical provenance.
5. Visit **Refresh** for the proposed weekday sourcing contract and **Capital** for scenario-only sources-and-uses previews.

## Reproducible evidence

- `data/opportunities.json` contains 10 credential-free demo leads fetched from canonical public pages with Exa on 2026-08-03.
- `data/source-manifest.json` maps every displayed lead to marketplace + listing ID, canonical URL, and retrieval date.
- `src/domain/scoring.ts` implements `screen-v1.0`: seven fixed categories total 100 points; missing data uses explicit factors and caps rather than reweighting.
- `scripts/validate-sources.ts` checks source identity, URL, retrieval date, manifest coverage, and duplicates.
- `contracts/refresh-contract.json` is the machine-readable weekday workflow preview.

Public listing claims may be stale, incomplete, broker-anonymized, or wrong. A successful fetch proves retrieval only. It does not prove the seller is responsive, the business remains available, or any financial field is diligence-grade.

## Validation

```bash
npm run lint
npm run typecheck
npm test
npm run validate:sources
npm run build
npm run test:ui
npm run validate:workflow
```

`npm run check` runs lint, typecheck, unit tests, provenance validation, and the production build. Playwright covers the rendered desktop and mobile paths separately.

## Architecture preview

The proposed weekday 7:30 AM America/Los_Angeles run is:

```text
Exa search -> fetch/validate (+ Parallel secondary check) -> normalize
-> dedupe -> detect changes -> score -> daily brief -> human review
```

Airtable is shown as a **future proposed** source of truth keyed by `Source + Listing ID`, with canonical URL hash fallback. Clay is shown as a **future proprietary/off-market** input. This repository does not create an Airtable base, Scheduled Task, Clay workflow, outreach, or external account mutation.

See [sourcing workflow](docs/sourcing-workflow.md), [scoring model](docs/scoring-model.md), and [capital workflow](docs/capital-workflow.md).

## Scope boundary

The capital planner is an internal scenario preview. It is not legal, tax, lending, securities, accounting, or investment advice; it does not model approval, recommend a capital structure, solicit investors, or generate offering documents. Target-specific financial, legal, tax, insurance, regulatory, customer-contract, financing, and quality-of-earnings diligence require qualified professionals.
