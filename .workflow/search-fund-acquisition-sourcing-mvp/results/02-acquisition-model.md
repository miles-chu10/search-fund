# Acquisition Screening and Capital-Planning Model

**Version:** `screen-v1.0`

**Rules checked:** 2026-08-03

**Purpose:** rank unverified acquisition leads for first-pass diligence by an operator who expects to run the company initially and may later install professional management.

> This model is a prioritization tool, not an investment recommendation or valuation opinion. A high score means “request evidence and investigate sooner,” not “buy.” Every listing remains an unverified lead until its availability, ownership, financials, and transaction terms are independently confirmed.

## 1. Product behavior

### Required thesis inputs

The UI must expose four editable thesis parameters and persist a `thesisVersion` with every score:

1. `targetGeographies: string[]`
2. `includedIndustries: string[]` and `excludedIndustries: string[]`
3. `minimumEarnings: { basis: "SDE" | "EBITDA"; amount: number }`
4. `maximumEquityCheck: number`

Apply thesis logic before ranking:

- A known geography outside the configured target is `out_of_thesis`; an unknown geography is `needs_data`, not an assumed match.
- An explicitly excluded industry is `out_of_thesis`. When an inclusion list is nonempty, a known nonmatch is `out_of_thesis`; an unknown classification is `needs_data`.
- Known earnings below the configured minimum are `out_of_thesis`. Missing earnings remain eligible for enrichment but trigger the critical-data cap below.
- If the self-funded scenario exceeds `maximumEquityCheck`, route the lead to the traditional-search and independent-sponsor branches. If no balanced scenario keeps the buyer/sponsor check within the maximum, label `capital_gap` and apply the cap below.

`out_of_thesis` records stay searchable but do not enter the daily ranked brief. Do not delete them.

### Source, dedupe, and refresh contract

- Use Exa as the primary on-market discovery source and Parallel Search as a validation/enrichment source. A second search engine surfacing the same broker page is **not** independent corroboration.
- Airtable is the source of truth. Use `dealKey = source + ":" + listingId` when a stable listing ID exists; otherwise use `sha256(canonicalUrl)`. Canonicalization may remove tracking parameters but must retain the originally retrieved URL separately.
- Preserve each field-level observation with `sourceUrl`, `publisher`, `retrievedAt`, `sourceLineage`, and raw display text. Never overwrite a conflict; mark the normalized field `conflict` and retain both observations.
- Clay may later add proprietary targets through the same schema with `pipelineType = "proprietary"`. A company discovered by Clay is not presumed willing to sell. Until price and seller intent are known, it receives the normal missing-price treatment and cannot appear as an on-market opportunity.
- The intended 7:30 AM PT weekday run is: search -> fetch -> normalize -> dedupe -> change-detect -> score -> brief. Re-score only when a scored field, a source conflict, `thesisVersion`, `screenVersion`, or capital scenario changes.
- The daily brief ranks only new or materially changed in-thesis leads. Sort by `finalScore DESC`, then `dataConfidencePoints DESC`, then `retrievedAt DESC`. The weekly rollup includes top new/changed leads, score movements, unresolved critical fields, and pipeline-stage counts; suppress unchanged noise.

## 2. Evidence states and UI language

Every displayed value must carry one of these states:

| Badge | Exact UI language | Use |
|---|---|---|
| **Sourced fact** | “Reported by the source; not yet independently verified.” | The value is stated by an identified source. Show publisher, canonical URL, and retrieval date beside it. |
| **Calculated** | “Calculated from reported inputs.” | A deterministic formula uses sourced inputs. Show the formula and input links; do not present the output as seller-reported. |
| **Inference** | “Model inference — validate in diligence.” | A rubric or analyst conclusion interprets facts. Show the rationale, confidence, and supporting inputs. |
| **Unknown** | “Not provided or conflicting; no assumption made.” | The source is silent, stale, inaccessible, or sources conflict. Never fill with a peer median or model guess. |

Availability must always display separately as `verified_current`, `reported_available`, `reported_pending`, `reported_sold`, or `unknown`. A successful fetch proves retrieval, not current availability.

## 3. Calculation conventions

### Normalized management-adjusted cash flow

Use one earnings basis and label it. Do not blend SDE and EBITDA.

