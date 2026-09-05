"use client";

import { useMemo, useState } from "react";
import type { MarketPayload, PeriodKey, TickerSnapshot } from "@/lib/market-data";

const PERIODS: PeriodKey[] = ["1W", "1M", "3M", "6M", "1Y", "YTD"];

function fmt(value: number | null, suffix = "%") {
  if (value == null || !Number.isFinite(value)) return "—";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}${suffix}`;
}

function tone(value: number | null) {
  if (value == null) return "text-base-content/50";
  if (value > 0.2) return "text-success";
  if (value < -0.2) return "text-error";
  return "text-base-content/70";
}

function normalizedPath(snapshot: TickerSnapshot, width: number, height: number) {
  const values = snapshot.series.map((point) => point.close);
  if (values.length < 2) return "";
  const first = values[0];
  const normalized = values.map((value) => (value / first) * 100);
  const min = Math.min(...normalized);
  const max = Math.max(...normalized);
  const range = Math.max(max - min, 1);
  return normalized.map((value, index) => {
    const x = (index / Math.max(normalized.length - 1, 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}

function pulseScore(snapshots: TickerSnapshot[]) {
  const returns = snapshots.map((item) => item.returns["1M"]).filter((value): value is number => value != null);
  const vols = snapshots.map((item) => item.volatility).filter((value): value is number => value != null);
  if (!returns.length) return 50;
  const average = returns.reduce((sum, value) => sum + value, 0) / returns.length;
  const breadth = (returns.filter((value) => value > 0).length / returns.length) * 100;
  const avgVol = vols.length ? vols.reduce((sum, value) => sum + value, 0) / vols.length : 30;
  return Math.round(Math.max(0, Math.min(100, 50 + average * 2 + (breadth - 50) * 0.35 - Math.max(0, avgVol - 35) * 0.25)));
}

function scoreLabel(score: number) {
  if (score >= 75) return "Risk-on";
  if (score >= 60) return "Constructive";
  if (score >= 45) return "Neutral";
  if (score >= 30) return "Cautious";
  return "Risk-off";
}

export function Dashboard({ payload }: { payload: MarketPayload }) {
  const [period, setPeriod] = useState<PeriodKey>("1M");
  const [group, setGroup] = useState("All");
  const groups = useMemo(() => ["All", ...Array.from(new Set(payload.snapshots.map((item) => item.group)))], [payload.snapshots]);
  const visible = useMemo(() => payload.snapshots.filter((item) => group === "All" || item.group === group), [payload.snapshots, group]);
  const ranked = useMemo(() => [...visible].sort((a, b) => (b.returns[period] ?? -999) - (a.returns[period] ?? -999)), [visible, period]);
  const score = pulseScore(payload.snapshots);
  const leader = ranked[0];
  const laggard = ranked.at(-1);
  const breadth = payload.snapshots.filter((item) => (item.returns["1M"] ?? 0) > 0).length / payload.snapshots.length * 100;
  const avgVol = payload.snapshots.reduce((sum, item) => sum + (item.volatility ?? 0), 0) / Math.max(payload.snapshots.filter((item) => item.volatility != null).length, 1);
  const chartSeries = ranked.slice(0, 5);
  const correlationSymbols = payload.snapshots.map((item) => item.symbol);

  return (
    <main className="mx-auto w-full max-w-[1500px] px-4 pb-20 sm:px-6 lg:px-8">
      <section className="grid gap-5 py-8 lg:grid-cols-[1.5fr_1fr] lg:py-12">
        <div className="rounded-[2rem] border border-base-content/10 bg-base-200/70 p-7 shadow-2xl shadow-black/10 sm:p-10">
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
            <span className={`badge gap-2 border-0 ${payload.live ? "badge-success" : "badge-warning"}`}>
              <span className="size-2 rounded-full bg-current" />
              {payload.live ? "Live market feed" : "Demo mode"}
            </span>
            <span className="text-base-content/50">Updated {new Date(payload.generatedAt).toLocaleString()}</span>
          </div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-primary">Technology market intelligence</p>
          <h1 className="max-w-4xl text-4xl font-black tracking-[-0.045em] sm:text-6xl lg:text-7xl">See the market structure behind the headlines.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-base-content/65 sm:text-xl">Tech Market Pulse turns the same daily price stream into leadership, breadth, volatility, drawdown, relative strength, and correlation signals across the technology complex.</p>
        </div>

        <div className="rounded-[2rem] border border-primary/30 bg-primary p-8 text-primary-content shadow-2xl shadow-primary/15">
          <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-70">Market Pulse</p>
          <div className="mt-6 flex items-end gap-4">
            <span className="text-8xl font-black tracking-[-0.08em]">{score}</span>
            <span className="pb-3 text-2xl font-bold">/100</span>
          </div>
          <div className="mt-4 text-2xl font-bold">{scoreLabel(score)}</div>
          <p className="mt-3 max-w-md text-sm leading-6 opacity-75">Composite of one-month momentum, market breadth, and realized volatility across the tracked universe.</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="1M leader" value={leader?.symbol ?? "—"} detail={fmt(leader?.returns["1M"] ?? null)} />
        <MetricCard label="1M laggard" value={laggard?.symbol ?? "—"} detail={fmt(laggard?.returns["1M"] ?? null)} />
        <MetricCard label="Positive breadth" value={`${breadth.toFixed(0)}%`} detail={`${payload.snapshots.filter((item) => (item.returns["1M"] ?? 0) > 0).length} of ${payload.snapshots.length} assets`} />
        <MetricCard label="Avg annualized vol" value={`${avgVol.toFixed(1)}%`} detail="Realized, daily returns" />
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <div className="rounded-[2rem] border border-base-content/10 bg-base-200/60 p-5 sm:p-7">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-base-content/45">Relative performance</p>
              <h2 className="mt-1 text-2xl font-black">90-session normalized trend</h2>
            </div>
            <span className="badge badge-outline">Top five by {period}</span>
          </div>
          <div className="h-[320px] overflow-hidden rounded-2xl bg-base-300/45 p-5">
            <svg viewBox="0 0 800 260" className="h-full w-full" role="img" aria-label="Normalized performance comparison chart">
              {[0, 1, 2, 3, 4].map((line) => <line key={line} x1="0" x2="800" y1={line * 65} y2={line * 65} className="stroke-base-content/10" />)}
              {chartSeries.map((snapshot, index) => (
                <path key={snapshot.symbol} d={normalizedPath(snapshot, 800, 240)} fill="none" stroke="currentColor" strokeWidth={index === 0 ? 4 : 2.5} className={index === 0 ? "text-primary" : "text-base-content/40"} />
              ))}
            </svg>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {chartSeries.map((item, index) => <span key={item.symbol} className={`badge ${index === 0 ? "badge-primary" : "badge-ghost"}`}>{item.symbol} {fmt(item.returns[period])}</span>)}
          </div>
        </div>

        <div className="rounded-[2rem] border border-base-content/10 bg-base-200/60 p-5 sm:p-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-base-content/45">Leadership board</p>
              <h2 className="mt-1 text-2xl font-black">Who is actually leading?</h2>
            </div>
          </div>
          <div className="mb-5 flex flex-wrap gap-2">
            {PERIODS.map((item) => <button key={item} className={`btn btn-sm rounded-full ${period === item ? "btn-primary" : "btn-ghost"}`} onClick={() => setPeriod(item)}>{item}</button>)}
          </div>
          <div className="max-h-[350px] overflow-auto">
            <table className="table table-sm">
              <thead><tr><th>Asset</th><th>{period}</th><th>Vol</th></tr></thead>
              <tbody>{ranked.map((item) => (
                <tr key={item.symbol}>
                  <td><div className="font-black">{item.symbol}</div><div className="text-xs text-base-content/45">{item.label}</div></td>
                  <td className={`font-mono font-bold ${tone(item.returns[period])}`}>{fmt(item.returns[period])}</td>
                  <td className="font-mono text-base-content/65">{item.volatility == null ? "—" : `${item.volatility.toFixed(1)}%`}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-base-content/10 bg-base-200/60 p-5 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-base-content/45">Full universe</p>
            <h2 className="mt-1 text-3xl font-black">Cross-asset dashboard</h2>
          </div>
          <select value={group} onChange={(event) => setGroup(event.target.value)} className="select select-bordered rounded-full">
            {groups.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="table">
            <thead><tr><th>Asset</th><th>Price</th><th>1W</th><th>1M</th><th>3M</th><th>YTD</th><th>Volatility</th><th>Max DD</th><th>vs QQQ (1M)</th></tr></thead>
            <tbody>{ranked.map((item) => <tr key={item.symbol} className="hover:bg-base-300/40">
              <td><div className="font-black">{item.symbol}</div><div className="text-xs text-base-content/45">{item.group}</div></td>
              <td className="font-mono">{item.currentPrice == null ? "—" : `$${item.currentPrice.toFixed(2)}`}</td>
              {(["1W", "1M", "3M", "YTD"] as PeriodKey[]).map((key) => <td key={key} className={`font-mono font-semibold ${tone(item.returns[key])}`}>{fmt(item.returns[key])}</td>)}
              <td className="font-mono">{item.volatility == null ? "—" : `${item.volatility.toFixed(1)}%`}</td>
              <td className={`font-mono ${tone(item.maxDrawdown)}`}>{fmt(item.maxDrawdown)}</td>
              <td className={`font-mono font-semibold ${tone(item.relativeToQqq)}`}>{fmt(item.relativeToQqq)}</td>
            </tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-base-content/10 bg-base-200/60 p-5 sm:p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-base-content/45">Risk structure</p>
        <h2 className="mt-1 text-3xl font-black">60+ session return correlation</h2>
        <p className="mt-2 max-w-3xl text-base-content/60">Higher values mean assets have been moving together more closely. Lower values indicate more dispersion across the technology complex.</p>
        <div className="mt-6 overflow-x-auto">
          <div className="grid min-w-[920px] gap-1" style={{ gridTemplateColumns: `90px repeat(${correlationSymbols.length}, minmax(62px, 1fr))` }}>
            <div />
            {correlationSymbols.map((symbol) => <div key={symbol} className="px-1 py-2 text-center text-xs font-bold">{symbol}</div>)}
            {correlationSymbols.flatMap((row) => [
              <div key={`${row}-label`} className="flex items-center px-2 text-xs font-bold">{row}</div>,
              ...correlationSymbols.map((column) => {
                const value = payload.correlations[row]?.[column];
                const intensity = value == null ? 0 : Math.max(0, Math.min(1, (value + 1) / 2));
                return <div key={`${row}-${column}`} className="rounded-lg px-1 py-3 text-center font-mono text-xs" style={{ background: `color-mix(in oklab, var(--color-primary) ${Math.round(intensity * 65)}%, var(--color-base-300))` }}>{value == null ? "—" : value.toFixed(2)}</div>;
              }),
            ])}
          </div>
        </div>
      </section>

      {!payload.live && <div className="alert alert-warning mt-8"><span><strong>Demo mode:</strong> the upstream market-data provider was unavailable, so this request is showing a deterministic illustrative dataset. It is not current market data.</span></div>}
    </main>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <div className="rounded-[1.6rem] border border-base-content/10 bg-base-200/60 p-6"><div className="text-xs font-bold uppercase tracking-[0.18em] text-base-content/45">{label}</div><div className="mt-3 text-4xl font-black tracking-[-0.04em]">{value}</div><div className="mt-2 font-mono text-sm text-base-content/55">{detail}</div></div>;
}
