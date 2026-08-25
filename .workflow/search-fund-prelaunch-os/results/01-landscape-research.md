# Search-fund landscape and flagship-product evidence

**Status:** integration-ready research packet; decision support only

**As of:** 2026-08-25 (all web sources below were checked or accessed on 2026-08-25)

**Scope:** United States search preparation, Entrepreneurship Through Acquisition (ETA), and small-business acquisition workflows. This packet does not assert that Miles has capital, accreditation, net worth, financing eligibility, an investor network, an entity, a target, or an acquisition opportunity. It does not provide legal, tax, securities, lending, accounting, valuation, or investment advice.

## 1. Executive recommendation

### Recommendation — build one local-first web flagship

Extend the existing **Main Street Radar** responsive React/Vite dashboard into a **Search Readiness OS**. Keep the existing sourcing, provenance, deterministic screen, scenario-only capital view, and credential-free fixture as the foundation. Add only the smallest evidence-gated operating layer needed to demonstrate:

1. a decision-ready search thesis with explicit null/unknown states;
2. source-linked lead triage with facts, calculations, inferences, and unknowns visibly separated;
3. a next-evidence/task queue and review-stage audit trail;
4. a diligence/data-room index that stores pointers and hashes, not confidential documents; and
5. an input-aware capital-readiness worksheet that refuses to label unknown amounts as balanced or financing-qualified.

This is a **recommendation**, not validated customer demand. It follows the observed repository direction and the workflow evidence in Sections 6–7. The flagship should be offered separately as a draft, client-controlled **Search Readiness Sprint** workflow or consulting product; the service is a delivery layer, not a replacement for the product or a claim that Miles is a broker, lender, adviser, accountant, lawyer, or investment professional.

### Why this surface wins the comparison

| Option | Real pain addressed | Time to first value | Employer demonstration | Defensibility | Maintenance burden | Privacy | Relevance to acquisition/operations roles | Decision |
|---|---|---:|---:|---:|---:|---:|---:|---|
| **Responsive web/local dashboard extension** | Evidence triage, provenance, review queue, diligence readiness, capital dependencies | 4/5 | 5/5 | 4/5 | 4/5 | 4/5 with local/synthetic fixtures | 5/5 | **Build**; it extends working code and shows product + operating judgment |
| Mac-only app | Personal desktop workflow and offline privacy | 2/5 | 5/5 | 3/5 | 2/5 because it adds a second surface and native maintenance | 5/5 | 4/5 | Defer; no current repo or user evidence requires native-only behavior |
| Consulting workflow only (documents/spreadsheet) | Thesis, diligence, capital-planning facilitation | 5/5 | 3/5 | 2/5 | 5/5 | 3–4/5 depending on client tooling | 4/5 | Use as a service layer; not the flagship engineering artifact |
| AI-heavy target-finder | Discovery and summarization | 2/5 until data rights/quality and user need are proven | 4/5 | 2/5 absent proprietary data/evals | 2/5 | 2/5 if external data or confidential uploads are added | 3/5 | Do not make this the first build; AI may assist explanations later, never invent facts |
| Local CLI/CSV utility | Repeatable imports, scorecards, exports | 4/5 | 3/5 | 3/5 | 4/5 | 5/5 | 4/5 | Optional adapter after schemas stabilize |

The scores are internal product judgments, not market benchmarks. **Recommendation/inference:** the strongest workflow evidence today is that buyers/searchers must reconcile noisy public claims, substantial diligence documents, financing dependencies, and approval gates—not that a particular software category has product-market fit. [S7][S10][S18][S20][S21]

### Honest portfolio and business value

**After implementation and checks pass, Miles can honestly say:**

- “Built a TypeScript/React acquisition-screening prototype with deterministic versioned scoring, explicit missing-data caps, source provenance, and credential-free fixtures.”
- “Designed an evidence-gated search-preparation workflow spanning sourcing, dedupe, review tasks, diligence requests, decision/risk registers, and illustrative capital scenarios.”
- “Implemented a local-first demo that distinguishes source-reported facts, calculations, inferences, illustrative assumptions, and unknowns.”

**Only say these after separately verified evidence exists:**

- number and result of usability sessions;
- measured review-time savings or other business impact;
- client/user adoption, revenue, consulting clients, or willingness to pay;
- live pipeline, production CRM, AI-generated targets, proprietary deal flow, improved returns, reduced diligence risk, SBA eligibility, financing approval, investor backing, or closed acquisitions.

## 2. Evidence rules and current project boundary

Use four labels throughout the pre-launch system:

- **Verified fact:** directly supported by a cited source, within that source’s population, date, and scope.
- **Illustrative assumption:** editable scenario math; not a market term, forecast, or statement about Miles.
- **Recommendation:** reversible operating/product judgment to test; it is not proof of demand or professional advice.
- **Unknown:** missing, conflicting, stale, inaccessible, or personal information that must remain blank until Miles or an authorized professional supplies it.

### Observed project state

These are local repository observations, not market claims:

- `README.md` describes Main Street Radar as a partner-facing local prototype for sourcing, screening, and discussing small-business acquisition leads.
- `data/opportunities.json` contains 10 credential-free demo leads; `data/source-manifest.json` preserves each marketplace/listing ID, canonical URL, and retrieval date of 2026-08-03.
- `src/domain/scoring.ts` implements deterministic `screen-v1.0`; the existing docs describe fixed weights, missing-data caps, thesis gates, and a scenario-only capital preview.
- No current repository artifact proves a live refresh, persistent CRM, investor/lender/seller relationship, capital commitment, financing eligibility, current availability, or acquisition opportunity. Airtable, Clay, scheduling, outreach, and external account actions are explicitly future/proposed boundaries in `README.md` and `docs/sourcing-workflow.md`.

The product contract is therefore well matched to a provenance-first operating system. Do not create a second score model, a parallel CRM, or a native app until the current schemas and user evidence justify it.

## 3. Current search-fund landscape

### 3.1 Traditional / core search fund

**Verified fact — population and structure.** Stanford’s 2026 Search Fund Study covers search funds formed in the United States and Canada since 1984 and reports data through 2025-12-31. Stanford’s 2026 Primer describes the core model as an entrepreneur raising capital from a consortium of investors to find and acquire a business, and it expressly focuses on the core model rather than cataloging every model permutation. [S1][S2][S3]

**Verified fact — latest aggregate observations.** Stanford’s July 13, 2026 summary reports: about half of funds launched in 2021–2024 acquired a company; the aggregate acquisition rate since the first report in 1996 is 58%; acquiring a company typically takes around 20 months; median purchase price for firms acquired in 2024–2025 was $16 million; top targeted industries in 2024–2025 were services, software, and education; aggregate PME across all search funds was 2.88; and as of 2025-12-31 aggregate IRR was 33.9% and ROI was 4.75x. These are pooled historical observations for the study population, not Miles-specific probabilities, forecasts, or investment advice. [S1]

**Verified fact — recent cohort caution.** The same Stanford summary says about half of the 2021–2024 launch cohort acquired, which is lower than the all-time 58% aggregate acquisition rate. Cohort rates are not directly comparable to an individual plan without understanding the study’s definitions, censoring, and timing. [S1]

**Unknown / caution.** The headline return metrics pool different vintages, outcomes, and operating states; they do not establish a median investor outcome, a guaranteed path, or a return available to a first-time searcher. The study’s new long-duration-enterprise data also means the population is evolving. [S2] Read the full study and its definitions before using any metric in a memo.

### 3.2 Self-funded search / ETA

**Verified industry-source fact, limited scope.** SearchFund.org describes self-funded searches as a common and growing path in which the entrepreneur funds the search stage and may approach investors when a target is identified; it also describes traditional search as a first-stage investor-backed search. This is a practitioner/platform description, not an independent aggregate study or proof that a self-funded search is common in every geography, size band, or cohort. [S4]

**Illustrative mechanics / recommendation.** A self-funded search can preserve optionality before a target is found, but it moves search-period burn and opportunity cost onto the searcher. A planning case may include buyer cash, senior debt, seller financing, and/or outside equity; each source, amount, term, and condition remains unknown until target-specific evidence exists.

**Searcher incentive — recommendation/inference.** The likely attraction is more control and potentially less early dilution; the trade-off is personal runway, concentrated downside, and possible debt/guarantee exposure. Treat this as a decision hypothesis, not a universal economic result. Miles must set a private liquidity floor and stop-loss before any lender or investor discussion.

**Evidence gap.** Stanford’s headline study is a core-search-fund dataset; do not transplant its acquisition or return statistics onto self-funded searches. No current source in this packet establishes self-funded search performance, typical search budgets, or Miles’s eligibility.

### 3.3 Accelerator-backed search

**Verified first-party program facts, not market benchmarks.** Search Fund Accelerator (SFA) says its program uses an intensive bootcamp, weekly check-ins, targeted outreach, diligence and transaction support, experienced banking/legal/accounting partners, and a committed capital pool. Its site currently reports 10 cohorts, 46 searchers, and 27 CEOs; these are SFA’s own claims about its program and are not independently validated here. [S5][S6][S7]

**Program-specific economics caution.** SFA’s economics page self-reports no step-up on search costs, lower transaction costs, a “common fund,” and an 85% versus 50% acquisition-probability comparison. Those statements are promotional, program-specific, and not a reliable market benchmark or expected outcome for Miles. Any actual economics, governance, equity, vesting, fees, board rights, or capital conditions require the program’s current documents and qualified review. [S8]

