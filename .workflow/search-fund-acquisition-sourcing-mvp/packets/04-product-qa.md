# Packet 04: Product QA

## Objective

Verify the stabilized product across desktop and mobile with no overlap, broken controls, favorable missing-data states, or unusable workflows.

## Context

Automated smoke checks and a human-style in-app Browser pass validate different failure classes.

## Ownership

QA may report findings and verification evidence. Implementation fixes remain owned by the product-build task; research result files remain untouched.

## Do

- Exercise filtering, memo, comparison, refresh, capital scenarios, and unknown-price behavior.
- Check desktop 1440×1000 and a mobile Chrome device viewport.
- Confirm body width does not exceed the viewport and browser logs have no warnings/errors.
- Re-run the affected journey after each fix.

## Do Not

- Treat a successful build as rendered verification.
- Accept an unknown asking price as a zero-dollar favorable equity gate.

## Expected Output

Playwright pass evidence and visual-inspection findings recorded in `final-report.md`.

## Verification

Four Playwright journeys pass; desktop pipeline/memo and mobile pipeline/capital render without clipping or overlap; missing price shows unavailable; browser logs are empty.
