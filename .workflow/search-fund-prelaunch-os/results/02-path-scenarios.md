# Pre-launch path scenarios

**Status:** decision support, not a capital plan or path commitment
**As of:** 2026-08-04
**Scope:** United States planning cases; no investor, lender, seller, broker, lawyer, or accountant has been contacted.

This packet compares three ways to prepare for an acquisition search without implying that Miles has capital, accreditation, a qualifying net worth, lender eligibility, investor relationships, personal runway, a target, or a transaction. It is educational planning material, not legal, tax, accounting, securities, lending, or investment advice. Qualified professionals must assess any actual structure, solicitation, loan, tax position, or acquisition.

## Reading rules

- **Verified fact** means the statement is directly supported by a cited source, within that source's stated population and date.
- **Illustrative assumption** is editable scenario math, not a market benchmark, forecast, recommendation, or fact about Miles.
- **Formula** is deterministic arithmetic; it becomes decision-grade only when every input is target-specific and evidenced.
- **Unknown personal input** must be supplied or deliberately decided by Miles. It is never backfilled with a favorable assumption.
- **Recommendation hypothesis** is a reversible starting proposal, gated by Miles's decisions and later professional review.

## Facts that constrain all three paths

1. **Verified fact — traditional-model evidence only.** Stanford's 2026 study covers core U.S. and Canadian search funds through December 31, 2025. Stanford reports a 58% aggregate acquisition rate, an acquisition process of around 20 months, a $16 million median purchase price for 2024–2025 acquisitions, and aggregate 33.9% IRR / 4.75x ROI. These are population-level, historical, pre-decision observations; they are not Miles's probability of success or a return forecast. [S1][S2]
2. **Verified fact — two-stage core structure.** Stanford's 2026 Primer focuses on the core model in which an entrepreneur raises capital from a consortium to search for and acquire a business. Actual conversion, governance, vesting, compensation, and acquisition rights remain negotiated legal terms. [S3]
3. **Verified fact — SBA program boundary.** SBA says 7(a) proceeds may fund complete or partial ownership changes, the current maximum 7(a) loan is $5 million, borrowers apply through lenders, and eligibility includes creditworthiness and reasonable ability to repay. SBA's lender page says a business-acquisition 7(a) generally has a maturity of 10 years or less; rates are negotiated subject to SBA maximums. None of this proves that a buyer, target, structure, or amount will qualify. [S4][S5]
4. **Verified fact — securities boundary.** Every offer and sale of securities must be registered or fit an exemption. The SEC notes, among other distinctions, that Rule 506(b) prohibits general solicitation while Rule 506(c) permits it only when all purchasers are accredited and the issuer takes reasonable verification steps. Choosing or implementing an exemption is counsel-owned. [S6][S7]
5. **Verified fact — independent-sponsor evidence is descriptive, not standardized.** McGuireWoods' 2024 survey analyzed more than 300 responses about independent-sponsor-led control deals closed in 2021–2023 and documents deal-by-deal economics and governance variation. Its 2026 practitioner update says capital formation is active but selective and emphasizes preparation, focused theses, risk transparency, and early process planning. It does not establish expected returns, capital availability, or terms for a first-time sponsor. [S8][S9]

## Shared formulas and evidence states

These formulas match the repository's capital workflow: unknowns stay unknown, and an unbalanced case is never shown as balanced.

```text
search runway need
  = search months × (monthly personal burn + monthly search overhead)
  + one-time setup/professional cost
  + broken-deal or diligence reserve
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
  = senior debt + junior/seller debt + buyer/sponsor cash + outside equity

funding gap
  = total uses - total sources

manager-adjusted cash flow (MACF)
  = evidenced operating cash flow
  - market manager compensation
  - maintenance capex
  - recurring working-capital investment
  - other normalized cash obligations

DSCR
  = MACF / annual required principal-and-interest debt service
```

No scenario below calculates DSCR because there is no target, evidenced MACF, or indicated debt term. Capital evidence should advance only as `illustrative -> pre_screened -> indicated -> committed -> funded`; the machine value `pre_screened` displays as `Pre-screened`.

The three sections below are independent planning worksheets, not outputs of the current React `CapitalView`. The current view selects a fixture listing, applies its own asking-price plus 12% placeholder uses and fixed branch ratios, and displays the selected branch's illustrative equity check; it does not populate or validate the round-number cases below. These worksheets deliberately keep their illustrative inputs separate from that demo calculation.

