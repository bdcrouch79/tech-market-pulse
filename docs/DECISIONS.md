# Decisions

## 2026-09-04 — Promote the repository into a public showcase application

**Decision:** retain the existing repository and evolve it rather than creating a replacement repository.

**Why:** the Python analytics prototype already established the project identity and methodology. Preserving repository continuity keeps the analytical origin and the public showcase in one durable history.

## 2026-09-04 — Use the Bryan OS standard web stack

**Decision:** Next.js App Router, TypeScript, React, Tailwind CSS, and DaisyUI.

**Why:** this is now an interactive public application and benefits from the portfolio-standard stack, server-side data acquisition, generated metadata, and a maintainable path to deployment.

## 2026-09-04 — Keep analytics explainable

**Decision:** use direct descriptive market statistics instead of opaque model outputs.

**Why:** the portfolio value comes from demonstrating a clear data pipeline and understandable quantitative reasoning. Visitors should be able to trace every metric back to price data.

## 2026-09-04 — No charting library in the first production slice

**Decision:** render the normalized performance chart with SVG and the correlation matrix with standard React/CSS.

**Why:** the visual requirements are modest and this avoids a large dependency for a few primitives.

## 2026-09-04 — Fail visibly into demo mode when live data is materially unavailable

**Decision:** use a deterministic illustrative dataset only when the external market feed is materially unavailable, and label it explicitly.

**Why:** a public showcase should remain renderable without presenting partial, stale, or fabricated values as current market data.

## 2026-09-04 — No database

**Decision:** no Supabase or other persistence layer for the current scope.

**Why:** all first-slice outputs are derived from external price data at request time. Persistence would add operational complexity without a product requirement.

## 2026-09-04 — Preserve the Python prototype

**Decision:** move the original Python/yfinance implementation under `prototype/` rather than deleting it.

**Why:** it documents the analytical origin of the project and remains useful as a compact reproducible reference implementation.