**Decision implication.** An accelerator can exchange some independent fundraising burden for program selection, support, governance, and program economics. It is a credible alternative to compare, but not a generic “accelerator path” with transferable terms. Keep `accelerator_or_sponsor` deferred/unverified in the project schema until a specific program is selected and first-party terms are reviewed.

### 3.4 Independent sponsor / fundless sponsor

**Verified descriptive evidence.** The 2024 McGuireWoods Independent Sponsor Deal Survey reports more than 300 responses covering independent-sponsor-led control transactions closed in 2021–2023. It is a descriptive practitioner survey of transactions and deal terms, not a randomized performance study. [S9]

**Verified current practitioner observation.** McGuireWoods’ January 29, 2026 alert characterizes capital as available but selective, with heightened expectations for preparation, clarity, execution, focused theses, realistic value-creation plans, transparent risk assessment, and advance process planning. This is a law-firm practitioner observation, not proof of capital availability for a new sponsor or of likely terms. [S10]

**Mechanics.** An independent sponsor generally identifies a deal, organizes deal-by-deal equity/debt capital, negotiates sponsor economics and governance, and may operate or appoint management. The legal and economic package is negotiated per transaction. Jones Walker describes the model as requiring simultaneous workstreams and carrying uncertainty because capital is formed deal by deal rather than from committed capital. [S11]

**Sponsor incentive — recommendation/inference.** The model can fit a person with a credible thesis, sourcing edge, operating/deal history, and capital relationships; it is a poor default for someone who has not yet evidenced those dependencies. Do not infer Miles has any of them.

### 3.5 Comparison at a decision level

The following is a **recommendation synthesis** for decision-making, not a claim that these control, economics, or capital patterns are typical for every search.

| Path | Search-period capital | Acquisition capital | Control/economics | Main dependency gate | Evidence quality for Miles |
|---|---|---|---|---|---|
| Traditional | Outside search capital after a raise | Acquisition equity plus debt/other negotiated sources | Investor-governed; terms negotiated | Full-time commitment, investor fit, focused thesis, counsel-reviewed communications | High for core-model existence; zero for Miles-specific fundraising |
| Self-funded | Searcher’s private runway and overhead | Buyer cash, lender debt, seller note, optional outside equity | Potentially more control; personal concentration increases | Liquidity floor, debt/guarantee tolerance, target cash flow, lender screen | High for SBA boundaries; low for self-funded outcomes |
| Accelerator-backed | Program/fund economics after selection | Program capital and/or partners under program terms | Program governance/support and specific economics | Eligibility/selection, location/work style, terms and operating fit | Medium for SFA’s own program facts; no generic terms |
| Independent sponsor | Sponsor runway and deal pursuit cost | Deal-by-deal equity, debt, seller sources | Negotiated sponsor fee/carry/governance | Credibility, target, capital-provider fit, counsel-reviewed structure | Medium for descriptive market process; zero for Miles-specific access |

## 4. Stages, incentives, and economics without invented terms

### Recommended operating stages

The sequence below is a **workflow recommendation** grounded in Stanford’s core model, SBA’s acquisition checklist, SFA’s process description, and the project’s existing contract. It is not a claim that every search uses these exact stages:

1. **Preparation:** decide role, thesis, geography, exclusions, runway, time, risk, and path; record unknowns.
2. **Capital-path readiness:** model search runway and acquisition sources/uses; do not raise, apply, or solicit.
3. **Sourcing:** discover public/proprietary leads with canonical provenance; keep listing facts unverified.
4. **Screening:** apply deterministic thesis gates and score; create evidence requests instead of filling gaps with estimates.
5. **Partner review:** decide advance, hold, decline, or request data; do not call a score an investment recommendation.
6. **Authorized contact / NDA:** only after an exact user approval and appropriate legal/privacy review; drafts remain unsent.
7. **Diligence and financing:** organize legal, tax, accounting, commercial, operating, people, insurance, technology, and lender evidence; professional advisers decide conclusions.
8. **LOI / definitive documents / close:** outside this pre-launch build; requires separate approvals and qualified professionals.
9. **Operate / transition:** outside the current demo except for a draft transition checklist.

### Incentive map

