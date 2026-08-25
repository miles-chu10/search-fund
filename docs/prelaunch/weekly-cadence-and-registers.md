# Weekly cadence, decisions, and risk register

## Recommended cadence

This is an illustrative operating capacity until Miles decides weekly hours.

| When | Time box | Activity | Output |
|---|---:|---|---|
| Monday | 30 min | Thesis, path, and capacity check | One weekly outcome and decision queue |
| Tuesday–Thursday | 45 min/day | Read-only sourcing, validation, normalization, dedupe, enrichment | Changed observations and evidence tasks |
| Friday | 45 min | Partner review of new/changed in-thesis leads | Advance, hold, or decline reasons |
| Friday | 20 min | KPI, risk, and dependency review | Weekly rollup; unchanged noise suppressed |
| Monthly | 60 min | Strategy, path, runway, and model-version review | Continue, pivot, or pause decision |

## Decision register

| Gate | Owner | Status | Required evidence | Pass result |
|---|---|---|---|---|
| `G0-context` | Miles | Verified | Exact prior chats and live repo | Operating assumptions may be drafted |
| `G1-strategy` | Miles | Open | Ten required strategy inputs | Explicit strategy approval |
| `G2-path-runway` | Miles | Open | Path comparison plus private runway/time/risk decisions | One preparation path selected; no capital claim |
| `G3-model-release` | Miles / product owner | Open | Model reconciliation, version decision, passing checks | Screen usable beyond demo within its boundary |
| `G4-outreach-release` | Miles + appropriate reviewer | Out of current scope | Exact identity, audience, channel, template, suppression, claims, approval | Later narrowly approved outbound scope only |
| `G5-diligence-advance` | Miles | Open | Scorecard, risks, requested evidence, conflicts | Advance, hold, or decline target |
| `G6-capital-communication` | Miles + qualified counsel | Out of current scope | Audience, materials, path, current legal review | Later permitted communication scope only |
| `G7-transaction` | Miles + qualified professionals | Out of current scope | Target-specific diligence, financing, structure, approvals | Separate transaction decision |

## Priority risk register

`riskScore = likelihood × impact` on 1–5 internal scales. The score ranks attention; it is not probability or expected loss.

| Risk | Score | Mitigation |
|---|---:|---|
| Personal decisions replaced by favorable defaults | 20 | Keep every user-owned field unknown until G1/G2 approval |
| Score treated as valuation, underwriting, or recommendation | 20 | Show rubric, caps, evidence states, and human gates |
| Illustrative capital math treated as availability/eligibility | 20 | Withhold decision labels when target inputs are unknown |
| Stale/blocked listing presented as currently available | 16 | Preserve retrieval date, availability claim, and coverage gaps |
| Draft mistaken for approval, send, or engagement | 15 | `draftOnly: true`, `sentAt: null`, no send control |
| Consulting activity crosses broker-dealer/securities boundaries | 15 | Exclude intermediation and transaction-compensation recommendations pending counsel |
| Sensitive or gated data enters git | 10 | Store privacy-safe metadata pointers/hashes only |

The SEC's broker-dealer guide specifically identifies finders, business brokers, M&A activity where securities are involved, and outcome/size-related compensation among facts that can require analysis. The product therefore does not recommend a finder fee, success fee, equity, carry, solicitation, or transaction role. [SEC broker-dealer guide](https://www.sec.gov/about/divisions-offices/division-trading-markets/division-trading-markets-compliance-guides/guide-broker-dealer-registration).

