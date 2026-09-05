import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Methodology",
  description: "How Tech Market Pulse calculates returns, volatility, drawdown, relative strength, correlation, and the Market Pulse score.",
};

const sections = [
  ["Market universe", "The dashboard tracks AAPL, MSFT, NVDA, AMZN, GOOGL, META, TSLA, QQQ, VGT, SMH, and ARKK. The fixed universe keeps comparisons consistent across mega-cap technology, semiconductors, broad technology ETFs, higher-beta names, and innovation exposure."],
  ["Returns", "Periodic returns compare the latest close with the close approximately 5, 21, 63, 126, or 252 trading sessions earlier. YTD compares the latest close with the first available session of the current calendar year."],
  ["Realized volatility", "Volatility is the sample standard deviation of daily log returns annualized by the square root of 252. It is descriptive realized volatility, not implied volatility and not a forecast."],
  ["Maximum drawdown", "Maximum drawdown measures the worst peak-to-trough percentage decline observed in the sampled price series."],
  ["Relative strength", "The dashboard compares each asset's one-month return with QQQ's one-month return. Positive values indicate recent outperformance versus the Nasdaq-100 ETF benchmark."],
  ["Correlation", "Pairwise Pearson correlation is calculated from aligned daily log returns. Values near 1 indicate strong positive co-movement; values near 0 indicate weak linear co-movement; negative values indicate inverse movement."],
  ["Market Pulse score", "The 0–100 pulse is a compact descriptive composite of one-month momentum, positive breadth, and realized volatility across the tracked universe. It is designed for fast market-structure orientation, not trading signals."],
];

export default function MethodologyPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <Link href="/" className="btn btn-ghost btn-sm rounded-full">← Dashboard</Link>
      <div className="mt-8 rounded-[2rem] border border-base-content/10 bg-base-200/60 p-7 sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Methodology</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.045em] sm:text-6xl">Readable math. Explicit assumptions.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-base-content/65">Tech Market Pulse intentionally favors explainable transformations over black-box scoring. Every headline metric can be traced back to daily closing-price data and a compact set of standard quantitative calculations.</p>
      </div>

      <div className="mt-8 grid gap-4">
        {sections.map(([title, body], index) => (
          <section key={title} className="grid gap-4 rounded-[1.6rem] border border-base-content/10 bg-base-200/40 p-6 md:grid-cols-[90px_1fr] md:p-8">
            <div className="font-mono text-2xl font-black text-primary">0{index + 1}</div>
            <div><h2 className="text-2xl font-black">{title}</h2><p className="mt-3 leading-7 text-base-content/65">{body}</p></div>
          </section>
        ))}
      </div>

      <div className="alert mt-8 border border-warning/30 bg-warning/10 text-warning-content">
        <span><strong>Important:</strong> Tech Market Pulse is an educational analytics showcase. It does not provide investment advice, price targets, recommendations, or predictions.</span>
      </div>
    </main>
  );
}
