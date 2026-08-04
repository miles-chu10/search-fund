# Search Fund acquisition sourcing MVP

## Success Contract

Objective:
Build a partner-ready, evidence-backed prototype for finding and triaging small businesses that Miles could acquire, initially operate, and later transition to professional management.

Done when:
- A polished local dashboard shows a current, source-linked opportunity set and clearly separates sourced facts from inferred underwriting signals.
- Users can adjust acquisition criteria, compare opportunities, inspect a deal memo, and see why each score changed.
- The prototype includes a credible daily-refresh design and a staged capital-raising workflow without presenting legal, tax, lending, or investment advice as settled.
- The repository contains a reproducible demo dataset, refresh contract, tests, documentation, and reusable workflow artifacts.
- Desktop and mobile UI smoke checks, lint/type/test/build checks, source-provenance checks, and a clean diff pass succeed.
- The verified implementation is committed in the independent nested repository for root integration; the root supervisor owns GitHub creation and push.

Authoritative sources:
- Live Exa search/fetch results and the underlying public listing URLs.
- Listing-level fields visible in those sources; missing fields remain unknown.
- The repository's tests, build output, and rendered UI.
- Nested-repository Git readback for the implementation commit; GitHub publication remains root-owned.

In scope:
- US lower-middle-market acquisition opportunities that can plausibly support a manager after transition.
- Search-fund fit scoring, transparent assumptions, source freshness, diligence flags, and pipeline actions.
- A capital stack/planning preview and daily sourcing/briefing workflow.
- A self-contained web MVP suitable for a business-partner demo.

Out of scope:
- Contacting sellers or brokers, signing NDAs, accessing gated CIMs, or making offers.
- Investment recommendations, valuation opinions, legal/tax advice, lender approval, or proof that a business is actually acquirable.
- A production crawler, persistent database, authentication, paid API usage, or hosted deployment.

Constraints and approval gates:
- Preserve unrelated parent-workspace changes and create a nested independent repository.
- Never commit secrets or require an API key for the demo path.
- Treat public listing data as leads to verify, not diligence-grade truth.
- This implementation task must not create or push a GitHub repository; the root supervisor owns those external writes.
- No deployment, seller outreach, capital solicitation, paid services, or user-account changes.

Required verification:
- Source URL and retrieval-date validation for every displayed opportunity.
- Deterministic scoring tests and missing-data behavior tests.
- Lint, typecheck, tests, production build, and workflow-artifact validation.
- Rendered desktop and mobile checks with no overlap, broken controls, or unusable states.
- Local commit SHA and clean nested-repository readback.

Stop conditions:
- All done-when conditions have evidence.
- An external dependency or missing-data condition blocks local implementation verification.
- A required action crosses an ungranted approval gate.

## Goal

Create an acquisition command center that turns current public listings into a transparent, repeatable search-fund triage workflow rather than a black-box list of "good businesses."

## Success Criteria

- 8-12 current leads across multiple public marketplaces, deduplicated and source-linked.
- Fact/inference/unknown labels survive ingestion and presentation.
- Editable criteria recalculate fit and make ranking logic explainable.
- Deal detail supports a partner conversation: thesis, economics, manager-readiness, diligence gaps, and next action.
- Capital workflow covers self-funded/SBA-style, traditional search, and independent-sponsor paths as scenarios, not promises.
- Daily refresh is specified as discover -> extract -> normalize -> dedupe -> score -> brief -> human review.

## Current Context

- The project directory is an independent nested Git repository at `/Users/mileschu/code/Work/Search Fund`.
- Exa-sourced and canonical-page-fetched public leads are preserved as a credential-free fixture with explicit retrieval dates.
- The four thesis inputs are explicit and editable in the prototype.
- GitHub creation and push are intentionally deferred to the root supervisor.

## Constraints

- Use TypeScript with 2-space indentation and a lightweight, maintainable frontend stack.
- Keep the demo usable without network access or secrets after install.
- Avoid dense PE jargon where plain language is clearer.
- Do not overstate freshness, availability, financial accuracy, SBA eligibility, or manager-readiness.

## Risks

- Listings can be stale, duplicated, broker-anonymized, or incomplete.
- "Good position to buy" is an underwriting inference, not an observable web fact.
- Asking price, SDE, EBITDA, revenue, and financing notes may use inconsistent definitions.
- A demo can look more certain than the evidence warrants.
- GitHub publication can accidentally expose secrets or unrelated parent-repo content.

## Approval Required

- Granted: use a small bounded research workflow and commit the verified nested-repository implementation.
- Root-only: create or push the GitHub repository.
- Not granted: deploy a hosted site, contact third parties, spend money, or solicit capital.

## Work Packets

1. `01-live-sourcing`: find and normalize current public acquisition leads; own `.workflow/.../results/01-live-sourcing.md` only.
2. `02-acquisition-model`: define an explainable search-fund score, manager-readiness signals, capital scenarios, and disclaimer language; own `.workflow/.../results/02-acquisition-model.md` only.
3. `03-product-build`: root-owned implementation, fixtures, tests, documentation, and refresh contract.
4. `04-product-qa`: independent rendered-UI and workflow acceptance pass after the build stabilizes; findings only.

## Integration Policy

- The root task owns application code, data integration, git state, final decisions, and publication.
- Accept packet claims only when tied to source URLs or clearly labeled as heuristics.
- Resolve conflicts against public listing pages, repository behavior, and test evidence.
- Never merge raw research prose into UI copy without normalizing confidence and caveats.

## Verification

- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`
- Browser checks at desktop and mobile widths.
- `verify_workflow.py` and repository secret/path hygiene checks.
- Nested-repository commit-SHA and clean-tree readback.

## Reusable Artifacts

- `.workflow/search-fund-acquisition-sourcing-mvp/`
- `docs/sourcing-workflow.md`
- `docs/capital-workflow.md`
- A schema-validated demo dataset and source manifest.
