# Tech Market Pulse Agent Contract

Tech Market Pulse is an existing public Crouch Development showcase application.

## Authority

1. This repository is authoritative for product behavior, implementation, architecture, and application-specific decisions.
2. Bryan OS (`bdcrouch79/bdc-os`) is authoritative for portfolio standards, registration, and infrastructure conventions.
3. Verified provider state is authoritative for deployment ownership and production routing.

## Before implementation

Read:

- `docs/PRODUCT.md`
- `docs/ARCHITECTURE.md`
- `docs/CURRENT_STATE.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/DATABASE_TARGET.md`

## Engineering rules

- Continue the existing Next.js + TypeScript architecture.
- Keep analytics explainable and traceable to daily closing-price data.
- Never present fallback/demo data as current market data.
- Do not add trading recommendations, predictions, personalized investment advice, or price targets.
- Preserve the original Python prototype as project history unless an explicit cleanup decision supersedes it.
- Verify infrastructure before changing hosting, domains, deployment ownership, or provider configuration.
- No database is currently required.
- Batch coherent changes and verify typecheck/build before merge when tooling is available.
- Update `docs/CURRENT_STATE.md` and durable decisions before handoff.
