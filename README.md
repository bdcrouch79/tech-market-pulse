# Tech Market Pulse

**A live technology-market intelligence dashboard for seeing leadership, momentum, volatility, drawdown, relative strength, and correlation across major technology equities and ETFs.**

Tech Market Pulse began as a small Python market-analysis experiment. It now serves as a public Crouch Development showcase that turns the same daily price stream into a clear, explainable market-structure dashboard.

## What It Shows

- Market Pulse composite score
- 1W / 1M / 3M / 6M / 1Y / YTD performance
- leadership and laggard ranking
- positive market breadth
- annualized realized volatility
- maximum drawdown
- one-month relative strength versus QQQ
- normalized 90-session performance trends
- pairwise return correlation across the tracked universe

## Market Universe

AAPL, MSFT, NVDA, AMZN, GOOGL, META, TSLA, QQQ, VGT, SMH, and ARKK.

## Architecture

The public application is built with Next.js, React, TypeScript, Tailwind CSS, and DaisyUI. Market data is retrieved server-side from Yahoo Finance's chart endpoint and cached for 15 minutes. If the upstream provider is unavailable, the application enters an explicitly labeled deterministic demo mode rather than presenting stale or fabricated current values.

The original Python/yfinance experiment remains in the repository as the analytical prototype and project history.

## Run Locally

```bash
npm install
npm run dev
```

Verification:

```bash
npm run typecheck
npm run build
```

## Methodology

The public methodology page documents return windows, annualized realized volatility, maximum drawdown, relative strength, correlation, and the Market Pulse composite.

See [`docs/PRODUCT.md`](docs/PRODUCT.md), [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md), and [`docs/CURRENT_STATE.md`](docs/CURRENT_STATE.md) for the durable project record.

## Legacy Prototype

The original March 2026 Python implementation is preserved under `prototype/` for historical context.

## Disclaimer

Tech Market Pulse is an educational analytics showcase. It does not provide investment advice, recommendations, predictions, or price targets.

---

Built by [Crouch Development](https://crouchdevelopment.com).
