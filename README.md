<p align="center">
  <img src="assets/cd-mark.png" width="90">
</p>

# Tech Market Pulse

**A lightweight analytics engine for understanding behavior across major technology equities and ETFs.**

---

## What This Is

This project analyzes market data to surface patterns across:

- price movement  
- volatility  
- cross-asset relationships  

It is designed to answer a simple question:

> What is actually happening beneath the surface of the market?

---

## Why It Matters

Markets are noisy.

Raw price charts don’t tell the full story.

Understanding:
- how assets move together  
- how volatility shifts  
- where correlations break  

…creates better decision-making.

---

## Assets Covered

**Equities**

AAPL  
MSFT  
NVDA  
AMZN  
GOOGL  
META  
TSLA  

**ETFs**

QQQ  
VGT  
SMH  
ARKK  

---

## Output

### Price Trends

![Price Trends](charts/price_trends.png)

---

### Volatility Comparison

![Volatility](charts/volatility.png)

---

### Correlation Matrix

![Correlation](charts/correlation_heatmap.png)

---

## How It Works

The pipeline:

1. pulls historical market data  
2. computes key statistical measures  
3. generates visual outputs for comparison  

This is intentionally simple, but structured to expand into:

- signal detection  
- regime analysis  
- portfolio-level insights  

---

## Run Locally

```bash
pip install -r requirements.txt
python main.py