| Party | Plausible objective | What is unknown and must not be invented |
|---|---|---|
| Searcher/operator | Reach an operator role with meaningful upside, support, and a viable business | Miles’s experience, role preference, compensation, equity, vesting, governance, and willingness to operate |
| Traditional search investor | Access a searcher and potential acquisition/operating return with governance and information rights | Investor identity, accreditation, commitment, preferred return, conversion, board rights, fees, and exit terms |
| Accelerator | Select and support searchers/CEOs while aligning program and investor outcomes | Acceptance criteria, current economics, control, exclusivity, geography, capital conditions, and availability |
| Independent-sponsor capital provider | Evaluate a specific deal, sponsor, risk/return, governance, and downside protection | Relationship, mandate, check size, terms, diligence threshold, and commitment |
| Lender | Make a qualifying loan that can be repaid under documented terms and program rules | Underwriting, rate, collateral, guarantees, covenants, borrower/target eligibility, and approval |
| Seller | Achieve an acceptable price/terms and transition outcome while protecting confidentiality | Seller intent, availability, price, representations, financing willingness, rollover/note, and access |

All economic fields in the project should carry evidence state and source links. A “lead,” “score,” “draft,” “approval,” or “lender pre-screen” is not a commitment, and an approval of a draft is not a send.

### Formulas to implement, not forecasts

```text
search runway need
  = search months × (monthly personal burn + monthly search overhead)
  + setup/professional cost
  + broken-deal/diligence reserve
  + contingency

total uses
  = purchase consideration
  + assumed/refinanced obligations
  + transaction and financing costs
  + opening working capital
  + near-term capex
  + transition/replacement-manager cost
  + contingency

total sources
  = buyer/sponsor cash + senior debt + seller/junior debt + outside equity

funding gap = total uses - total sources

manager-adjusted cash flow (MACF)
  = evidenced operating cash flow
  - market manager compensation
  - maintenance capex
  - recurring working-capital investment
  - other normalized cash obligations

DSCR = MACF / annual required principal-and-interest debt service
```

Unknown inputs must remain unknown; do not coerce them to zero. Do not display DSCR until target-specific MACF and debt terms are evidenced. The existing CapitalView’s percentages and 12% uses uplift remain illustrative UI fixtures, not market terms.

## 5. Acquisition financing and regulatory boundaries

### SBA 7(a): current program facts

**Verified fact — official SBA page, updated 2026-03-26.** SBA says 7(a) proceeds may be used for complete or partial changes of ownership; the maximum 7(a) loan amount is $5 million; eligible businesses must be operating, for-profit, U.S.-located, small under SBA size requirements, not in an ineligible category, unable to obtain desired credit on reasonable non-government terms, creditworthy, and able to demonstrate a reasonable ability to repay. The borrower applies directly through a participating lender, not SBA. [S12]

**Verified fact — repayment and terms boundary.** SBA says most 7(a) term loans are repaid with monthly principal and interest from business cash flow, and rates are negotiated between borrower and lender subject to SBA maximums. SBA’s lender page also lists a typical maximum maturity of 10 years or less for 7(a), with exceptions for certain real estate/equipment financing. These are program descriptions, not an approval, quote, or forecast for any target. [S12][S13]

**Verified fact — current SOP anchor.** SBA’s document index identifies SOP 50 10 as the lender/development-company origination policy and lists Version 8 as effective June 1, 2025. The current lender, borrower, target, and transaction must be checked against the operative SOP and lender policy at that time. [S14]

**Important scope limitation.** A target’s public listing label (“SBA approved,” “SBA pre-qualified,” or similar) is not evidence of Miles’s eligibility, a lender commitment, loan approval, collateral/guarantee terms, or debt-service capacity. The app must preserve such text as a sourced claim with a next verification task.

### Other sources

Buyer cash, seller notes, acquisition equity, conventional bank debt, and sponsor co-investment are valid **framework fields**, not assumed available sources. Amounts and terms are target-specific and must advance through an evidence state such as `illustrative -> pre_screened -> indicated -> committed -> funded`. No current file should display a balanced case when a required source is unknown.

### Securities / capital-raising boundary

**Verified fact — SEC current educational material.** SEC says a business may not offer or sell securities unless the offering is registered or falls within an exemption. Its Offering Pathways page, last reviewed April 24, 2026, describes Rule 506(b) private placements without general solicitation and Rule 506(c) offerings that may broadly solicit only when purchasers are accredited and other conditions are met. SEC’s General Solicitation page says unrestricted public websites and other market-conditioning communications can be general solicitation. [S15][S16]

**Verified fact — Rule 506(c) details.** SEC’s June 21, 2024 Rule 506(c) page says all purchasers must be accredited, the issuer must take reasonable steps to verify accredited status, Form D is due within 15 days after the first sale, and state notice/fee requirements may remain. This educational source does not choose a path for a particular offering. [S17]

**Project rule / recommendation.** Keep investor maps, outreach copy, and capital scenarios draft-only. Do not publish an offering, solicit investors, choose an exemption, describe Miles as accredited, or send a capital communication. A securities lawyer must determine structure, broker/dealer or adviser implications, disclosure, and applicable federal/state requirements before any external action.

