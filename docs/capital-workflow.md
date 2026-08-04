# Capital-planning preview

The app provides three **illustrative scenarios**: self-funded / SBA-style, traditional search, and independent sponsor. They are planning branches, not recommendations, lender approval, investor interest, or proof that capital can be raised.

## Shared sequence

1. Build total uses: purchase consideration, assumed/refinanced obligations, transaction and financing costs, initial working capital, near-term capex, transition/replacement-manager cost, and contingency.
2. Enter each source separately with its real terms and evidence state.
3. Show total sources, total uses, and any funding gap; never render an unbalanced case as balanced.
4. Calculate manager-adjusted cash flow and debt-service outputs only when manager cost, maintenance capex, working-capital investment, and actual debt terms are known. Unknown inputs do not become zero.
5. Advance status only with source evidence: `illustrative` → `pre_screened` → `indicated` → `committed` → `funded`.

The demo's percentage allocations and 12% uses placeholders are editable-product examples, not market terms. Its stress toggles are internal cases—not forecasts—and the UI withholds MACF and DSCR because the fixture lacks required inputs.

## Scenario branches

- **Self-funded / SBA-style:** test buyer cash, post-close liquidity, target-specific lender conditions, guarantee/operating obligations, and separate senior debt/seller note/working-capital sources.
- **Traditional search:** separate search-period capital from acquisition-SPV capital, store governance and investor indications as unknown until documented, and keep the screen score separate from a return forecast.
- **Independent sponsor:** separate sponsor co-invest, outside equity, debt, seller paper, fees/carry, and governance; do not treat financing as available before target-specific evidence.

Current program anchors should be refreshed before any real transaction: [SBA 7(a) loans](https://www.sba.gov/funding-programs/loans/7a-loans), [SBA lender program overview](https://www.sba.gov/partners/lenders/become-sba-lender), [SBA Form 148](https://www.sba.gov/document/sba-form-148-unconditional-guarantee), and [SBA SOP 50 10](https://www.sba.gov/document/sop-50-10-lender-development-company-loan-programs). Capital raising may involve securities-law requirements; see the [SEC overview of capital-raising pathways](https://www.sec.gov/resources-small-businesses/smallbiz-essentials-what-pathways-are-available-raise-capital-investors).

Qualified legal, tax, securities, accounting, lending, and investment professionals must determine the real structure and communications. The prototype does not recommend an exemption, solicit investors, generate offering documents, or contact a lender.
