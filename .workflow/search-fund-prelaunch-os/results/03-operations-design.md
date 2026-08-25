# Pre-launch operating-system design

**Status:** implementation-ready design packet; no external system, schedule, account, contact, outreach, financing, or entity exists because of this document.

**Extends:** Main Street Radar and its existing `Exa -> fetch/validate -> normalize -> dedupe -> detect_changes -> score -> brief -> human_review` contract.

**Current product facts (observed in the repository):** the app is a React/Vite partner-facing lead-screening prototype; the credential-free fixture contains 10 unverified public leads; `screen-v1.0` is deterministic; thesis controls are `targetGeographies`, `includedIndustries`, `excludedIndustries`, `minimumEarnings`, and `maximumEquityCheck`; pipeline stages are currently browser-memory-only display values `New lead`, `Enrich`, `Partner review`, and `Hold`; score results are recomputed in the browser and no persistent `ScoreSnapshot`, `inputHash`, or stage store exists; the capital view is illustrative; Airtable, Clay, scheduling, outreach, and persistent storage are proposed but do not exist.

**Recommendations:** the schemas, workflow, roadmap, controls, and flagship-project plan below.

**Illustrative assumptions:** any example target counts, time boxes, percentages, and capital amounts. They are planning defaults to edit, not evidence about Miles, the market, a lender, an investor, or a target.

**Unknown personal inputs:** Miles's geography constraints, target industries, preferred earnings basis and range, enterprise-value range, personal runway, weekly time commitment, risk tolerance, capital path, buyer equity capacity, accreditation, net worth, financing eligibility, investor network, and willingness to operate full-time. Store these as `null` until Miles decides or documents them; never infer them from dashboard defaults.

This is operational planning, not legal, tax, securities, accounting, lending, or investment advice. Qualified professionals must review real structures, solicitations, diligence conclusions, and transaction documents.

## 1. One system, with an explicit source-of-truth boundary

Do not create a second scoring model or separate consulting CRM. Extend the existing domain in this order:

The following is the future persistence shape. The current demo stops at an in-memory `Opportunity` plus recomputed `ScoreResult`; it does not create immutable snapshots.

```text
source observation -> normalized Opportunity -> [future] immutable ScoreSnapshot
-> DealWorkflow -> Activity/Task -> brief and KPI aggregates
```

The local repository remains the first implementation surface. Use versioned JSON fixtures plus schema validation until persistence is truly needed. Airtable remains a future adapter, not a prerequisite; if adopted later, its documented API should mirror the canonical local schema rather than define it. No additional paid tool is needed for the 12-week pre-launch phase.

### Evidence and record rules

Every value exposed to the UI or an export must include or inherit one of the existing `EvidenceKind` values:

| `evidenceKind` | Exact meaning | Required support |
|---|---|---|
| `sourced` | Reported by an identified source; not independently verified | `publisher`, `canonicalUrl`, `retrievedAt`, raw label/text |
| `calculated` | Deterministic formula over linked inputs | formula/version and input references |
| `inferred` | Analyst or model interpretation | rationale, author, timestamp, supporting inputs |
| `unknown` | Missing, inaccessible, stale, or conflicting; no assumption made | gap reason and next evidence request |

Never convert a workflow status, unanswered outreach, a successful fetch, an illustrative scenario, or a model score into evidence of availability, seller intent, investor interest, eligibility, or fundability.

### Canonical identifiers and audit fields

Use lower camel case in JSON/TypeScript. Dates are ISO 8601. The current runtime and demo fixtures use numeric USD dollars, including `maximumEquityCheck` and CapitalView calculations. Future persistence uses integer USD cents (`*Cents`). A versioned conversion adapter must sit at that boundary: dollars-to-cents must validate and convert explicitly, and cents-to-dollars must be used only for current UI formatting. No field may silently change units, and this packet does not implement that adapter.

| Object | Primary key | Required audit fields |
|---|---|---|
| `Opportunity` | existing `id`; current identity `source.marketplace + ":" + source.listingId`, with the demo's compact URL-hash fallback; future persistence identity uses SHA-256 of the canonical URL | existing `source.canonicalUrl`, `source.retrievedAt` |
| `ScoreSnapshot` (future) | `scoreSnapshotId` | `opportunityId`, `screenVersion`, `thesisVersion`, `createdAt`, `inputHash` |
| `DealWorkflow` | `opportunityId` (one active record per lead) | `stage`, `stageChangedAt`, `stageChangedBy`, `approvalStatus` |
| `Activity` | `activityId` | `opportunityId`, `activityType`, `occurredAt`, `actor`, `externalMutation` |
| `Task` | `taskId` | `opportunityId`, `status`, `dueAt`, `owner`, `createdAt` |
| `Decision` | `decisionId` | `gateId`, `status`, `owner`, `decidedAt`, evidence links |
| `Risk` | `riskId` | `status`, `owner`, `decisionId`, `reviewAt`, `createdAt`, `updatedAt` |

The current demo fallback is `marketplace:url-<8-hex>` from a compact deterministic hash of the canonicalized URL; it is not SHA-256. The future identity contract is a separate, versioned boundary that uses SHA-256 of that canonicalized URL. Do not use the compact demo hash as proof of a future persistent identity or as a `ScoreSnapshot.inputHash`.