```text
If basis = SDE:
  MACF = normalized SDE
         - market replacement-manager cash compensation
         - employer payroll burden and benefits for that manager
         - maintenance capex
         - normalized annual working-capital investment

If basis = EBITDA:
  MACF = normalized EBITDA
         - incremental replacement-management cost not already in EBITDA
         - maintenance capex
         - normalized annual working-capital investment
```

`MACF` is a pre-interest, pre-income-tax planning measure, not GAAP cash flow. Seller add-backs count only when each item has an amount, explanation, source, and buyer judgment. Unsupported add-backs are excluded. If management cost, maintenance capex, or working-capital investment is unknown, `MACF` is unknown; do not substitute zero.

### Core formulas

```text
metricPoints_i = metricWeight_i * factor_i
rawScore       = sum(metricPoints_i)              // retain 2 decimals internally
finalScore     = min(rawScore, every applicable cap)
displayScore   = round(finalScore)                 // half up

effectiveEntryMultiple = enterpriseValue / MACF
DSCR                    = MACF / annualDebtService
stressedDSCR            = stressedMACF / stressedAnnualDebtService
sourceGap                = totalUses - totalSources
equityCheck              = buyerCash or sponsorCoInvest, by scenario
```

For amortizing debt with principal `P`, annual nominal rate `r`, and `n` monthly payments:

```text
monthlyDebtService = P * (r / 12) * (1 + r / 12)^n / ((1 + r / 12)^n - 1)
annualDebtService  = 12 * monthlyDebtService
```

Use the actual rate structure for interest-only, balloon, variable-rate, or seller-note instruments. Do not use the amortizing formula when it does not describe the instrument.

### Missing and conflicting data

- Never reweight a category around missing metrics. Every metric keeps its fixed weight.
- Use the explicit `Missing factor` below. A conflict is missing unless the more conservative value can be proven to govern; retain both source observations either way.
- If a required denominator is `<= 0`, the associated factor is `0.00` and the relevant hard cap applies.
- Thresholds use exact, unrounded inputs. The table’s lower bound is inclusive unless stated otherwise.
- Data-confidence points are additive; they do not replace the conservative missing factors or critical-data caps.

## 4. Transparent 100-point screen

The seven category weights sum to **100**: earnings quality 20 + durable demand 15 + customer concentration 10 + operational complexity 10 + manager readiness 15 + price/financing fit 20 + data confidence 10.

### A. Earnings quality — 20 points

| ID | Metric | Wt. | Factor rubric | Missing factor |
|---|---|---:|---|---:|
| E1 | Earnings-history support | 8 | `1.00`: >=3 fiscal years of authoritative financial support plus current interim/TTM, with material fields reconciled; `0.75`: 2 fiscal years plus current interim; `0.40`: 1 fiscal year or broker package supported by statements; `0.15`: listing-level seller claim only; `0.00`: contradictory or no positive usable earnings figure | `0.00` |
| E2 | Cash conversion | 6 | Define ratio as pre-debt operating cash after maintenance capex and normalized working-capital investment divided by the same normalized earnings basis. `1.00`: >=90%; `0.75`: 70%–<90%; `0.40`: 50%–<70%; `0.00`: <50% or denominator <=0 | `0.25` |
| E3 | Downside stability | 6 | Use the most negative year-over-year change in normalized earnings across the latest 3 comparable fiscal years. `1.00`: >=-5%; `0.75`: <-5% to -15%; `0.40`: <-15% to -30%; `0.00`: <-30% | `0.25` |

### B. Durable or recurring demand — 15 points

| ID | Metric | Wt. | Factor rubric | Missing factor |
|---|---|---:|---|---:|
| D1 | Contracted, recurring, or evidenced repeat-revenue share | 7 | `1.00`: >=75%; `0.75`: 50%–<75%; `0.40`: 25%–<50%; `0.15`: <25%. “Repeat” requires a cohort or customer-level basis, not seller adjectives. | `0.15` |
| D2 | Customer retention or renewal proxy | 5 | Use annual customer/revenue retention or share of current revenue from prior-period customers, consistently defined. `1.00`: >=90%; `0.75`: 80%–<90%; `0.40`: 65%–<80%; `0.00`: <65% | `0.25` |
| D3 | Demand durability rubric | 3 | One point of evidence each for: mission-critical/low-discretion use, diversified end-market exposure, and >=5 years without a >20% revenue decline. `1.00`: 3; `0.75`: 2; `0.40`: 1; `0.00`: 0 or a documented adverse demand break. This field is an **Inference** with rationale. | `0.25` |