### Tax, accounting, and legal diligence

**Verified fact — SBA acquisition checklist.** SBA instructs buyers of existing businesses to examine licenses and permits, zoning, environmental concerns, valuation, contracts, leases, cash flow, inventory, and other infrastructure. SBA says a thorough objective investigation may involve an attorney and accountant and typically includes a letter of intent, confidentiality agreement, contracts/leases, financial statements, tax returns, sales agreement, and purchase-price adjustment. [S18]

**Verified fact — IRS asset allocation.** IRS’s current Form 8594 page says both seller and purchaser of a group of assets making up a trade or business generally use Form 8594 when goodwill/going-concern value attaches or could attach and the purchaser’s basis is determined by the amount paid. The IRS page identifies the current revision as 2021 and says there are no recent developments at the page’s access date; confirm the current form/instructions for any actual transaction. [S19]

**Recommendation.** The project’s diligence index should mirror these evidence classes without storing confidential documents: corporate/ownership, financial, tax, commercial/customer, operations, people/benefits, contracts/licenses, insurance/risk, technology/security, financing, and transition. Each item needs an evidence state, source-document pointer/hash, reviewer, finding, severity, and next action. Only qualified professionals can conclude legal, tax, accounting, valuation, QoE, environmental, insurance, or regulatory matters.

## 6. Evidence-backed workflow pains and flagship fit

### Pain 1 — public listing facts are leads, not diligence

**Verified fact — marketplace disclosure.** BizBuySell warns users that listing details are provided by the business seller and have not been independently verified, and says buyers should perform due diligence on financial statements, sales/revenue, customers, staffing, and expenses. Its terms also say the marketplace has no obligation to monitor or verify listing accuracy. [S20][S21]

**Product implication — recommendation.** Preserve canonical URL, publisher, listing ID, retrieval date, raw source label, normalized value, and conflict state. Score the next evidence request, not an imagined investment quality. This directly supports the existing Main Street Radar product contract.

### Pain 2 — diligence crosses multiple professional and document systems

**Verified fact — SBA workflow requirement.** SBA’s buyer guidance spans financial, legal, operating, property, contract, tax, and transaction documents and recommends attorney/accountant help. [S18]

**Product implication — recommendation.** A local index, task queue, and status gate can reduce “where is the evidence?” friction without pretending to replace professionals. Store metadata and approved pointers only; keep gated seller materials outside git.

### Pain 3 — research and outreach must continue while a deal is evaluated

**Verified first-party program observation.** SFA describes targeted, well-managed outreach as a complicated process, weekly check-ins, critical evaluation, and continued outreach while diligence on a specific opportunity is underway. This is SFA’s operating-method claim, not a universal benchmark. [S7]

**Product implication — recommendation.** Separate sourcing, review, approved draft, sent activity, reply, engagement, NDA, diligence, hold, and decline. A prepared draft must never create a contacted stage; an active diligence process must not erase the rest of the pipeline.

### Pain 4 — capital formation depends on clarity and evidence

**Verified practitioner observation.** McGuireWoods’ 2026 alert emphasizes preparation, focused theses, realistic value-creation plans, transparent risk assessment, and disciplined process management in a selective independent-sponsor environment. [S10]

**Product implication — recommendation.** Build a decision/risk register and sources/uses worksheet that makes dependencies visible. Do not claim that a dashboard creates capital access; validate whether it helps a user prepare better questions and decisions.

### What the flagship should not claim

The product should not claim to find “good deals,” verify availability, predict returns, determine SBA eligibility, underwrite credit, recommend investments, conduct a QoE, provide legal/tax/accounting advice, or replace a CRM/data room/lender/counsel. It should claim only what its tests and evidence support: reproducible triage, explicit unknowns, source-linked work, deterministic calculations, and draft-only preparation.

## 7. Buildable flagship specification and demo

### Smallest credible implementation

Implement in the existing React/Vite repo, preserving current behavior:

1. **Strategy intake:** geography, industry inclusion/exclusion, SDE/EBITDA basis/range, EV range, required characteristics, exclusions, personal runway, weekly hours, risk tolerance, role, path, and maximum equity check; undecided inputs stay `null`.
2. **Evidence ledger:** every displayed value carries `sourced`, `calculated`, `inferred`, or `unknown` plus provenance and retrieval date.
3. **Review queue:** score/cap rationale, top three unknowns, next evidence request, owner, due date, and explicit advance/hold/decline decision.
4. **Diligence index:** privacy-safe metadata/pointer/hash only; no confidential or gated seller documents.
5. **Capital-readiness worksheet:** separate search runway, acquisition uses, acquisition sources, funding gap, MACF, and DSCR; unknown values withhold conclusions.
6. **Draft-only communication layer:** render templates with placeholders and approval scope; no send, scheduling, CRM mutation, account, OAuth, or external connector.