`externalMutation` defaults to `false`. Any activity that would send, submit, publish, apply, purchase, create an account, authorize OAuth, form an entity, solicit capital, apply for financing, or make a commitment requires a fresh explicit Miles approval recorded separately from draft preparation.

## 2. Strategy memo: one-page decision artifact

File/view name: `Search strategy`. Purpose: determine what to search and when to stop, not persuade investors.

### Fields

```ts
interface SearchStrategy {
  strategyVersion: string
  status: 'draft' | 'decision_ready' | 'approved' | 'superseded'
  operatingPath: 'traditional_search' | 'self_funded' | 'independent_sponsor' | 'accelerator_or_sponsor' | null // accelerator path is deferred/unverified
  searcherRole: 'full_time_operator' | 'part_time_preparation' | null
  targetGeographies: string[]
  includedIndustries: string[]
  excludedIndustries: string[]
  minimumEarnings: { basis: 'SDE' | 'EBITDA'; amount: number } | null
  maximumEarnings: { basis: 'SDE' | 'EBITDA'; amount: number } | null
  enterpriseValueRange: { minimum: number; maximum: number } | null
  requiredCharacteristics: string[]
  exclusionReasons: string[]
  personalRunwayMonths: number | null
  weeklyTimeCommitmentHours: number | null
  riskTolerance: 'low' | 'medium' | 'high' | null
  maximumEquityCheck: number | null
  assumptions: Assumption[]
  decisionGateIds: string[]
  approvedBy: string | null
  approvedAt: string | null
}
```

The first page renders: objective; path; geography; industry inclusion/exclusion; earnings basis/range; EV range; recurring/repeat revenue, fragmentation, retention, owner-dependence and management requirements; hard exclusions; runway/time/risk limits; open assumptions; next gate. `requiredCharacteristics` are screening preferences, not sourced claims about a lead.

### Acceptance criteria

- `decision_ready` is blocked while any of geography, included/excluded industries, earnings basis/range, EV range, runway, weekly time, risk tolerance, operating path, or searcher role is `null`.
- `approved` requires Miles's explicit decision `G1-strategy` and records `strategyVersion`; app defaults never count as approval.
- Once the required current fields are decided, the future adapter maps `SearchStrategy` to the existing `AcquisitionCriteria` exactly as specified below; it does not relabel SDE as EBITDA.
- `maximumEarnings` and `enterpriseValueRange` are future strategy inputs only. `screen-v1.0` does not enforce them in filtering, gates, caps, scoring, or briefs; no current output may imply that it does.
- Editing an approved strategy is a future versioning behavior; prior `ScoreSnapshot`s remain reproducible only after future persistence exists.

### Current `SearchStrategy` -> `AcquisitionCriteria` adapter

| `SearchStrategy` field | Current `AcquisitionCriteria` field | `screen-v1.0` behavior |
|---|---|---|
| `targetGeographies` | `targetGeographies` | exact array value; no inferred geography |
| `includedIndustries` | `includedIndustries` | exact array value |
| `excludedIndustries` | `excludedIndustries` | exact array value |
| `minimumEarnings` | `minimumEarnings` | exact `{ basis, amount }`; preserve `SDE` vs `EBITDA` label and amount |
| `maximumEquityCheck` | `maximumEquityCheck` | exact numeric USD-dollar value once decided; used only by the current capital-gap cap/display semantics |
| `maximumEarnings`, `enterpriseValueRange` | no current destination | retained for future strategy logic; unenforced under `screen-v1.0` |
| all other strategy fields | no current destination | strategy/workflow context only; not current score inputs |

The current runtime `thesisVersion` is derived only from this five-field `AcquisitionCriteria` object, with the three string arrays sorted before hashing. It is a compact current criteria version, not a complete `SearchStrategy` revision: maximum earnings, EV, path, role, runway, risk, characteristics, and other strategy fields are not represented. Do not claim full strategy reproducibility until a future versioned contract includes the relevant fields.

## 3. `screen-v1.0` linkage and target scorecard

Keep the current seven category IDs and weights exactly: `earningsQuality: 20`, `durableDemand: 15`, `customerConcentration: 10`, `operationalComplexity: 10`, `managerReadiness: 15`, `priceFinancingFit: 20`, `dataConfidence: 10`.

Future persistence should retain the current calculated result without copying source facts into workflow fields. `ScoreSnapshot`, immutable snapshot history, `inputHash`, and the `finalScore`/`displayScore` split below are future contract fields; the current demo returns an in-memory `ScoreResult` with `total`, `rawScore`, `confidencePoints`, `thesisVersion`, `screenVersion`, `band`, and `nextAction` and persists none of them.

```ts
interface ScoreSnapshot {
  scoreSnapshotId: string
  opportunityId: string
  screenVersion: 'screen-v1.0'
  thesisVersion: string
  inputHash: string
  rawScore: number
  finalScore: number
  displayScore: number
  confidencePoints: number
  thesisStatus: 'in_thesis' | 'out_of_thesis' | 'needs_data'
  components: ScoreComponent[]
  gates: ThesisGate[]
  caps: ScoreCap[]
  band: string
  nextAction: string
  createdAt: string
}
```

### Score-field compatibility

