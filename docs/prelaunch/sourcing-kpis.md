# Sourcing funnel and KPI definitions

## Operating spine

```text
public discovery -> canonical fetch -> normalize -> dedupe -> change detection
-> screen-v1.0 -> human review -> evidence task -> advance / hold / decline
```

Every lead remains an unverified record. A fetch is retrieval evidence only. A score is a deterministic prioritization output, not valuation, underwriting approval, availability, financing, or a buy recommendation.

## CRM stage meanings

| Stage | Entry evidence | What it does not mean |
|---|---|---|
| `new_lead` | Normalized unique opportunity | Current availability or fit |
| `enrich` | Canonical source plus critical gaps | Broker/seller contact |
| `partner_review` | Score and top unknowns ready | Approval to contact or invest |
| `approved_for_outreach` | Future exact recipient/template/channel approval | Message sent or seller interest |
| `contacted` | Future confirmed outbound activity with timestamp and matching approval | Reply or engagement |
| `engaged` | Future substantive reply/conversation | Qualified target or diligence access |
| `nda_diligence` | Future executed NDA and authorized access | Verified financials or transaction approval |
| `hold` | Named reason and review date | Permanent rejection |
| `declined` | Named human decision | Deletion of provenance/history |

The current demo implements only browser-memory labels `New lead`, `Enrich`, `Partner review`, and `Hold`. The additional stages are contract definitions, not production behavior.

## KPI contract

| KPI | Formula | When denominator is zero | Interpretation boundary |
|---|---|---|---|
| Source coverage | `successfulCanonicalFetches / attemptedCanonicalFetches` | `null` | Retrieval coverage, not availability or quality |
| Duplicate rate | `duplicateObservations / normalizedObservations` | `null` | Pipeline hygiene, not source accuracy |
| In-thesis rate | `inThesisLeads / uniqueScoredLeads` | `null` | Thesis selectivity, not deal quality |
| Critical-gap rate | `leadsWithCriticalUnknowns / uniqueScoredLeads` | `null` | Evidence burden, not failure probability |
| Partner-review rate | `partnerReviewEntries / uniqueScoredLeads` | `null` | Internal movement, not seller engagement |
| Seven-day decision SLA | `reviewDecisionsWithinSevenDays / partnerReviewEntries` | `null` | Internal responsiveness only |
| Approval-to-send rate | `confirmedOutboundSends / approvedOutreachRecords` | `null` | Unavailable here because no send path exists |
| Diligence conversion | `authorizedDiligenceEntries / substantiveEngagements` | `null` | Process progression, not closing probability |

Counts are event-derived. A prepared draft, approval, successful fetch, or model band cannot create a send, reply, engagement, diligence, or transaction event.

## Target-screening linkage

The scorecard remains the seven-category, 100-point [`screen-v1.0`](../scoring-model.md). Missing inputs retain their fixed behavior and may apply caps; categories are never reweighted around missing data. `out_of_thesis` leads stay searchable. `needs_data` may generate an evidence task, but only a human changes workflow stage.

