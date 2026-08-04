# Transparent acquisition screen

`screen-v1.0` prioritizes the next evidence request. It is not a valuation, return forecast, underwriting approval, or investment recommendation.

## Fixed categories

| Category | Weight |
|---|---:|
| Earnings quality | 20 |
| Durable / recurring demand | 15 |
| Customer concentration | 10 |
| Operational complexity | 10 |
| Manager readiness and transition | 15 |
| Price and financing fit | 20 |
| Data confidence | 10 |
| **Total** | **100** |

Public listings receive conservative factors. Listing-level earnings support only the minimum evidence factor; cash conversion, historical stability, manager-adjusted cash flow, DSCR, sources/uses, and independent reconciliation remain unknown until real evidence exists. Missing metrics retain their fixed weight and explicit missing factor; no category is reweighted around a gap.

## Thesis gates

The UI exposes and versions:

- target geography;
- included and excluded industries;
- minimum SDE or EBITDA, with no label conversion;
- maximum equity check.

Known nonmatches become `out_of_thesis`; incomparable or missing earnings become `needs_data`. Leads remain searchable and are never deleted because of a thesis edit.

## Caps

- Missing asking price or usable positive SDE/EBITDA: cap 49.
- Unknown largest customer, owner role/hours, or management-layer status: cap 69.
- All three internal capital shares exceed the active maximum equity check: cap 59.

Caps never increase a raw score. The UI shows raw score, final score, each applied cap, screen version, thesis version, and the supporting explanation.

## Ranking meaning

| Score | Label | Meaning |
|---:|---|---|
| 80–100 | Priority diligence | Request evidence and investigate sooner. |
| 65–79 | Advance to screening | Resolve the most score-sensitive unknowns. |
| 50–64 | Watchlist / enrich | Keep out of the priority brief pending evidence. |
| 0–49 | Deprioritize / hold | Cure the named cap or thesis mismatch before advancing. |

Tests cover weight totals, deterministic output, industry gating, missing concentration, source-label mismatch, and caps.
