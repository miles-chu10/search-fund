# Orchestration: Search Fund acquisition sourcing MVP

## Execution Rules

- Keep the original objective intact.
- Ask for approval before risky, expensive, external, or destructive actions.
- Keep immediate blocking work local.
- Delegate only bounded, disjoint, materially useful packets.
- Integrate packet results before final verification.

## Branching Rules

- If Exa cannot verify enough current listings, combine Exa discovery with direct source fetches and shrink the displayed set rather than using stale or invented rows.
- If a listing hides a field, store `null` and show `Unknown`; never estimate it silently.
- If the dashboard stack cannot be installed cleanly, fall back to a self-contained TypeScript/Vite implementation before changing product scope.
- If a UI state fails visual QA, fix the smallest owning component and rerun both viewport checks.
- If GitHub authentication or repository creation fails, stop after a local verified commit and report the exact blocker.

## Packet Prompts

### 01-live-sourcing

Research only. Use current public web sources, preferring Exa discovery plus direct listing pages. Produce 8-12 promising US acquisition leads suitable for a search-fund demo. For each lead, separate observable facts from heuristics, include the canonical URL, source marketplace, retrieval date, asking price/revenue/cash flow when visible, geography, business category, financing notes, and explicit unknowns. Flag duplicates, stale/closed status, and missing evidence. Do not edit application files or recommend an acquisition.

### 02-acquisition-model

Research and product logic only. Define a transparent 100-point screening model for a first-time operator who wants to transition to hired management. Include earnings quality, recurring/durable demand, concentration risk, operational complexity, transition feasibility, price/financing fit, data confidence, and hard red flags. Provide capital workflow scenarios and language that distinguishes sourced fact, inference, and unknown. Do not give legal, tax, securities, or lending advice. Own only the assigned result file.

### 03-product-build

Implement a dense, quiet, partner-facing dashboard with an opportunity table, criteria controls, comparison, detail memo, sourcing workflow, and capital plan. Use schema-validated fixtures and deterministic scoring. The demo path must not require credentials. Add tests and public-facing documentation.

### 04-product-qa

Inspect the rendered product at desktop and mobile sizes. Exercise filtering, ranking, detail selection, compare, and workflow/capital views. Report only reproducible issues with route, viewport, and evidence. Do not edit code.

## Completion Audit

- Every source-linked row has a retrieval date and confidence label.
- Every numerical score can be explained from visible criteria.
- Missing fields render as unknown and do not become zero silently.
- The partner demo works from a clean install with no secrets.
- All automated and visual checks pass.
- GitHub remote and default-branch SHA match the local commit.