Do not add live scraping, private-data ingestion, AI target claims, investor outreach, lender applications, entity formation, deployment, or publication in this phase.

### Employer demo path (credential-free, approximately 8 minutes)

1. State the boundary: 10 public/demo leads, each unverified; no capital, financing, availability, or investment claim.
2. Edit thesis inputs and show the versioned criteria, industry gate, score, missing-data cap, and unchanged SDE/EBITDA label.
3. Open a lead memo and trace one sourced fact, one calculation, one inference, and one unknown to its canonical source/retrieval date.
4. Create a next-evidence task and a partner-review decision; show that a score does not auto-advance a relationship stage.
5. Open diligence index and show metadata-only pointers; demonstrate that missing or conflicting evidence remains visible.
6. Open capital readiness and show an illustrative sources/uses case; remove one required source and show the funding gap/DSCR becomes unknown rather than balanced/qualified.
7. Show a weekly cockpit with coverage status, denominator-safe KPIs, changed leads, open decisions, and risks.

### Validation plan (no outreach performed by this task)

With Miles’s explicit approval, test separately with 2 current/recent searchers, 1 ETA investor/accelerator operator, 1 SMB acquisition adviser, and 1 operator considering acquisition. Do not contact anyone, collect personal data, or publish from the current task.

Use five bounded tasks: define a thesis; identify why a lead is capped; find the next evidence request; explain a KPI denominator/coverage failure; and determine why a capital output is unavailable. Record completion, time, wrong turns, confidence before/after, and exact feedback using permission-safe aggregates.

**Iteration bar — recommendation, not demand proof:** at least 4 of 5 participants complete at least 4 of 5 tasks without coaching; every participant distinguishes score from recommendation and fixture from current availability; at least 3 identify a real workflow step the product could replace. A pass supports one bounded iteration, not willingness to pay, market size, acquisition success, or revenue.

### Productized-service version

Working label: **Search Readiness Sprint**.

Potential deliverables: client-owned thesis decisions; a local/private configured workflow; source/provenance hygiene; screening scorecard; weekly review facilitation; diligence-request index; and an illustrative capital framework populated only from cited or client-provided inputs.

Explicitly exclude, absent separately qualified professionals: deal recommendation, valuation/fairness opinion, legal/tax/securities advice, broker/intermediary activity, investor solicitation, lender placement or eligibility promise, QoE/audit, confidential-document hosting, outreach sending, negotiation, LOI drafting, and transaction execution. The client retains every go/no-go and external-action decision.

## 8. Bounded path scenarios and gates

The following are **illustrative planning cases**, intentionally consistent with the companion `02-path-scenarios.md`. None is a forecast, benchmark, offer, commitment, lender view, or statement about Miles.

| Case | Illustrative search-period need | Illustrative acquisition uses/sources | Dependency gates | Continue / pause / stop |
|---|---:|---|---|---|
| Traditional search fund | 20 months × $17,000 all-in/month + $60,000 setup + $70,000 diligence reserve + $30,000 contingency = **$500,000** | $10.0m purchase + $0.6m transaction/financing + $0.5m working capital/capex + $0.3m transition/contingency = **$11.4m uses**; $4.0m senior debt + $0.5m seller note + $6.9m acquisition equity = **$11.4m illustrative sources** | Full-time role; private runway; thesis; investor fit; counsel-reviewed capital communications; negotiated governance/equity | Continue only after Miles chooses this role/path and can defend the thesis; pause if runway or structure is unresolved; stop if governance/risk is unacceptable |
| Self-funded / SBA-style | 12 months × ($6,000 burn + $2,000 overhead) + $20,000 setup = **$116,000** | $3.0m purchase + $0.18m costs + $0.15m working capital/capex + $0.10m transition = **$3.43m uses**; $2.25m senior debt + $0.30m seller note + $0.88m buyer cash/outside equity = **$3.43m illustrative sources**; debt is below the current 7(a) maximum but not thereby eligible | Private liquidity floor; target MACF; lender screen; guarantee/collateral tolerance; post-close reserve; professional review | Continue only if personal downside fits and a target/lender can evidence coverage; pause until MACF and lender review; stop/reduce size if concentration or debt risk breaches limits |
| Independent sponsor | 9 months × ($6,000 burn + $3,000 overhead) + $30,000 setup + $50,000 broken-deal reserve = **$161,000** | $8.0m purchase + $0.48m costs + $0.40m working capital/capex + $0.30m transition = **$9.18m uses**; $3.0m senior debt + $0.5m seller note + $5.48m deal equity + $0.2m sponsor co-invest = **$9.18m illustrative sources** | Credible operating/deal history; proprietary thesis/access; sponsor co-invest limit; capital-provider fit; counsel-reviewed fee/carry/governance | Continue only with evidenced credibility and a plausible capital-provider universe; pause before solicitation; stop if deal-by-deal timing or downside is unacceptable |