### C. Customer concentration — 10 points

| ID | Metric | Wt. | Factor rubric | Missing factor |
|---|---|---:|---|---:|
| C1 | Largest-customer revenue share | 6 | `1.00`: <=10%; `0.75`: >10%–20%; `0.40`: >20%–35%; `0.00`: >35% | `0.00` |
| C2 | Top-five customer revenue share | 4 | `1.00`: <=35%; `0.75`: >35%–50%; `0.40`: >50%–70%; `0.00`: >70% | `0.25` |

### D. Operational complexity — 10 points

| ID | Metric | Wt. | Factor rubric | Missing factor |
|---|---|---:|---|---:|
| O1 | Owner dependence | 5 | `1.00`: <=10 owner hours/week and no unique critical domain; `0.75`: <=25 hours and every critical domain has a documented deputy; `0.40`: <=40 hours or one unduplicated critical domain; `0.00`: >40 hours or >=2 unduplicated critical domains. Critical domains are sales, delivery/production, finance, people, licensure, and key relationships. | `0.25` |
| O2 | Complexity flags | 3 | Count: multi-site; scarce/required licensure; 24/7 or emergency service; union or scarce specialized labor; material/perishable inventory; project-based/custom delivery. `1.00`: 0; `0.75`: 1; `0.40`: 2; `0.00`: >=3. Record flags individually; this is an **Inference**. | `0.25` |
| O3 | Reinvestment burden | 2 | `(maintenance capex + positive normalized annual working-capital investment) / normalized earnings`. `1.00`: <=10%; `0.75`: >10%–20%; `0.40`: >20%–35%; `0.00`: >35% or denominator <=0 | `0.25` |

### E. Manager readiness and transition — 15 points

| ID | Metric | Wt. | Factor rubric | Missing factor |
|---|---|---:|---|---:|
| M1 | Second-layer management | 7 | `1.00`: named GM/function head has run the company >=30 consecutive days owner-absent with evidence; `0.75`: named manager owns daily operations and KPIs/P&L but lacks an absence test; `0.40`: supervisors exist but owner makes cross-functional decisions; `0.00`: no management layer | `0.25` |
| M2 | Process and KPI transferability | 4 | `1.00`: critical processes, KPI definitions, and customer/vendor ownership are current and documented; `0.75`: most critical processes plus weekly KPIs; `0.40`: partial SOPs/basic dashboard; `0.00`: tribal knowledge/no operating documentation | `0.25` |
| M3 | Seller transition | 4 | `1.00`: written >=90-day structured transition plus >=6 months on-call and named stakeholder handoffs; `0.75`: written 60–89 days plus handoffs; `0.40`: 30–59 days/general training; `0.00`: <30 days, none, or seller refuses critical handoffs | `0.25` |

### F. Price and financing fit — 20 points

These thresholds are internal screening policy, not lender standards or statements about market valuation.

| ID | Metric | Wt. | Factor rubric | Missing factor |
|---|---|---:|---|---:|
| P1 | Effective entry multiple on MACF | 6 | `1.00`: <=3.0x; `0.75`: >3.0x–4.0x; `0.40`: >4.0x–5.0x; `0.00`: >5.0x or MACF <=0 | `0.00` |
| P2 | Stressed DSCR | 8 | `1.00`: >=1.75x; `0.75`: 1.50x–<1.75x; `0.40`: 1.25x–<1.50x; `0.00`: <1.25x or stressed debt service <=0/invalid | `0.00` |
| P3 | Balanced sources/uses and post-close liquidity | 3 | `1.00`: source gap <=0 and >=6 months fixed operating expense in unrestricted reserve; `0.75`: balanced and 3–<6 months; `0.40`: balanced and >0–<3 months; `0.00`: positive source gap or no reserve | `0.00` |
| P4 | Financing evidence | 3 | `1.00`: executable financing commitments/credit approval with conditions mapped; `0.75`: written nonbinding debt and equity indications cover uses; `0.40`: preliminary lender/sponsor screen plus evidence of the equity source; `0.15`: internally modeled only; `0.00`: explicit eligibility, investor, or lender blocker | `0.00` |

### G. Data confidence — 10 points