All dollar amounts in these worksheets are illustrative USD display dollars. They are not future persisted `*Cents` values; a later persistence adapter must convert units explicitly at a versioned boundary.

Future input-aware worksheets must carry an evidence state for every use and source. An unknown amount must not become zero: totals and funding gap remain unknown, and a case cannot be labeled balanced, until the required target-specific amounts are known. The balanced examples below are illustrative assumptions only.

**Current `maximumEquityCheck` semantics:** `screen-v1.0` treats this as a runtime USD-dollar threshold and display input, not as available buyer cash, a financing commitment, or a recommendation. The current `capital-gap` cap of 59 is applied only when asking price is known and all three internal checks exceed the threshold: `round(askingPrice × 1.12 × 0.25)`, `round(askingPrice × 1.12 × 0.10)`, and `round(askingPrice × 1.12 × 0.05)`. When price is known, `CapitalView` compares only the selected branch's check and displays `Within active screen` or `Above active screen`; it does not block the scenario. A future input-aware worksheet must compare evidenced, target-specific sources against uses and preserve an unknown gap when evidence is missing.

## Scenario 1 — traditional search fund

### What the path is and why parties participate

**Verified fact:** the core model raises capital from a consortium for the search and later acquisition; the searcher intends to operate the acquired business. [S2][S3]

- **Investor incentive:** diversified participation across searchers/deals, negotiated acquisition rights, governance, and potential investment returns; investor risk includes loss of search capital and concentrated, illiquid acquisition equity.
- **Searcher incentive:** funded full-time search, investor advice, and a negotiated path to CEO responsibility and earned equity; cost includes dilution, governance obligations, vesting/performance conditions, and a bounded search window.
- **Unknown terms:** search-capital conversion, investor participation rights, preferred return, board control, searcher compensation, searcher equity and vesting, debt, seller rollover/note, exit provisions, and tax treatment.

### Illustrative capital and runway case

This example deliberately uses round planning numbers. It is not a statement of typical terms.

| Search-period input | Illustrative assumption | Formula contribution |
|---|---:|---:|
| Search duration | 20 months | — |
| All-in monthly personal draw + search overhead | $17,000 | $340,000 |
| Formation/legal/accounting/admin budget | $60,000 | $60,000 |
| Target-specific diligence reserve | $70,000 | $70,000 |
| Contingency | $30,000 | $30,000 |
| **Illustrative search capital** |  | **$500,000** |

`20 × $17,000 + $60,000 + $70,000 + $30,000 = $500,000`.

| Acquisition input | Illustrative assumption |
|---|---:|
| Purchase consideration | $10,000,000 |
| Transaction/financing cost | $600,000 |
| Opening working capital + near-term capex | $500,000 |
| Transition/contingency | $300,000 |
| **Total uses** | **$11,400,000** |
| Senior debt | $4,000,000 |
| Seller note | $500,000 |
| Acquisition equity | $6,900,000 |
| **Total sources** | **$11,400,000** |
| **Funding gap** | **$0** |

`$10.0m + $0.6m + $0.5m + $0.3m = $11.4m = $4.0m + $0.5m + $6.9m`. Every source is **illustrative**, not available, offered, or committed. Searcher cash contribution and earned equity are **unknown**, not zero.

### Unknown personal inputs and dependency gates

| Gate | Miles-owned unknown/decision | Evidence required before advancing |
|---|---|---|
| T1 | Full-time vs. part-time commitment and acceptable search horizon | Written decision and calendar capacity |
| T2 | Personal household runway outside any search salary | Private monthly burn, liquid-runway calculation, and minimum reserve; do not store raw bank/tax data here |
| T3 | Comfort with investor governance, dilution, vesting, and reporting | Explicit preference ranges; later term review by counsel/tax adviser |
| T4 | Investor-network reality and fundraising fit | User-supplied relationship map; no invented warm introductions or commitments |
| T5 | Geography, industry, deal size, and operating-role fit | Approved thesis and documented exclusions |
| T6 | Legal/securities/tax structure | Qualified counsel and tax/accounting advice before any offer or solicitation [S6][S7] |

### Twelve-week pre-launch outputs

