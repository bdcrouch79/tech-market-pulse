# Architecture

## Overview

Tech Market Pulse is a server-rendered Next.js application with a small client-side interaction layer.

## Request path

1. `app/page.tsx` requests the current `MarketPayload` from `lib/market-data.ts`.
2. `lib/market-data.ts` fetches one year of daily chart data for the fixed market universe from Yahoo Finance's chart endpoint.
3. The server computes periodic returns, annualized realized volatility, maximum drawdown, one-month relative strength versus QQQ, and pairwise return correlations.
4. The server sends the compact calculated payload to `components/dashboard.tsx`.
5. The client component handles period selection, group filtering, ranking, normalized SVG trends, tables, and correlation rendering.

## Data-provider resilience

The live provider is an external dependency and may rate-limit or reject requests. The application therefore uses a strict safety rule:

- if at least 70% of the universe is available, the dashboard uses live data where present
- if the live feed is materially unavailable, the entire request switches to deterministic demo mode
- demo mode is explicitly labeled in the UI and must never be represented as current market data

This prevents a visually plausible partial or stale market view from being mistaken for live analysis.

## Rendering

The homepage is force-dynamic so production builds do not depend on external market-data availability. Individual upstream fetches use a 15-minute Next.js revalidation hint.

## Styling

- Tailwind CSS 4
- DaisyUI 5
- custom global atmospheric background treatment
- no external charting dependency; normalized lines and correlation cells are rendered directly in React/SVG/CSS

## Database

None. See `docs/DATABASE_TARGET.md`.

## Deployment

The repository includes Bryan OS main-only Vercel Git deployment policy in `vercel.json`, but the exact production project, provider ownership, and domain routing remain unverified until provider setup is completed. Do not infer those values from repository configuration alone.

## Historical prototype

The original Python/yfinance analytics script remains preserved as the project's analytical prototype. It is no longer the primary public application runtime.
