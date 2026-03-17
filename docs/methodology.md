# Methodology

This project uses a straightforward market analytics workflow built on daily closing price data.

## How Data Is Pulled

Data is downloaded with `yfinance` for a fixed list of technology equities and sector-related ETFs.

The current start date is `2023-01-01`. The script pulls the close-price series for each ticker and aligns them by trading date in a single table.

## How Volatility Is Calculated

Volatility is calculated from daily percentage returns.

For each asset, the script computes:

`daily return = (today close / prior close) - 1`

It then takes the standard deviation of those daily returns. In this project, higher standard deviation means higher realized day-to-day variability over the sampled period.

This is a simple comparative measure, not an options-style or annualized volatility model.

## How Correlation Is Computed

Correlation is also based on daily percentage returns.

Once returns are calculated for every asset, the script uses the standard Pearson correlation coefficient to measure how closely each pair moves together over time.

Values near:

- `1` indicate strong positive co-movement
- `0` indicate weak linear relationship
- `-1` indicate strong inverse movement

## Assumptions

- Closing prices are sufficient for a high-level comparative view.
- Daily returns are an acceptable base frequency for trend, volatility, and correlation analysis.
- The asset list is intentionally fixed rather than dynamically selected.
- Missing values from the first return calculation are dropped.
- The output is descriptive, not predictive.

This methodology is designed for clarity and fast interpretation rather than academic completeness.