**Accelerator case:** SFA is a credible program-specific alternative, but it cannot be represented with the round-number cases above. Model it only after a named program’s current selection criteria, location/work style, economics, governance, equity, capital conditions, and any exclusivity are first-party verified and reviewed. SFA’s public site is not a substitute for a current term sheet. [S5][S6][S8]

### Starting-path recommendation

**Recommendation hypothesis:** start with a **self-funded-size preparation lane**, without applying for financing or asserting eligibility. It is the most reversible way to test thesis discipline, evidence handling, target-size math, personal-risk gates, and the flagship workflow while preserving the option to pivot to traditional search fundraising, a specific accelerator, or an independent-sponsor path.

This is not a recommendation to borrow or acquire. Miles must decide: searcher role/time, geography, industry, SDE/EBITDA basis/range, EV range, exclusions, runway, weekly hours, risk tolerance, maximum equity check, post-close liquidity floor, and whether self-funded concentration risk is acceptable. Until those inputs are decided, all paths remain open.

## 9. Smallest next decisions and verification gates

### Miles-owned decisions

1. Preparation mode: part-time preparation or full-time searcher.
2. Initial path: traditional, self-funded, named accelerator, or independent sponsor.
3. Geography and industry inclusion/exclusion.
4. SDE/EBITDA basis and range; enterprise-value range; recurring/repeat-revenue, fragmentation, retention, owner-dependence, and management preferences.
5. Private runway months, weekly time, risk tolerance, maximum equity check, post-close liquidity floor, and debt/guarantee/concentration limits.

Do not store raw bank, tax, credit, net-worth, or account data in this repository. Store only derived ranges/decisions and evidence states.

### Verification gates

| Gate | Pass condition | Required evidence |
|---|---|---|
| G0 context | Current repo and exact prior context are reconciled | Live files, current git state, and exact signed-in chat/project inspection by parent task |
| G1 strategy | All required strategy fields decided or explicitly deferred | Miles-owned decision record; no defaults treated as approval |
| G2 path/runway | One path is selected for preparation, not committed externally | Private runway model, risk limits, and scenario dependencies |
| G3 model release | Screen, provenance, workflow, and capital semantics reconcile | Deterministic tests, null/unknown fixtures, link checks, and review of docs/code |
| G4 user validation | Target users can complete bounded tasks | Permission-safe session records; no claims beyond observed results |
| G5 professional review | Real financing, legal, tax, accounting, securities, or transaction decision is ready | Qualified professional review of the actual facts and documents |
| G6 external action | Any send, application, purchase, entity, OAuth, financing, publication, or deployment is authorized | Exact Miles approval and action-specific controls; none exists in this packet |

## 10. Bibliography

All links below are direct source pages or documents. Access date for every entry: **2026-08-25**.

### Primary / official / first-party sources