| ID | Metric | Wt. | Factor rubric | Missing factor |
|---|---|---:|---|---:|
| Q1 | Source authority | 4 | `1.00`: authoritative financial and operating documents support material fields; `0.75`: seller/broker data room includes underlying source documents; `0.40`: identified broker/CIM is mostly seller-prepared; `0.15`: aggregator or anonymous listing only; `0.00`: no canonical source | `0.00` |
| Q2 | Retrieval freshness | 2 | Days since latest successful canonical-source retrieval: `1.00`: <=7; `0.75`: 8–30; `0.40`: 31–90; `0.00`: >90. This does not prove availability. | `0.00` |
| Q3 | Reconciliation | 2 | `1.00`: underlying documents plus >=2 independent source lineages agree on material fields; `0.75`: one primary package reconciles internally; `0.40`: same-lineage duplicates agree; `0.00`: unresolved material conflict | `0.25` |
| Q4 | Required-field completeness | 2 | Linear factor `knownRequiredFields / 12`. Count only nonconflicting values for: availability, price/EV, revenue, earnings amount+basis, 3-year history, recurring/repeat share, top customer, top five, owner role/hours, management layer, transition, maintenance capex/working capital. | `0.00` |

## 5. Caps, holds, and ranking bands

Apply all conditions and take the minimum cap. Caps never increase a raw score.

| Condition | Cap | Workflow state |
|---|---:|---|
| No canonical source URL, duplicate without a resolvable parent, or record is not a business/company opportunity | No score (`null`) | `invalid_lead` |
| Credible unresolved allegation/evidence of fraud, illegality, sanctions, or material safety/environmental noncompliance | 20 | `hold_specialist_review` |
| License, permit, contract, or relationship required for a majority of economics is known nontransferable and no qualified replacement path exists | 30 | `hold_transferability` |
| Stressed MACF <=0 or stressed DSCR <1.00x | 35 | `financing_fail` |
| Largest customer >75% | 35 | `concentration_red_flag` |
| Owner uniquely controls >=2 critical domains, no deputies exist, and offered transition is <60 days | 45 | `transition_red_flag` |
| Price/EV or positive normalized earnings basis is unknown | 49 | `needs_critical_data` |
| Largest customer >50%–75% | 50 | `concentration_red_flag` |
| No balanced capital scenario keeps buyer/sponsor equity check <= `maximumEquityCheck` | 59 | `capital_gap` |
| Largest-customer share, owner role/hours, or management-layer status is unknown | 69 | `needs_critical_data` |

Do not infer a compliance red flag from industry stereotypes or scraped allegations. The 20- and 30-point holds require a cited source and human confirmation of the trigger; the system must show who applied the hold and when.

Ranking bands after caps:

| Score | Label | Next action |
|---:|---|---|
| 80–100 | Priority diligence | Request financial package, concentration schedule, owner-role map, and lender/sponsor pre-screen. |
| 65–79 | Advance to screening call | Resolve the top three score-sensitive unknowns before an LOI. |
| 50–64 | Watchlist / enrich | Keep out of partner priority view unless new evidence changes the score. |
| 0–49 | Deprioritize / hold | Do not advance without curing the named cap or thesis mismatch. |

## 6. Capital-planning workflow

### Shared sources-and-uses engine

Build the uses table first:

```text
purchase consideration
+ debt-like items assumed or refinanced
+ transaction/legal/accounting/QoE costs
+ lender and financing costs
+ initial working capital
+ near-term deferred maintenance/capex
+ transition and replacement-manager cost
+ contingency
= total uses
```

Then enter sources by instrument with amount, rate/return assumption, maturity, amortization, security/priority, guarantee, commitment state, expiration, and source document. `totalSources` must equal or exceed `totalUses`; otherwise display the gap, never a balanced-looking pie chart.

The default stress case is an explicitly editable **internal planning case**, not a forecast: revenue -10%, gross margin -3 percentage points, replacement-manager cash cost +15%, and floating interest rate +200 basis points. Show each stress toggle independently so users can avoid double-counting. The base case must not assume exit-multiple expansion.

### Branch A — self-funded / SBA-style acquisition

**Fit:** operator-control transaction where the buyer can fund the entered equity check and accept the documented guarantee/operating obligations.

