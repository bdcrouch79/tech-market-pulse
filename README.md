<p align="center">
  <img src="assets/cd-mark.png" width="90">
</p>

# Tech Market Pulse

**A lightweight market analytics engine for understanding behavior across major technology equities and ETFs.**

Tech Market Pulse pulls market data, standardizes daily return series, and produces a compact output set focused on trend, volatility, and cross-asset correlation.

## What This Is

This repository is a focused analytics system designed to turn public market data into a clear comparative view of the technology sector.

It is intentionally narrow in scope: one dataset, one workflow, and a direct output layer.

## Why It Matters

Markets are noisy, and raw price charts rarely tell the full story.

Comparing leading equities, sector ETFs, and higher-beta thematic products in one pass helps surface dispersion, concentration, and changes in risk structure without adding unnecessary complexity.

## Assets Covered

The current universe includes:

- AAPL
- MSFT
- NVDA
- AMZN
- GOOGL
- META
- TSLA
- QQQ
- VGT
- SMH
- ARKK

## Output

The system generates three core visuals:

### Price Trends

![Price Trends](charts/price_trends.png)

### Volatility Comparison

![Volatility](charts/volatility.png)

### Correlation Matrix

![Correlation](charts/correlation_heatmap.png)

## How It Works

1. Pull closing price market data for a fixed list of tech equities and ETFs.
2. Convert prices into daily percentage returns.
3. Measure return dispersion as a simple volatility proxy.
4. Compute pairwise return correlations across the full asset set.
5. Export charts to `charts/` and print total return leaders to the console.

Method notes are available in [docs/methodology.md](/C:/dev/tech-market-pulse/docs/methodology.md).

## Run Locally

```bash
pip install -r requirements.txt
python main.py
```

Generated charts are written to `charts/`.

## Future Direction

Likely extensions include broader asset coverage, rolling-window analytics, benchmark-relative scoring, regime detection, and a more formal reporting layer.

## Philosophy

The goal is to build a clear analytical base layer: direct inputs, readable transformations, and outputs that are immediately useful.

Minimal surface area. Strong signal. No unnecessary ornament.