| Weeks | Draft-only output |
|---|---|
| 1–2 | Personal decision sheet for T1–T5; runway formula with blank personal cells |
| 3–4 | One-page thesis, exclusion list, and $500,000 illustrative search budget sensitivity at 15/20/24 months |
| 5–6 | Investor-type map, governance questions, and counsel checklist; no offering document or solicitation |
| 7–8 | Rehearsed target screen on public/demo leads; 25 scored companies and logged evidence gaps |
| 9–10 | Mock investment-committee memo and balanced, scenario-only sources/uses |
| 11–12 | Decision log, risk register, and go/pause/stop memo; external outreach remains approval-gated |

### Continue, pause, or stop

- **Continue to an approval-gated fundraising-preparation phase** only if Miles chooses full-time search, confirms adequate private runway/reserve, accepts institutional governance/dilution in principle, and can defend a focused thesis using sourced evidence.
- **Pause** if T1–T5 are unresolved, the personal reserve would be consumed by preparation, or there is no qualified legal route defined before capital communications.
- **Stop this path** if Miles rejects full-time search or investor governance, or if a professional review concludes the proposed raise/structure is impractical.

**Evidence maturity:** high for the existence, mechanics, and historical aggregate results of the core model; low for Miles-specific fundraising probability, terms, target access, and outcomes.

## Scenario 2 — self-funded search with SBA-style acquisition financing

### What the path is and why parties participate

**Verified fact:** SBA 7(a) can support a qualifying ownership change, but a lender—not this model—evaluates the application, borrower, repayment ability, collateral/guarantors, target, and terms. [S4][S5]

- **Buyer/searcher incentive:** retain more control and residual economics than a heavily investor-funded structure may allow; cost is personally funded search time, concentrated capital exposure, possible guarantee/collateral obligations, and post-close operating responsibility.
- **Lender incentive:** contractual principal and interest supported by business cash flow and an SBA guaranty on the eligible portion; the guaranty benefits the lender and is not debt forgiveness for the borrower. [S4][S5]
- **Seller-note incentive:** bridge a financing or valuation gap and preserve seller participation in repayment; it also leaves the seller exposed as a creditor. Availability, amount, standby/subordination, rate, and maturity are all unknown until negotiated and lender-approved.
- **Outside-equity incentive, if used:** negotiated return and governance for supplying the equity gap; any raise triggers securities-law analysis. [S6][S7]

### Illustrative capital and runway case

| Search-period input | Illustrative assumption | Formula contribution |
|---|---:|---:|
| Search duration | 12 months | — |
| Monthly personal burn | $6,000 | $72,000 |
| Monthly search overhead | $2,000 | $24,000 |
| One-time setup/professional budget | $20,000 | $20,000 |
| **Illustrative search runway need** |  | **$116,000** |

`12 × ($6,000 + $2,000) + $20,000 = $116,000`. The $6,000 burn is an **illustrative placeholder**, not Miles's burn.

| Acquisition input | Illustrative assumption |
|---|---:|
| Purchase consideration | $3,000,000 |
| Transaction/financing cost | $180,000 |
| Opening working capital + near-term capex | $150,000 |
| Transition/contingency | $100,000 |
| **Total uses** | **$3,430,000** |
| Senior debt, potentially SBA-supported if eligible | $2,250,000 |
| Seller note | $300,000 |
| Buyer cash and/or outside equity | $880,000 |
| **Total sources** | **$3,430,000** |
| **Funding gap** | **$0** |

`$3.0m + $0.18m + $0.15m + $0.10m = $3.43m = $2.25m + $0.30m + $0.88m`. The senior debt amount is below the current $5 million 7(a) maximum, but that fact alone says nothing about eligibility, approval, required equity, guarantees, collateral, rate, fees, or debt-service capacity. [S4][S5]

### Unknown personal inputs and dependency gates

| Gate | Miles-owned unknown/decision | Evidence required before advancing |
|---|---|---|
| S1 | Actual monthly burn, search duration, minimum emergency reserve, and willingness to self-fund | Private runway model; only derived decision ranges stored here |
| S2 | Available buyer cash, post-close liquidity floor, and concentration limit | User-owned inputs; never infer net worth, accreditation, or liquidity |
| S3 | Tolerance for debt, collateral, guarantees, variable rates, and owner-operator obligations | Written limits plus later lender/counsel review |
| S4 | Credit/eligibility and target eligibility | Target-specific lender pre-screen after Miles approves contact; no current qualification claim [S4][S5] |
| S5 | Target MACF and downside coverage | Reconciled financials, QoE/accounting work, normalized manager cost, capex, working capital, and indicated debt terms |
| S6 | Seller note/equity and outside-equity terms | Signed target documents and professional review; absent until evidenced |

