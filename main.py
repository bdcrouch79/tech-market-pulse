import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os

os.makedirs("charts", exist_ok=True)

TICKERS = [
    "AAPL","MSFT","NVDA","AMZN","GOOGL",
    "META","TSLA",
    "QQQ","VGT","SMH","ARKK"
]

START = "2023-01-01"

def load_data():

    print("Downloading market data...\n")

    data = yf.download(TICKERS, start=START)

    prices = data["Close"]

    return prices


def compute_returns(prices):

    returns = prices.pct_change().dropna()

    return returns


def plot_price_trends(prices):

    plt.figure(figsize=(12,6))

    for ticker in prices.columns:
        plt.plot(prices.index, prices[ticker], label=ticker)

    plt.title("Tech + ETF Price Trends")
    plt.xlabel("Date")
    plt.ylabel("Price")
    plt.legend()

    plt.tight_layout()

    path = "charts/price_trends.png"
    plt.savefig(path)

    print(f"Saved: {path}")


def plot_volatility(returns):

    vol = returns.std().sort_values()

    plt.figure(figsize=(10,6))

    sns.barplot(x=vol.values, y=vol.index)

    plt.title("Volatility Comparison")
    plt.xlabel("Std Dev of Returns")
    plt.ylabel("Ticker")

    plt.tight_layout()

    path = "charts/volatility.png"
    plt.savefig(path)

    print(f"Saved: {path}")


def correlation_heatmap(returns):

    corr = returns.corr()

    plt.figure(figsize=(10,8))

    sns.heatmap(corr, cmap="coolwarm", annot=True)

    plt.title("Correlation Matrix")

    plt.tight_layout()

    path = "charts/correlation_heatmap.png"
    plt.savefig(path)

    print(f"Saved: {path}")


def main():

    prices = load_data()

    returns = compute_returns(prices)

    plot_price_trends(prices)

    plot_volatility(returns)

    correlation_heatmap(returns)

    print("\nTop Performers:")

    total_return = (prices.iloc[-1] / prices.iloc[0] - 1).sort_values(ascending=False)

    print(total_return)


if __name__ == "__main__":

    main()