1. Enter buyer available cash, minimum personal liquidity reserve, ownership %, citizenship/residency facts, and intended operating role.
2. Request at least one lender pre-screen using the actual target, ownership structure, uses, and guarantors. Store lender-entered equity injection, collateral, guarantee, rate, fees, term, amortization, and eligibility conditions; do not hard-code them from the demo.
3. Model senior debt, seller note/standby terms, buyer equity, and working-capital facility separately. Run base and stress DSCR after full replacement-manager cost.
4. Gate on balanced sources/uses, `maximumEquityCheck`, post-close liquidity, and all lender conditions. Mark the branch `illustrative` until written lender evidence exists.

Current program anchors: SBA says 7(a) proceeds may fund complete or partial changes of ownership, the program maximum is $5 million, and borrowers work directly with a lender ([SBA 7(a), updated March 26, 2026](https://www.sba.gov/funding-programs/loans/7a-loans)). SBA’s lender overview lists business acquisition as an eligible use and generally describes 7(a) maturity as 10 years or less unless qualifying real estate/equipment supports longer treatment ([SBA lender program overview](https://www.sba.gov/partners/lenders/become-sba-lender)). Current SBA Form 148 states that individuals owning 20% or more of an applicant must provide an unlimited personal guaranty ([SBA Form 148](https://www.sba.gov/document/sba-form-148-unconditional-guarantee)). These are program anchors, not approval: lenders and the current [SOP 50 10 and active notices](https://www.sba.gov/document/sop-50-10-lender-development-company-loan-programs) control the actual transaction. Re-check at lender pre-screen and before any LOI financing contingency.

### Branch B — traditional search

**Fit:** investor-backed operator who raises search-stage capital and/or acquisition equity under a pre-agreed governance model.

1. Separate search-period budget from acquisition SPV sources and uses. Track investor rights, governance, operator compensation, search-cost conversion, dilution, and follow-on capacity as unknown until documented.
2. Prepare a target-specific investment memo with sourced facts, downside case, management transition, capital gap, and open diligence items. Do not present the 100-point score as a return forecast.
3. Record equity indications investor by investor, with amount, expiry, conditions, concentration, and commitment status. Add acquisition debt only from a target-specific lender screen.
4. Run cap-table, governance, exit, and downside cash-flow scenarios. Calculate investor MOIC and XIRR from dated cash flows, but label every forward value an assumption.

### Branch C — independent sponsor

**Fit:** deal-first sponsor assembling acquisition debt and outside equity for a specific target, potentially with sponsor co-invest, seller paper, or rollover.

1. Establish target control/exclusivity and diligence rights before treating financing as available. Track LOI expiration, financing contingency, broken-deal exposure, and which party bears each cost.
2. Model sponsor co-invest separately from outside equity. Store any fees, carry/promote, governance rights, and conflicts as explicit scenario terms, never inferred defaults.
3. Obtain debt and equity indications for the named target, then run ownership, distribution-waterfall, dilution, and downside cases. Route every public-facing capital communication through counsel.
4. Gate closing readiness on executed commitments, KYC/AML and other required checks, definitive documents, funded sources/uses, and a 100-day owner-to-manager transition plan.

Raising money from investors involves offering securities; the SEC states that an offering must be registered or qualify for an exemption, and different exemptions impose different conditions, including rules around solicitation and investor eligibility ([SEC capital-raising pathways, reviewed July 21, 2025](https://www.sec.gov/resources-small-businesses/smallbiz-essentials-what-pathways-are-available-raise-capital-investors)). The app must not recommend an exemption, solicit investors, or generate offering documents. Require qualified securities counsel for the structure and communications.

### Scenario outputs

Show these outputs for every branch:

- total uses, total sources, and funding gap;
- buyer/sponsor cash check and remaining personal/company liquidity;
- base and stressed MACF, annual debt service, and DSCR;
- debt balance by year and covenant/condition headroom where entered;
- five-year cash-flow table, investor cash flows, MOIC, and XIRR for equity-funded branches;
- assumptions changed since the previous snapshot and which output moved.

No branch is “approved” until the required third-party evidence is attached. Use statuses `illustrative`, `pre_screened`, `indicated`, `committed`, and `funded`; only source documents can advance the last three.

## 7. Deterministic implementation sketch

```ts
const weights = {
  E1: 8, E2: 6, E3: 6,
  D1: 7, D2: 5, D3: 3,
  C1: 6, C2: 4,
  O1: 5, O2: 3, O3: 2,
  M1: 7, M2: 4, M3: 4,
  P1: 6, P2: 8, P3: 3, P4: 3,
  Q1: 4, Q2: 2, Q3: 2, Q4: 2,
} as const;

type MetricId = keyof typeof weights;

function score(
  factors: Record<MetricId, number>,
  caps: number[],
) {
  for (const factor of Object.values(factors)) {
    if (!Number.isFinite(factor) || factor < 0 || factor > 1) {
      throw new Error("Metric factor must be between 0 and 1");
    }
  }

  const rawScore = (Object.keys(weights) as MetricId[]).reduce(
    (sum, id) => sum + weights[id] * factors[id],
    0,
  );
  const finalScore = caps.length ? Math.min(rawScore, ...caps) : rawScore;

  return { rawScore, finalScore, displayScore: Math.floor(finalScore + 0.5) };
}
```

`Q4` may be any continuous factor from `0..1`; the other metrics must resolve to one of their enumerated factors. Enforce those per-metric enums in the input normalizer. Persist the metric factors, points, cap list, formulas, input field IDs, `screenVersion`, `thesisVersion`, and calculation timestamp so a partner can reproduce every score.

## 8. Acceptance and test cases

### Weight and boundary tests

1. `sum(weights) === 100`.
2. P2: `1.75 -> 1.00`, `1.50 -> 0.75`, `1.4999 -> 0.40`, `1.25 -> 0.40`, `1.2499 -> 0.00`.
3. C1: `10% -> 1.00`, `20% -> 0.75`, `35% -> 0.40`, `35.01% -> 0.00`; `null -> 0.00` and critical-data cap 69.
4. Missing E2 always produces `6 * 0.25 = 1.50`; no other earnings metric is reweighted.
5. An unresolved conflict in price produces P1 `0`, Q3 `0`, Q4 excludes price, and the price/earnings cap 49 applies.

### End-to-end fixtures

| Fixture | Selected factors | Expected raw | Caps | Expected display |
|---|---|---:|---|---:|
| A — evidence-backed, manager-ready | E `[.75,1,.75]`; D `[.75,1,.75]`; C `[.75,1]`; O `[.75,.75,.75]`; M `[.75,.75,1]`; P `[.75,.75,1,.75]`; Q `[.75,1,.75,1]` | 81.50 | none | 82 |
| B — fresh listing, mostly unknown | E `[.15,.25,.25]`; D `[.15,.25,.40]`; C `[0,.25]`; O `[.25,.75,.25]`; M `[.25,.25,.40]`; P `[0,0,.40,.15]`; Q `[.40,1,.40,5/12]` | 23.93 | price/earnings 49; concentration/owner/manager 69 | 24 |
| C — otherwise like A, but top customer 60% and top five >70% | A, except C `[0,0]` | 73.00 | concentration 50 | 50 |
| D — otherwise like A, but stressed DSCR 0.95x | A, except P2 `0` | 75.50 | financing fail 35 | 35 |

Additional integration assertions:

- Two engines finding the same canonical URL produce one deal with two discovery observations, not two deals or Q3 independent corroboration.
- A score change caused only by a thesis edit stores both old/new `thesisVersion` and appears as a changed lead.
- A sold/pending status change is surfaced in the daily change brief even if the numerical score is unchanged.
- A proprietary Clay target with no seller intent or price is labeled `proprietary_target`, not `business_for_sale`, and receives the price-missing cap if scored.
- All fixtures render field badges, canonical links, retrieval dates, missing fields, raw score, applied caps, final score, and one recommended data request.

## 9. Caveats and refresh controls

- The rubrics and thresholds are product policy for first-pass triage. They are not claims about industry-standard valuation, lender underwriting, or expected returns.
- SDE/EBITDA normalization, QoE, tax, legal, labor, environmental, licensing, insurance, cybersecurity, and customer-contract diligence require qualified specialists.
- Capital scenarios are planning tools, not legal, lending, tax, securities, accounting, or investment advice. No scenario is a commitment or an assurance that capital can be raised.
- Store `programRulesCheckedAt` and the cited official URL with every SBA-style scenario. After 30 days, show “Program rules need refresh” and require a lender/current-source check before changing the status beyond `illustrative`.
- Never scrape, store, or display gated CIMs, NDA materials, personal financial statements, lender credentials, or investor personal data in the credential-free demo dataset.