### Twelve-week pre-launch outputs

| Weeks | Draft-only output |
|---|---|
| 1–2 | Private-input runway worksheet and S1–S3 decision card; no raw financial records in the repo |
| 3–4 | Self-funded thesis with price, cash-flow, complexity, and exclusion gates |
| 5–6 | SBA/lender document-readiness checklist mapped to current SBA 7(a) and SOP 50 10 sources [S4][S5] |
| 7–8 | 25 public/demo leads scored; five mock sources/uses cases with missing inputs visibly withheld |
| 9–10 | Target-level MACF/DSCR template, rate sensitivity, and downside case; no eligibility or approval label |
| 11–12 | Go/pause/stop memo and a draft lender-question list; no Lender Match submission or contact without approval |

### Continue, pause, or stop

- **Continue to an approval-gated lender-pre-screen phase** only if Miles confirms S1–S3, protects his chosen post-close liquidity floor, and a target-independent downside model shows the size range can plausibly support debt after a market manager cost and required reinvestment.
- **Pause** until a real target supports MACF and a lender can assess S4; no modeled DSCR substitutes for target financials.
- **Stop this path or reduce target size** if the required buyer equity breaches Miles's self-set concentration/liquidity limit, the personal obligations exceed his risk tolerance, or indicated debt cannot clear the professional/lender-approved coverage threshold under downside assumptions.

**Evidence maturity:** high for current SBA program boundaries; low for self-funded-search aggregate outcomes and zero for Miles's eligibility, approval, personal capacity, target economics, or likely terms.

## Scenario 3 — independent sponsor, deal-by-deal capital

### Why this remains an open alternative

The existing repository already uses an independent-sponsor branch. It is a credible alternative when a sponsor can source and shape a specific deal before assembling acquisition capital, but it demands capital-provider credibility and transaction execution without a committed search fund. Current practitioner evidence is stronger for independent-sponsor deal mechanics than for comparable aggregate performance. [S8][S9]

- **Capital-provider incentive:** diligence a named target and negotiate governance, preferred economics, and downside protections before committing; risk includes concentrated, illiquid exposure and reliance on sponsor execution.
- **Sponsor incentive:** retain deal-level flexibility and earn negotiated closing economics, management economics, and/or carried interest; costs include self-funded search, broken-deal expenses, deal-by-deal fundraising risk, co-invest expectations, and potentially limited control.
- **Management/seller incentive:** partner with a sponsor bringing a specific operating/value-creation plan; risk is closing uncertainty until equity and debt are actually committed.
- **Unknown terms:** all fees, fee rollover, sponsor co-invest, carry/waterfall/hurdles, preferred return, governance, management role, broken-deal cost allocation, debt, seller rollover/note, and tax treatment. McGuireWoods' observed terms are descriptive survey results, not defaults. [S8]

### Illustrative capital and runway case

| Search-period input | Illustrative assumption | Formula contribution |
|---|---:|---:|
| Search duration before a capital decision | 9 months | — |
| Monthly personal burn | $6,000 | $54,000 |
| Monthly search overhead | $3,000 | $27,000 |
| One-time legal/data/setup budget | $30,000 | $30,000 |
| Broken-deal reserve | $50,000 | $50,000 |
| **Illustrative sponsor runway need** |  | **$161,000** |

`9 × ($6,000 + $3,000) + $30,000 + $50,000 = $161,000`.

| Acquisition input | Illustrative assumption |
|---|---:|
| Purchase consideration | $8,000,000 |
| Transaction/financing cost | $480,000 |
| Opening working capital + near-term capex | $400,000 |
| Transition/contingency | $300,000 |
| **Total uses** | **$9,180,000** |
| Senior debt | $3,000,000 |
| Seller note | $500,000 |
| Third-party deal equity | $5,480,000 |
| Sponsor co-invest | $200,000 |
| **Total sources** | **$9,180,000** |
| **Funding gap** | **$0** |

`$8.0m + $0.48m + $0.40m + $0.30m = $9.18m = $3.0m + $0.50m + $5.48m + $0.20m`. The sponsor co-invest is an **illustrative assumption**, not Miles's available capital or an investor expectation.

Economic formulas may be modeled without pretending terms exist:

```text
closing economics = agreed fee base × negotiated fee rate
annual management economics = agreed revenue/EBITDA/cost base × negotiated rate, or fixed amount
carry distribution = distributable profit × negotiated sponsor percentage
```

Every variable remains unknown until documented; legal, tax, licensing, broker-dealer, fiduciary, and securities review precedes any use. [S6][S7][S8]

### Unknown personal inputs and dependency gates

| Gate | Miles-owned unknown/decision | Evidence required before advancing |
|---|---|---|
| I1 | Relevant operating/deal credibility and willingness to lead the company | Evidence-based biography and gap analysis; no inflated experience claims |
| I2 | Runway and broken-deal-loss tolerance | Private input model and stop-loss amount |
| I3 | Sponsor co-invest capacity and acceptable economics/governance | User-defined range; no inferred net worth or accreditation |
| I4 | Capital-provider network and relationship strength | User-supplied relationship map; no assumed commitment |
| I5 | Thesis specificity and proprietary sourcing advantage | Approved thesis, target map, and evidenced outreach plan |
| I6 | Securities/legal/tax/licensing structure | Qualified professional advice before solicitation, fee agreement, LOI economics, or capital raise [S6][S7][S8] |

### Twelve-week pre-launch outputs

| Weeks | Draft-only output |
|---|---|
| 1–2 | I1–I5 decision sheet, gap analysis, and nine-month runway sensitivity |
| 3–4 | Narrow industry thesis, value-creation plan, and 100-account target map built only from public evidence |
| 5–6 | Capital-provider-type map and draft diligence/economics principles; no solicitation or term claims |
| 7–8 | Two mock target dossiers and balanced sources/uses with explicit funding-dependency maps |
| 9–10 | Broken-deal budget, diligence sequencing, and draft governance/carry questions for counsel |
| 11–12 | Credibility review and go/pause/stop memo; external relationship building remains approval-gated |

### Continue, pause, or stop

- **Continue to an approval-gated relationship-validation phase** only if Miles can evidence I1 and I5, fund I2 within his own limits, and identify a plausible—not committed—capital-provider universe without inventing I3 or I4.
- **Pause** before LOI, economics, or capital communications until I6 is professionally reviewed; the SEC treats communications that condition the market as potentially offering activity, and exemption rules differ. [S6][S7]
- **Stop this path or choose another** if the thesis depends on unearned deal credibility, capital is expected to appear only after exclusivity, the broken-deal loss exceeds Miles's limit, or acceptable investor governance/economics cannot coexist with his desired operator role.

**Evidence maturity:** medium for surveyed deal structures and current practitioner process observations; low for first-time-sponsor access, comparable performance, Miles-specific capital formation, and outcomes.

## Bounded comparison and recommendation hypothesis

| Decision factor | Traditional | Self-funded / SBA-style | Independent sponsor |
|---|---|---|---|
| Search-period capital | Outside search capital after a raise | Primarily personal runway | Primarily personal/sponsor runway |
| Acquisition capital | Investor equity plus deal debt/other sources | Buyer cash, debt, and optional seller/outside equity | Deal-by-deal outside equity, sponsor co-invest, debt, seller sources |
| Capital certainty before target | Search budget only; acquisition capital still conditional | None unless independently available/pre-screened | Generally none; capital is target-specific |
| Searcher control/economics | Negotiated and investor-governed | Potentially higher, offset by concentrated personal risk | Highly negotiated with capital provider |
| Best-fit hypothesis | Full-time searcher accepting institutional partnership | Smaller target and buyer comfortable with personal capital/debt risk | Sponsor with strong sector/deal credibility and capital relationships |
| Strongest evidence | Stanford core-model history [S1–S3] | Current SBA rules, not outcomes [S4–S5] | Practitioner survey/process evidence [S8–S9] |

**Recommendation hypothesis — not a decision:** use the **self-funded-size preparation lane** for the first 12 weeks, without applying for financing or declaring Miles eligible. It is the most reversible way to pressure-test a narrow thesis, screening discipline, personal-risk gates, and target-level capital math while preserving the option to pivot to a traditional search raise or independent-sponsor relationship strategy.

This hypothesis advances only if Miles decides all of the following:

1. he prefers the smaller target/operator profile;
2. his private runway and liquidity floor support preparation without financial strain;
3. his debt/guarantee/concentration risk limits are compatible with the path; and
4. later target-specific lender and professional reviews are favorable.