| Semantic field | Current `screen-v1.0` runtime | Future versioned contract | Compatibility rule |
|---|---|---|---|
| displayed score | `total`: integer `floor(cappedScore + 0.5)` | `displayScore`: integer presentation of the decimal capped score | Current `total = displayScore` semantically; do not reinterpret it as a decimal field. |
| decimal capped score | local `cappedScore` exists only inside the current calculation; no returned field | `finalScore` / `cappedScore`: future decimal capped field (choose and freeze one canonical name at migration) | Do not emit this as a current runtime field until a new versioned contract exists. |
| data-confidence points | `confidencePoints` | `confidencePoints` remains the current name; `dataConfidencePoints` is a possible future alias | Briefs use current `confidencePoints` until the versioned migration. |

Until that migration, the current-runtime brief sort is `total DESC`, `confidencePoints DESC`, `retrievedAt DESC`. The repository's `contracts/refresh-contract.json` is an architecture preview; its `finalScore` and `dataConfidencePoints` names must not be treated as current runtime fields.

### Future snapshot hash contract

`ScoreSnapshot` and `inputHash` are future persistence requirements, not current demo behavior. At the contract level, a future `inputHash` must hash a versioned canonical object containing the `hashSchemaVersion`; `opportunityId` and canonical source identity; the normalized opportunity fields consumed by the score and thesis gates (`industry`, `location.region`, asking price, revenue, earnings value/source label, recurring-revenue claim, largest-customer share, management, owner involvement, financing, transition, and the score's manager-readiness, durable-demand, and operational-simplicity inputs); the mapped current `AcquisitionCriteria` with stable array ordering; `screenVersion`; and `thesisVersion`. Null/unknown values remain explicit. The canonical serialization and hash algorithm are future implementation decisions and must be versioned; the current compact `thesisVersion` hash is not a substitute for this contract.

Exact current formula:

```text
rawScore    = roundTo2(sum(component.points))
finalScore  = min(rawScore, ...applicable cap.cap)
displayScore = floor(finalScore + 0.5)
```

The current code calls `displayScore` `total`; an implementation may retain `total` for compatibility but exports should document the name mapping. In the current cap check, an asking price is required and the earnings record must be labeled `SDE` or `EBITDA`; the code does not test whether that labeled value is positive. A zero SDE/EBITDA-labeled value therefore does not trigger the earnings-based cap when asking price is known. Do not describe positivity as enforced unless a future screen version changes the code and fixtures. Do not silently implement the more detailed aspirational rubric in `.workflow/.../02-acquisition-model.md` under `screen-v1.0`; any factor or cap change requires a new screen version and regression fixtures.

### Workflow linkage

- `out_of_thesis`: searchable, excluded from priority brief, never deleted.
- `needs_data`: a current thesis status only. It may inform a future enrichment task, but it does not mutate the current browser-memory stage, which remains whatever a human selected (default `New lead`).
- score 80–100: derived band `Priority diligence`; next action recommends requesting evidence sooner.
- score 65–79: derived band `Advance to screening`; next action recommends resolving the most score-sensitive unknowns.
- score 50–64: derived band `Watchlist / enrich`; next action recommends keeping the lead out of the priority brief pending evidence.
- score 0–49: derived band `Deprioritize / hold`; next action recommends curing the named cap or thesis mismatch.

`band` and `nextAction` are derived recommendations only; they are never `DealWorkflow.stage` values and never advance a relationship stage. A human decision creates any stage transition.

### Current-model reconciliation gate

Before using scores outside the demo, `G3-model-release` must reconcile these observed gaps: availability is a free-text `availabilityClaim`, not the detailed enum in the model packet; pipeline stages are not persisted; freshness and detailed rubric factors in the model packet are not all implemented; current capital shares and 12% uses uplift are examples. Acceptance is a written screen version decision plus passing deterministic tests.

## 4. Deal workflow, CRM schema, and controlled statuses

### Path identifier compatibility

The current `CapitalView` uses kebab-case `ScenarioId` values; future strategy and capital contracts use snake_case path values. Keep this mapping explicit at the adapter boundary:

| Current `CapitalView` ID | Future `SearchStrategy.operatingPath` / `CapitalPathPlan.path` |
|---|---|
| `self-funded` | `self_funded` |
| `traditional-search` | `traditional_search` |
| `independent-sponsor` | `independent_sponsor` |
| no current CapitalView ID | `accelerator_or_sponsor` — deferred/unverified; no current branch, terms, or first-party program evidence |

The first three are the only current scenario IDs. `accelerator_or_sponsor` may remain in future unions for contract completeness, but it must be labeled deferred/unverified everywhere until a specific program is first-party verified and separately approved.

### Canonical stages

Use these as future machine statuses; preserve the current UI labels as aliases during migration. The current UI exposes only browser-memory display values and has no approval or send path.

| `stage` | Current display mapping | Entry condition | Exit evidence |
|---|---|---|---|
| `new_lead` | `New lead` | normalized unique opportunity | validation result |
| `enrich` | `Enrich` | canonical source valid; critical gaps exist | evidence observations or documented unable-to-verify result |
| `partner_review` | `Partner review` | score snapshot and top unknowns ready | `advance`, `hold`, or `decline` decision |
| `approved_for_outreach` | none | explicit Miles approval for the exact recipient/template/channel or approved bounded campaign | approval record |
| `contacted` | none | externally sent activity with timestamp (future only) | reply or follow-up expiry |
| `engaged` | none | substantive reply/conversation | qualification decision |
| `nda_diligence` | none | executed NDA and authorized data access | diligence gate result |
| `hold` | `Hold` | named reason and `reviewAt` | resume/decline decision |
| `declined` | none | named reason | terminal unless explicitly reopened |

Never use email opens as `engaged`. Never infer `contacted` from a prepared draft. `approved_for_outreach` is an approval state, not a seller-interest state.

Approval/send invariants are exact: `approved_for_outreach` requires `approvalStatus: 'approved'` for the exact recipient, template, and channel (or an explicitly approved bounded campaign), and it does not imply a message was sent. A `message_sent` activity may create `contacted` only when an external send is confirmed and the activity has `activityType: 'message_sent'`, `direction: 'outbound'`, a non-null `occurredAt`, the matching non-null `approvalId`, and `externalMutation: true`. A prepared draft, an approval by itself, a queued action, or a successful fetch cannot set `sentAt` or `contacted`; the draft artifact remains `sentAt: null` until that confirmed activity exists.

### `DealWorkflow`

```ts
interface DealWorkflow {
  opportunityId: string
  pipelineType: 'on_market' | 'proprietary'
  stage: DealStage
  stageChangedAt: string
  stageChangedBy: string
  thesisStatus: ScoreSnapshot['thesisStatus']
  latestScoreSnapshotId: string
  approvalStatus: 'not_requested' | 'pending' | 'approved' | 'rejected' | 'expired'
  holdReason: HoldReason | null
  declineReason: DeclineReason | null
  nextAction: string
  nextActionOwner: string
  nextActionDueAt: string | null
  lastMeaningfulActivityAt: string | null
}
```

`HoldReason`: `needs_critical_data | thesis_pending | model_review | capital_unknown | professional_review | capacity | other`. `DeclineReason`: `out_of_thesis | economics | concentration | owner_dependence | transferability | capital | seller_unavailable | duplicate | invalid_lead | other`.

### Contacts and activities

```ts
interface Contact {
  contactId: string
  opportunityId: string
  role: 'broker' | 'owner' | 'advisor' | 'other'
  displayName: string | null
  organization: string | null
  email: string | null
  phone: string | null
  sourceUrl: string
  evidenceKind: 'sourced' | 'unknown'
  consentOrLawfulBasisNote: string | null
  doNotContact: boolean
  suppressionReason: string | null
}

interface Activity {
  activityId: string
  opportunityId: string
  contactId: string | null
  activityType: 'source_fetch' | 'review' | 'decision' | 'draft_created' | 'message_sent' | 'reply_received' | 'meeting' | 'document_received' | 'stage_change'
  direction: 'internal' | 'outbound' | 'inbound'
  occurredAt: string
  actor: string
  summary: string
  artifactPathOrUrl: string | null
  approvalId: string | null
  externalMutation: boolean
}
```

Privacy acceptance: no secrets, authentication material, raw inbox exports, gated seller materials, personal financial records, or sensitive personal data enter fixtures or git. A contact is stored only when tied to a specific workflow purpose and sourced; `doNotContact` suppresses all draft queues.

## 5. Draft-only outreach templates

Every render includes `status: 'draft'`, `sentAt: null`, `approvalId: null`, a canonical source link, and a visible `UNSENT — REQUIRES MILES APPROVAL` banner. Placeholders fail closed: a missing required placeholder prevents export.

### Broker / intermediary first note

Subject: `Question about {{listingTitle}} ({{listingId}})`

> Hi {{contactName}},  
> I am reviewing the publicly listed opportunity at {{canonicalUrl}}. Is it currently available, and can you share the process and initial materials required to evaluate it? I am specifically trying to verify {{topUnknowns}}.  
> Thank you,  
> {{senderName}}

Required placeholders: `contactName`, `listingTitle`, `listingId`, `canonicalUrl`, `topUnknowns`, `senderName`. Do not claim committed capital, lender approval, acquisition experience, investor backing, speed/certainty of close, or confidentiality authority unless verified and deliberately approved.

### Proprietary owner research note

Subject: `Private question about {{companyName}}`

> Hi {{contactName}},  
> I am researching {{industryDescription}} businesses in {{geography}} and came across {{companyName}} through {{sourceUrl}}. I do not know whether you are considering a transition. If a confidential introductory conversation is relevant, I would be glad to learn about your goals; if not, I will not assume interest.  
> Regards,  
> {{senderName}}

This template remains disabled until Miles approves the proprietary thesis, identity/language, contact-source rules, and an appropriate legal/compliance review. A company record alone is not seller intent.

### One follow-up

Subject: `Re: {{originalSubject}}`

> Hi {{contactName}}, following up once on the note below. If the opportunity is unavailable or a conversation is not relevant, no response is needed and I will close the loop. — {{senderName}}

Default recommendation: at most one follow-up after an approved interval; this is an internal policy assumption, not a legal safe harbor. Suppression and applicable communication-law review precede any real campaign.

## 6. Sourcing funnel and KPI contract

All counts use unique `opportunityId` except activities. Report a fixed period, timezone, numerator, denominator, and `coverageStatus`. When a denominator is zero, the rate is `null`, never 0%.

```ts
interface FunnelSnapshot {
  periodStart: string
  periodEnd: string
  timeZone: 'America/Los_Angeles'
  discoveredCount: number
  canonicalFetchSucceededCount: number
  validUniqueLeadCount: number
  inThesisCount: number
  materiallyChangedInThesisCount: number
  partnerReviewedCount: number
  approvedForOutreachCount: number
  contactedCount: number
  repliedCount: number
  engagedCount: number
  ndaDiligenceCount: number
  coverageStatus: 'complete' | 'partial' | 'failed'
  coverageGaps: string[]
}
```

| KPI | Exact formula | Interpretation boundary |
|---|---|---|
| canonical fetch rate | `canonicalFetchSucceededCount / discoveredCount` | retrieval reliability, not availability |
| valid unique rate | `validUniqueLeadCount / discoveredCount` | schema + dedupe yield |
| thesis yield | `inThesisCount / validUniqueLeadCount` | fit with current versioned thesis |
| change yield | `materiallyChangedInThesisCount / inThesisCount` | brief relevance; suppress unchanged |
| review throughput | count of first `partner_review` decisions in period | work completed, not quality |
| review SLA | median hours from `new_lead` to first decision | null if timestamps incomplete |
| critical-gap age | median days open for tasks tagged `critical_data` | evidence-request backlog |
| approval-to-send rate | `contactedCount / approvedForOutreachCount` | only after outreach exists; not a pre-launch KPI |
| reply rate | `repliedCount / contactedCount` | response, not seller interest |
| engagement rate | `engagedCount / contactedCount` | substantive conversation by explicit rule |
| diligence conversion | `ndaDiligenceCount / engagedCount` | process progression, not deal quality |

Recommended illustrative capacity for rehearsal only: review 10 fixture leads/week, resolve or task the top three unknowns for the top three leads, and publish one internal weekly rollup. Replace these after two dry-run weeks; do not present them as market benchmarks.

## 7. Diligence checklist and data-room index

Each checklist item uses:

```ts
interface DiligenceItem {
  diligenceItemId: string
  opportunityId: string
  category: DiligenceCategory
  requestName: string
  status: 'not_requested' | 'requested' | 'received_unreviewed' | 'reviewed' | 'exception' | 'not_applicable'
  evidenceKind: EvidenceKind
  sourceDocumentId: string | null
  reviewer: string | null
  reviewedAt: string | null
  finding: string | null
  severity: 'none' | 'low' | 'medium' | 'high' | 'critical' | null
  nextAction: string | null
}
```

No item becomes `reviewed` merely because a file exists. `not_applicable` requires a rationale. High/critical findings require a named owner and decision gate.

### Index

| Folder | Minimum index | Score linkage |
|---|---|---|
| `00-process` | NDA, process letter, advisor contacts, timeline, access log | workflow only |
| `01-corporate-ownership` | formation/governance, ownership/cap table, good standing, related parties | specialist gate |
| `02-financial` | 3–5 years financial statements, tax returns, monthly trial balance/GL, YTD, bank/merchant reconciliation, AR/AP aging, debt, add-back schedule | E1–E3, Q1–Q4 |
| `03-commercial-customers` | customer list by revenue, contracts, cohort/retention/churn, pipeline, pricing, top-five detail | D1–D3, C1–C2 |
| `04-operations` | org chart, owner-role map, employee roster, SOP/KPI inventory, facilities, equipment, capex, working capital | O1–O3, M1–M3 |
| `05-people-benefits` | agreements, compensation, benefits, contractor classification, turnover, disputes | M1, manager cost |
| `06-legal-regulatory` | material contracts, licenses/permits, litigation/claims, compliance, IP, privacy/security | holds require professional review |
| `07-tax` | returns, notices/audits, payroll/sales tax, nexus exposures | qualified tax review |
| `08-insurance-risk` | policies, loss runs, claims, safety/environmental materials | risk register |
| `09-technology-security` | systems inventory, vendors, access architecture, incidents, continuity, data practices | operational risk; no secrets copied |
| `10-transaction-financing` | sources/uses, debt indications, seller note, working capital peg, QoE, valuation bridge, closing conditions | P1–P4 |
| `11-transition-100-day` | seller handoffs, customer/vendor introductions, operator/manager plan, Day 1 and 100-day plan | M1–M3 |

Document metadata: `documentId`, `opportunityId`, `folder`, `title`, `documentDate`, `receivedAt`, `sourceParty`, `confidentiality`, `version`, `storagePointer`, `sha256`, `reviewStatus`. Store only a privacy-safe pointer/hash in the repository; gated materials stay in an approved secure location outside git.

## 8. Investor and capital-plan framework

Keep search-period capital, acquisition capital, and personal runway separate. A plan records hypotheses and dependencies; it does not imply a fund, investor commitment, accreditation, financing eligibility, or available capital.

```ts
interface CapitalPathPlan {
  path: 'traditional_search' | 'self_funded' | 'independent_sponsor' | 'accelerator_or_sponsor' // accelerator path is deferred/unverified
  status: 'exploring' | 'selected' | 'paused' | 'rejected'
  personalRunwayMonths: number | null
  searchBudgetCents: number | null
  searchCapitalSources: CapitalSource[]
  acquisitionUses: CapitalUse[]
  acquisitionSources: CapitalSource[]
  postCloseLiquidityCents: number | null
  dependencies: Dependency[]
  stopCriteria: string[]
  nextGateId: string
}

interface CapitalSource {
  sourceId: string
  sourceType: 'personal_cash' | 'search_investor' | 'acquisition_equity' | 'senior_debt' | 'seller_note' | 'sponsor_coinvest' | 'other'
  amountCents: number | null
  evidenceStage: 'illustrative' | 'pre_screened' | 'indicated' | 'committed' | 'funded' // machine values; pre_screened displays as Pre-screened
  termsSummary: string | null
  evidenceDocumentId: string | null
  expiresAt: string | null
}
```

Evidence stage is the existing capital-workflow sequence. The machine value is `pre_screened`; the current display label is `Pre-screened`. Only target-specific evidence advances a source: internal math = `illustrative`; an actual preliminary screen = `pre_screened`; written nonbinding evidence = `indicated`; executed commitment with conditions = `committed`; closing readback = `funded`.

### Scenario gates

| Path | Illustrative inputs required before comparison | Continue gate | Stop/pause trigger |
|---|---|---|---|
| traditional search | personal runway, full-time timing, search-budget uses, hypothetical investor economics, acquisition co-invest expectations | Miles chooses full-time fundraising/search preparation and qualified counsel reviews future capital communications | runway/time not acceptable, no professional path for communications, or Miles rejects governance/economic trade-offs |
| self-funded | personal runway, maximum personal equity check, post-close liquidity minimum, target size, target-specific lender screen | personal downside fits declared limit and a real target can be pre-screened without assuming eligibility | buyer cash/liquidity/guarantee exposure exceeds Miles's limit or target fails lender screen |
| independent sponsor | personal runway, sponsor co-invest limit, deal-by-deal fundraising timing, fee/carry/governance hypotheses | credible target plus qualified counsel and evidence-based debt/equity indications | timing/closing dependency is unacceptable or no target-specific indications |
| accelerator/sponsor (`accelerator_or_sponsor`) | deferred/unverified; no current branch or verified program inputs | cannot pass until Miles approves a specific currently verified program after first-party review | once verified, program terms, eligibility, or autonomy trade-off fails the decision criteria |

`totalUses = sum(acquisitionUses.amountCents)` and `totalSources = sum(known acquisitionSources.amountCents)`; `sourceGap = totalUses - totalSources`. Unknown amounts remain unknown and the scenario cannot be labeled balanced. MACF/DSCR remain unavailable until their documented inputs exist.

## 9. Decision and risk registers

### Decision gates

| `gateId` | Owner | Required evidence | Pass result |
|---|---|---|---|
| `G0-context` | Miles | exact prior-chat context recovered and linked; repo state confirmed | operating assumptions may be drafted |
| `G1-strategy` | Miles | all `SearchStrategy` personal inputs decided | strategy becomes `approved` |
| `G2-path-runway` | Miles | scenario comparison, personal runway/time/risk inputs | one preparation path selected; no capital claim |
| `G3-model-release` | Miles/product owner | current-model gaps resolved, tests pass, version decision recorded | screen usable beyond demo within stated boundary |
| `G4-outreach-release` | Miles + appropriate professional review where needed | exact identity, channel, recipient scope, suppression, template and claims | narrowly approved outbound action; still no seller interest implied |
| `G5-diligence-advance` | Miles | scorecard, top risks, requested evidence, conflicts | advance/hold/decline target |
| `G6-capital-communication` | Miles + qualified counsel | exact audience/materials/path and current legal review | permitted communication scope only |
| `G7-transaction` | Miles + qualified professionals | target-specific diligence, financing, structure, approvals | separate commitment decision; outside pre-launch scope |

```ts
interface Decision {
  decisionId: string
  gateId: string
  question: string
  status: 'open' | 'ready' | 'approved' | 'rejected' | 'deferred'
  options: string[]
  recommendation: string | null
  rationale: string
  evidenceLinks: string[]
  owner: string
  decidedAt: string | null
  reviewAt: string | null
}
```

### Risk register

```ts
interface Risk {
  riskId: string
  category: 'strategy' | 'runway' | 'sourcing' | 'data' | 'model' | 'privacy' | 'legal_regulatory' | 'capital' | 'execution' | 'target'
  statement: string
  evidenceKind: EvidenceKind
  likelihood: 1 | 2 | 3 | 4 | 5
  impact: 1 | 2 | 3 | 4 | 5
  riskScore: number
  mitigation: string
  trigger: string
  owner: string
  decisionId: string | null
  status: 'open' | 'monitoring' | 'mitigated' | 'accepted' | 'closed'
  reviewAt: string
}
```

`riskScore = likelihood * impact`; it is a prioritization calculation, not probability or expected loss. Scores 15–25 appear first in the weekly review. `accepted` requires a non-null `decisionId` that links to a `Decision`; `closed` requires evidence that the trigger no longer applies.

Seed risks without personal invention: insufficient personal-input decisions; stale/blocked listing coverage; same-lineage false corroboration; scoring-doc/code drift; sensitive data entering git; outreach without approval; investor/lender interest overstated; capital scenario placeholders treated as terms; professional review timing; weekly operating capacity.

## 10. Weekly cadence and internal brief

Recommended pre-launch cadence (illustrative until Miles approves time commitment):

| When | Time box | Activity | Output |
|---|---:|---|---|
| Monday | 30 min | thesis/path check and weekly capacity | one weekly outcome; decision queue |
| Tue–Thu | 45 min/day | run fixture/live-read-only sourcing flow, validate, normalize, dedupe, enrich | observations, tasks, changed scores; no sends |
| Friday | 45 min | partner review of new/changed in-thesis leads | advance/hold/decline decisions and reasons |
| Friday | 20 min | KPI, risk, and dependency review | weekly rollup; unchanged noise suppressed |
| Monthly | 60 min | thesis, path, runway, model-version review | continue/pivot/pause decision |

Daily brief inclusion for the current runtime remains: `new_in_thesis`, `materially_changed_in_thesis`, `status_changed`; suppress `unchanged`; sort `total DESC`, `confidencePoints DESC`, `retrievedAt DESC`. `finalScore` and `dataConfidencePoints` are future names only until a versioned refresh-contract migration. Each item shows source change, score/cap movement, evidence state, top three unknowns, workflow stage, one next action, owner, and due date. Coverage failures appear before ranked leads.

Stop/continue rule: continue a weekly cycle only if the source run has visible coverage status, every advanced lead has an evidence-linked rationale, workload fits the approved time box, and no approval gate was bypassed. Pause on missing strategy/path decisions, repeated coverage failure, sensitive-data risk, unreviewed external communication, or capacity overrun for two consecutive weeks.

## 11. Twelve-week launch-preparation roadmap

The roadmap prepares a disciplined search; it does not launch fundraising or outreach.

| Week | Outcome | Concrete work | Acceptance / exit gate |
|---:|---|---|---|
| 1 | context and boundary locked | recover exact prior chat; inventory repo; list personal unknowns and constraints | `G0-context`; no memory summary treated as authority |
| 2 | strategy decision-ready | complete geography, industry, earnings/EV, characteristics, exclusions, runway/time/risk fields | all required fields non-null; Miles decides `G1-strategy` |
| 3 | path decision-ready | compare the three current paths—traditional, self-funded, and independent sponsor—with illustrative personal inputs; keep accelerator/sponsor deferred/unverified | unknowns visible; Miles decides `G2-path-runway` |
| 4 | workflow persistence spec proven | implement schemas for workflow, activities, tasks, decisions, risks and fixture migration | validation passes; current demo unchanged; no external adapter |
| 5 | sourcing dry run | run Exa-first contract on fixture/read-only sample; validate provenance, dedupe, change detection, coverage | every retained row has canonical URL/retrieval date; blocked/conflicts visible |
| 6 | score/workflow integration | future work: persist immutable `ScoreSnapshot`; add tasks from top unknowns; reconcile docs/code/version gaps | deterministic regression tests; `G3-model-release` decided |
| 7 | review cockpit | add weekly rollup, funnel KPIs, decision queue, risk register | zero-denominator rates null; unchanged suppressed; coverage gaps first |
| 8 | diligence room | implement checklist/index/pointers and privacy boundary | no confidential docs in git; review states enforced |
| 9 | capital planning | replace placeholder-only comparison with input-state-aware scenario worksheet | facts/assumptions/unknowns distinct; unknown amounts cannot balance |
| 10 | outreach rehearsal only | render draft broker/owner/follow-up templates against synthetic contacts | fail-closed placeholders; `sentAt: null`; no connector/send path |
| 11 | flagship demo validation | run employer demo and three target-user usability sessions separately | scripted tasks completed; claims log distinguishes observed feedback from demand |
| 12 | go/no-go rehearsal | run full fixture flow; review strategy, KPIs, risks, privacy, legal language, capital dependencies | continue/pivot/pause decision; any external launch needs separate `G4`/`G6` approval |

## 12. Flagship project: Main Street Radar — Search Readiness OS

### Recommendation

Build the flagship as an extension of the existing responsive web dashboard, not a Mac-only app or a detached consulting spreadsheet. Employer-demo story: a provenance-first decision system that turns noisy public listings into reproducible, evidence-gated work. Consulting-use story: a client-controlled pre-search readiness and target-screening workflow delivered with clear boundaries and no claims of brokerage, investment advice, financing, or legal/tax advice.

### Option comparison (recommendation, not market validation)

Scores are internal 1–5 judgments (`5` best); they are not user research.

| Surface | Pain addressed | Time-to-value | Demonstrability | Defensibility | Maintenance | Privacy | Role relevance | Decision |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| responsive web dashboard extension | 5 | 4 | 5 | 4 | 4 | 4 with local fixtures | 5 | **build**; extends real working product |
| native Mac app | 3 | 2 | 5 | 3 | 2 | 5 | 4 | defer; no current native requirement |
| consulting workflow only (docs/spreadsheet) | 4 | 5 | 3 | 2 | 5 | 3–4 | 4 | use as delivery layer, not flagship codebase |
| lightweight CLI/CSV scorecard | 3 | 4 | 3 | 3 | 4 | 5 | 4 | optional import/export utility after schemas stabilize |

### Employer demo path (8 minutes, credential-free)

1. State the boundary: 10 unverified public leads; no availability, financing, or investment claim.
2. Edit thesis inputs and show deterministic `thesisVersion`, gates, score, and caps without SDE/EBITDA conversion.
3. Open one memo; trace a sourced fact, calculation, inference, and unknown to provenance.
4. Move the lead through internal review, create a top-unknown task, and show deterministic score recomputation; immutable score snapshots are future persistence behavior, not current demo evidence.
5. Open the weekly cockpit: coverage gaps first, changed leads only, KPI denominators, risk/decision gates, and a future input-aware capital worksheet that refuses unknown outputs; current CapitalView remains an illustrative preview.

Demo acceptance: works from `npm ci` and credential-free fixtures; seeded timestamps are deterministic; no personal/contact/confidential data; mobile and desktop smoke paths; lint/typecheck/test/source validation/build/UI checks pass.

### Target-user validation plan

Recruit separately and with Miles approval: 2 current/recent searchers, 1 ETA investor/accelerator operator, 1 SMB acquisition advisor, and 1 operator considering acquisition. Do not contact anyone from this task.

Use five task tests: define thesis; identify why a lead is capped; find the next evidence request; explain a KPI denominator/coverage failure; determine why capital output is unavailable. Capture task completion, time, wrong-turns, confidence before/after, and exact qualitative feedback. Ask about their current process and last real example before showing the prototype to reduce solution-leading.

Validation bar for iteration, not demand proof: at least 4/5 participants complete 4/5 tasks without coaching; every participant correctly distinguishes score from recommendation and fixture from current availability; at least 3 identify a real current workflow step the product could replace. Failing the bar triggers one bounded revision and retest. Even passing does not prove willingness to pay, market size, acquisition outcomes, or revenue.

### Productized-service boundary

Potential productized service name: `Search Readiness Sprint` (working label). Deliverables may include: client-owned thesis decisions; configured private/local workflow; source/provenance hygiene; screening scorecard setup; weekly review facilitation; diligence-request index; and scenario framework populated only from client-provided or cited information.

Explicitly excluded without separately qualified/licensed professionals: deal recommendation; valuation/fairness opinion; legal/tax/securities advice; broker/intermediary activity; investor solicitation; lender placement or eligibility promise; QoE/audit; background checks; confidential document hosting; outreach sending; negotiation; LOI or transaction drafting. Client retains every go/no-go and external-action decision.

Service acceptance: written scope and exclusions; client data map and retention/deletion agreement; no secrets in source control; fact/assumption/unknown labels; source links; approval log; handoff/export; no use of client results as public claims without express approval.

### Honest portfolio/resume claims after verified implementation

Allowed only when the corresponding checks are complete:

- “Built a TypeScript/React acquisition-screening prototype with deterministic versioned scoring, explicit missing-data caps, source provenance, and credential-free fixtures.”
- “Designed an evidence-gated search-preparation workflow spanning sourcing, dedupe, score snapshots, CRM stages, diligence requests, decision/risk registers, and illustrative capital scenarios.”
- “Added automated lint, typecheck, unit, provenance, build, and browser smoke checks.”
- “Conducted `N` usability sessions; `X/N` participants completed the defined tasks” only with actual session records and permission-safe aggregation.

Claims to avoid unless separately verified: “AI finds acquisition targets automatically”; “production CRM”; “live daily pipeline”; “SBA-approved/eligible”; “funded search”; “investor-backed”; “generated proprietary deal flow”; “validated product-market fit”; “improved returns”; “reduced diligence risk”; “closed/acquired deals”; “consulting clients”; “revenue”; or “secure/compliant” beyond the specific controls tested.

## 13. Cross-artifact acceptance checklist

The following are future implementation acceptance criteria, not claims about the current demo. Implementation is ready for a real pre-launch dry run only when all are true:

- The same `SearchStrategy` generates dashboard criteria, score snapshots, brief filters, and capital-path gates; no duplicated target ranges disagree.
- Every score is reproducible from `screenVersion`, `thesisVersion`, `inputHash`, components and caps; any formula change creates a new screen version.
- Funnel stage entry is event-derived; draft, approval, send, reply, engagement, and diligence are distinct and never inferred from one another.
- Facts, calculations, inferences, illustrative assumptions, and unknown personal inputs render distinctly across memo, CRM, diligence, capital, weekly brief, and export.
- No code path sends, schedules, applies, publishes, creates accounts/OAuth, raises capital, applies for financing, forms an entity, or stores confidential/gated material without a later explicit approval and appropriate controls.
- Fixture validation covers missing/null inputs, conflicts, blocked fetch, duplicates, zero denominators, stage-transition guards, immutable score snapshots, draft-only outreach, and privacy-safe exports.
- Link/structure/consistency review finds no invented Miles data, investor/lender/seller commitments, invented current availability, unsupported market claims, secrets, sensitive data, or unrelated churn.

## 14. Smallest next decisions for Miles

1. Choose preparation mode: part-time preparation or full-time searcher.
2. Choose one current path to model first: traditional, self-funded, or independent sponsor. Keep `accelerator_or_sponsor` deferred/unverified until a specific program is first-party verified.
3. Fill geography, industries, SDE/EBITDA basis and range, EV range, hard exclusions, runway months, weekly hours, risk tolerance, and maximum equity check—or explicitly mark each deferred.
4. Decide whether the next build increment is Week 4 schema persistence or Week 2 strategy intake; recommendation: strategy intake first so software does not encode unapproved personal defaults.

**Under-two-minute next action:** duplicate the `SearchStrategy` field list into a scratch note and enter only `searcherRole`; leave every other unknown as `null`.