| ID | Source and scope | Publication/update date | URL |
|---|---|---|---|
| [S1] | Stanford GSB, “Search Funds Keep Offering a Proven Path to Ownership.” Core U.S./Canadian search-fund study summary; metrics through 2025-12-31. | 2026-07-13 | https://www.gsb.stanford.edu/insights/search-funds-keep-offering-proven-path-ownership |
| [S2] | Stanford GSB, “2026 Search Fund Study: Selected Observations,” Case E967. Search funds formed in U.S./Canada since 1984; data through 2025-12-31; includes 67 long-duration enterprises. | 2026 | https://www.gsb.stanford.edu/faculty-research/case-studies/2026-search-fund-study-selected-observations |
| [S3] | Stanford GSB, “A Primer on Search Funds,” Case E958. Educational guide focused on the core consortium-backed model; not a catalog of every permutation. | 2026 | https://www.gsb.stanford.edu/faculty-research/case-studies/primer-search-funds-practical-guide-entrepreneurs-embarking-search |
| [S4] | SearchFund.org, ETA overview. Industry-platform description of traditional, self-funded, and independent-sponsor alternatives; not an independent performance study. | Date not stated | https://www.searchfund.org/ |
| [S5] | Search Fund Accelerator, home/program overview. First-party program claims about cohorts, searchers, CEOs, support, and committed capital. | Date not stated | https://www.searchfundaccelerator.com/ |
| [S6] | Search Fund Accelerator, FAQ. First-party program geography, cohort timing, partner stance, and stated economics context. | Date not stated | https://www.searchfundaccelerator.com/faq |
| [S7] | Search Fund Accelerator, “How It Works.” First-party process description: bootcamp, outreach, weekly check-ins, diligence, financing, and transition. | Date not stated | https://www.searchfundaccelerator.com/how-it-works |
| [S8] | Search Fund Accelerator, “SFA Economics.” First-party promotional economics and probability claims; do not generalize. | Date not stated | https://www.searchfundaccelerator.com/sfa-economics |
| [S12] | U.S. SBA, “7(a) loans.” Official program uses, $5m maximum, eligibility, lender application, repayment framing; last updated 2026-03-26. | 2026-03-26 | https://www.sba.gov/loans/7a-loans/ |
| [S13] | U.S. SBA, “SBA lenders.” Official lender/program overview, changes of ownership, negotiated rates, maturity, collateral and lender process. | Date not stated; accessed 2026-08-25 | https://www.sba.gov/sba-lenders/ |
| [S14] | U.S. SBA, “SOP 50 10, Lender and Development Company Loan Programs.” Official document index; Version 8 listed as effective 2025-06-01. | Version 8 effective 2025-06-01 | https://legacy.sba.gov/document/sop-50-10-lender-development-company-loan-programs |
| [S15] | U.S. SEC, “Offering Pathways.” Official small-business capital-raising pathways; last reviewed 2026-04-24. | 2024-06-12; reviewed 2026-04-24 | https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/offering-pathways |
| [S16] | U.S. SEC, “General Solicitation.” Staff educational explanation of Rule 506(b), public communications, and pre-existing substantive relationships; no legal force. | 2024-06-14 | https://www.sec.gov/resources-small-businesses/building-blocks/general-solicitation |
| [S17] | U.S. SEC, “General solicitation — Rule 506(c).” Accredited-purchaser verification, Form D, and state-notice boundaries. | 2024-06-21 | https://www.sec.gov/resources-small-businesses/exempt-offerings/general-solicitation-rule-506c |
| [S18] | U.S. SBA, “Plan your business.” Official existing-business buying/diligence checklist and professional-help guidance. | Date not stated; accessed 2026-08-25 | https://www.sba.gov/counseling/plan-your-business/ |
| [S19] | IRS, “About Form 8594.” Asset-acquisition reporting scope; current revision listed as 2021; no recent developments listed. | Current page accessed 2026-08-25 | https://www.irs.gov/forms-pubs/about-form-8594 |

### Primary marketplace / first-party workflow disclosures

| ID | Source and scope | Publication/update date | URL |
|---|---|---|---|
| [S20] | BizBuySell, “Avoid Scams and Fraud.” Marketplace warning that seller-provided listing information is not independently verified; buyer due diligence reminder. | Date not stated; accessed 2026-08-25 | https://www.bizbuysell.com/avoid-scams/ |
| [S21] | BizBuySell, Terms of Use. Marketplace terms disclaiming an obligation to verify listing accuracy and describing seller/buyer workflow boundaries. | Current terms accessed 2026-08-25 | https://www.bizbuysell.com/terms-of-use/ |

### Secondary / practitioner sources

| ID | Source and scope | Publication/update date | URL |
|---|---|---|---|
| [S9] | McGuireWoods, 2024 Independent Sponsor Deal Survey. More than 300 responses covering independent-sponsor-led control transactions closed in 2021–2023; descriptive survey, not randomized performance evidence. | 2024 | https://media.mcguirewoods.com/publications/flipbooks/is-deal-survey-2024/index.html |
| [S10] | McGuireWoods, “Independent Sponsor Capital Raising in 2026.” Practitioner observations on selective capital, preparation, thesis clarity, risk transparency, and process management. | 2026-01-29 | https://www.mcguirewoods.com/client-resources/alerts/2026/1/independent-sponsor-capital-raising-in-2026-getting-to-yes-in-a-challenging-market/ |
| [S11] | Jones Walker, “Independent Sponsors.” Law-firm description of deal-by-deal capital formation, simultaneous workstreams, and legal/transaction support. | Date not stated; accessed 2026-08-25 | https://www.joneswalker.com/en/services/practices/mergers-acquisitions/independent-sponsors.html |

## 11. Verification record

- Web research used current direct pages/documents above; Stanford’s case pages returned access restrictions to one crawler but were reachable by direct retrieval/search indexing. The source URLs remain the authoritative links; do not substitute secondary summaries for the Stanford study.
- Link checks should be rerun by the integration task on the final worktree because current pages, redirects, and policy documents can change.
- No external message, application, purchase, financing action, account/OAuth step, entity formation, deployment, publication, investor/seller/lender contact, or sensitive-data import was performed.
- No personal financial facts or commitments were invented. All scenario dollars are explicitly illustrative and match the companion path-scenarios packet.