If (1) is false because Miles wants a larger, institutionally supported full-time search and accepts investor governance, test **traditional** next. If sector/deal credibility plus capital relationships are unusually strong and evidenced, test **independent sponsor** next. Until Miles answers these gates, all three paths remain open and none is “selected.”

## What the model can honestly support in a demo or consulting workflow

### Credible now

- A public demo may claim it **calculates and reconciles illustrative sources/uses, exposes funding gaps, withholds DSCR when inputs are missing, and separates sourced facts from assumptions and unknowns**.
- A consulting workflow may use the same schemas to collect client-owned inputs, record evidence states, compare downside sensitivities, and prepare questions for qualified lenders/advisers.
- The three paths can be shown as **decision branches**, not recommendations, approvals, investor interest, financing offers, or acquisition opportunities.

### Validation still required

- Usability tests with the intended users: prospective searchers/operators, search investors or capital providers, acquisition lenders, and transaction counsel/accounting professionals.
- At least three target-shaped cases using permissioned or synthetic data to test whether sources/uses, MACF, DSCR, evidence states, and status transitions survive real missing/conflicting inputs.
- Review of terminology, disclaimers, SBA freshness, securities boundaries, and model outputs by qualified professionals before any paid advisory positioning.
- Evidence that users change a real decision or save measurable time; local tests, polished UI, and source citations do not establish demand or business impact.

### Claims that would overstate the evidence

Do **not** claim: “SBA eligibility engine,” “financing-qualified pipeline,” “capital secured,” “investor-validated,” “deal-ready targets,” “underwriting approval,” “advised/closed acquisitions,” “predicted returns,” “validated market demand,” or “built a compliant fundraising system.” A defensible resume/product claim is narrower: **built a source-linked acquisition-screening prototype with deterministic scoring and scenario-only capital math that preserves unknowns and funding gaps**.

## Source bibliography

All sources accessed 2026-08-04.

- **[S1] Stanford Graduate School of Business, _2026 Search Fund Study: Selected Observations_ (Case E967).** Scope and study description; data through 2025-12-31. https://www.gsb.stanford.edu/faculty-research/case-studies/2026-search-fund-study-selected-observations
- **[S2] Stanford Graduate School of Business, “Search Funds Keep Offering a Proven Path to Ownership,” 2026-07-13.** Official summary of acquisition rate, time, purchase price, IRR, ROI, and PME. https://www.gsb.stanford.edu/insights/search-funds-keep-offering-proven-path-ownership
- **[S3] Stanford Graduate School of Business, _A Primer on Search Funds: A Practical Guide for Entrepreneurs Embarking on a Search Fund_ (Case E958), 2026.** Current core-model structure and stakeholder framing. https://www.gsb.stanford.edu/faculty-research/case-studies/primer-search-funds-practical-guide-entrepreneurs-embarking-search
- **[S4] U.S. Small Business Administration, “7(a) loans.”** Current uses, $5 million maximum, eligibility boundary, lender application, and cash-flow repayment framing. https://www.sba.gov/loans/7a-loans/
- **[S5] U.S. Small Business Administration, “SBA lenders.”** Current 7(a) business-acquisition use, maturity, rate, credit, collateral, and lender process summary; points to SOP 50 10. https://www.sba.gov/sba-lenders/
- **[S6] U.S. Securities and Exchange Commission, “Exempt Offerings,” last reviewed 2026-01-26.** Registration/exemption requirement and high-level Regulation D distinctions. https://www.sec.gov/resources-small-businesses/exempt-offerings
- **[S7] U.S. Securities and Exchange Commission, “General Solicitation,” 2024-06-12.** Communications and Rule 506(b)/506(c) boundary. https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/general-solicitation
- **[S8] McGuireWoods, _2024 Deal Survey of Independent Sponsor-Led Transactions_, 2024.** More than 300 responses for 2021–2023 closed deals; descriptive deal economics, capital-provider, governance, and broken-deal observations with survey limitations. https://media.mcguirewoods.com/publications/flipbooks/is-deal-survey-2024/index.html
- **[S9] McGuireWoods, “Independent Sponsor Capital Raising in 2026: Getting to Yes in a Challenging Market,” 2026-01-29.** Current practitioner observations on selectivity, thesis, transparency, and process preparation. https://www.mcguirewoods.com/client-resources/alerts/2026/1/independent-sponsor-capital-raising-in-2026-getting-to-yes-in-a-challenging-market/
