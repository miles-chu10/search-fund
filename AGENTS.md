# Search Fund Acquisition Workspace

This repository contains a partner-facing acquisition-sourcing prototype.

## Product Contract

- Treat every business listing as an unverified lead, not an investment recommendation.
- Keep sourced facts, model inferences, and unknown fields visually distinct.
- Preserve each listing's canonical source URL and retrieval date.
- Never invent financial fields, seller financing, SBA eligibility, or current availability.
- The credential-free demo dataset must remain usable when live refresh is unavailable.

## Development

- Use TypeScript, 2-space indentation, UTF-8, and LF endings.
- Keep scoring deterministic and covered by tests.
- Prefer small domain modules over broad abstractions.
- Do not commit secrets, `.env` files, raw API responses, or gated seller materials.
- Run lint, typecheck, tests, and production build before completion.

## Git Scope

This is an independent nested repository. Stage only paths inside this directory and do not modify or stage parent-workspace files.
