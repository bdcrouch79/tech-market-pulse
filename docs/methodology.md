# Methodology

Tech Market Pulse uses daily closing prices for a fixed technology-market universe and intentionally favors descriptive, explainable statistics.

## Data

The web application requests approximately one year of daily chart data for each tracked symbol from Yahoo Finance's chart endpoint. Requests are made server-side and use a 15-minute Next.js revalidation hint.

If the upstream provider is materially unavailable, the application switches the full dashboard into explicitly labeled deterministic demo mode. Demo-mode values are illustrative and must never be treated as current market data.

## Returns

Periodic return is calculated as:

`return = (latest close / prior close) - 1`

Approximate trading-session windows:

- 1W: 5 sessions
- 1M: 21 sessions
- 3M: 63 sessions
- 6M: 126 sessions
- 1Y: 252 sessions
- YTD: first available session of the current calendar year to latest session

## Annualized realized volatility

Daily log returns are calculated as:

`r_t = ln(close_t / close_(t-1))`

The sample standard deviation of daily log returns is annualized with:

`annualized volatility = stdev(daily log returns) × sqrt(252)`

This is realized historical volatility. It is not implied volatility and it is not a forecast.

## Maximum drawdown

For each session, the current close is compared with the highest close observed up to that point. Maximum drawdown is the most negative peak-to-trough percentage decline in the sampled series.

## Relative strength versus QQQ

For the first dashboard slice, relative strength is the difference between each asset's one-month return and QQQ's one-month return.

Positive values indicate one-month outperformance versus QQQ. Negative values indicate underperformance.

## Correlation

Pairwise Pearson correlation is computed from aligned daily log returns.

- values near 1: strong positive co-movement
- values near 0: weak linear co-movement
- negative values: inverse co-movement

## Market Pulse score

The Market Pulse score is a bounded 0–100 descriptive composite of:

- average one-month return
- percentage of tracked assets with positive one-month returns
- average annualized realized volatility

The score is deliberately simple and interpretable. It is not a trading signal or predictive model.

## Scope

The tracked universe is intentionally fixed: AAPL, MSFT, NVDA, AMZN, GOOGL, META, TSLA, QQQ, VGT, SMH, and ARKK.

The system is designed for fast technology-market orientation and technical showcase value, not academic completeness or personalized investment decision-making.
