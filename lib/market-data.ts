export const MARKET_UNIVERSE = [
  { symbol: "AAPL", label: "Apple", group: "Mega Cap" },
  { symbol: "MSFT", label: "Microsoft", group: "Mega Cap" },
  { symbol: "NVDA", label: "NVIDIA", group: "Semiconductors" },
  { symbol: "AMZN", label: "Amazon", group: "Mega Cap" },
  { symbol: "GOOGL", label: "Alphabet", group: "Mega Cap" },
  { symbol: "META", label: "Meta", group: "Mega Cap" },
  { symbol: "TSLA", label: "Tesla", group: "High Beta" },
  { symbol: "QQQ", label: "Nasdaq 100 ETF", group: "Broad Tech" },
  { symbol: "VGT", label: "Vanguard IT ETF", group: "Broad Tech" },
  { symbol: "SMH", label: "Semiconductor ETF", group: "Semiconductors" },
  { symbol: "ARKK", label: "ARK Innovation ETF", group: "Innovation" },
] as const;

export type PeriodKey = "1W" | "1M" | "3M" | "6M" | "1Y" | "YTD";

export type MarketPoint = {
  date: string;
  close: number;
};

export type TickerSnapshot = {
  symbol: string;
  label: string;
  group: string;
  currentPrice: number | null;
  returns: Record<PeriodKey, number | null>;
  volatility: number | null;
  maxDrawdown: number | null;
  relativeToQqq: number | null;
  series: MarketPoint[];
  live: boolean;
};

export type MarketPayload = {
  generatedAt: string;
  live: boolean;
  source: string;
  snapshots: TickerSnapshot[];
  correlations: Record<string, Record<string, number | null>>;
};

type YahooChart = {
  chart?: {
    result?: Array<{
      timestamp?: number[];
      indicators?: { quote?: Array<{ close?: Array<number | null> }> };
    }>;
  };
};

function returnOver(points: MarketPoint[], sessions: number) {
  if (points.length < 2) return null;
  const start = points[Math.max(0, points.length - 1 - sessions)]?.close;
  const end = points.at(-1)?.close;
  if (!start || !end) return null;
  return ((end / start) - 1) * 100;
}

function ytdReturn(points: MarketPoint[]) {
  if (points.length < 2) return null;
  const currentYear = new Date().getUTCFullYear();
  const first = points.find((point) => new Date(point.date).getUTCFullYear() === currentYear) ?? points[0];
  const last = points.at(-1);
  if (!first?.close || !last?.close) return null;
  return ((last.close / first.close) - 1) * 100;
}

function annualizedVolatility(points: MarketPoint[]) {
  if (points.length < 3) return null;
  const returns = points.slice(1).map((point, index) => Math.log(point.close / points[index].close));
  const mean = returns.reduce((sum, value) => sum + value, 0) / returns.length;
  const variance = returns.reduce((sum, value) => sum + ((value - mean) ** 2), 0) / Math.max(1, returns.length - 1);
  return Math.sqrt(variance) * Math.sqrt(252) * 100;
}

function maxDrawdown(points: MarketPoint[]) {
  if (points.length < 2) return null;
  let peak = points[0].close;
  let worst = 0;
  for (const point of points) {
    peak = Math.max(peak, point.close);
    worst = Math.min(worst, ((point.close / peak) - 1) * 100);
  }
  return worst;
}

async function fetchSeries(symbol: string): Promise<MarketPoint[]> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1y&interval=1d&includeAdjustedClose=true`;
  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 TechMarketPulse/1.0" },
    next: { revalidate: 900 },
  });
  if (!response.ok) throw new Error(`Market data request failed for ${symbol}: ${response.status}`);
  const body = await response.json() as YahooChart;
  const result = body.chart?.result?.[0];
  const timestamps = result?.timestamp ?? [];
  const closes = result?.indicators?.quote?.[0]?.close ?? [];
  return timestamps.flatMap((timestamp, index) => {
    const close = closes[index];
    if (typeof close !== "number" || !Number.isFinite(close)) return [];
    return [{ date: new Date(timestamp * 1000).toISOString().slice(0, 10), close }];
  });
}

function seededDemoSeries(symbol: string): MarketPoint[] {
  const seed = symbol.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  let price = 80 + (seed % 140);
  const points: MarketPoint[] = [];
  const today = new Date();
  for (let i = 260; i >= 0; i -= 1) {
    const date = new Date(today);
    date.setUTCDate(today.getUTCDate() - i);
    if ([0, 6].includes(date.getUTCDay())) continue;
    const wave = Math.sin((260 - i + seed) / 17) * 0.008;
    const drift = ((seed % 11) - 4) / 10000;
    price = Math.max(10, price * (1 + drift + wave));
    points.push({ date: date.toISOString().slice(0, 10), close: Number(price.toFixed(2)) });
  }
  return points;
}

function correlation(a: MarketPoint[], b: MarketPoint[]) {
  const bMap = new Map(b.map((point) => [point.date, point.close]));
  const pairs = a.filter((point) => bMap.has(point.date));
  if (pairs.length < 3) return null;
  const aReturns: number[] = [];
  const bReturns: number[] = [];
  for (let i = 1; i < pairs.length; i += 1) {
    const prevA = pairs[i - 1].close;
    const nextA = pairs[i].close;
    const prevB = bMap.get(pairs[i - 1].date);
    const nextB = bMap.get(pairs[i].date);
    if (!prevB || !nextB) continue;
    aReturns.push(Math.log(nextA / prevA));
    bReturns.push(Math.log(nextB / prevB));
  }
  if (aReturns.length < 2) return null;
  const meanA = aReturns.reduce((s, v) => s + v, 0) / aReturns.length;
  const meanB = bReturns.reduce((s, v) => s + v, 0) / bReturns.length;
  let covariance = 0;
  let varianceA = 0;
  let varianceB = 0;
  for (let i = 0; i < aReturns.length; i += 1) {
    const da = aReturns[i] - meanA;
    const db = bReturns[i] - meanB;
    covariance += da * db;
    varianceA += da * da;
    varianceB += db * db;
  }
  if (!varianceA || !varianceB) return null;
  return covariance / Math.sqrt(varianceA * varianceB);
}

export async function getMarketPayload(): Promise<MarketPayload> {
  const results = await Promise.allSettled(MARKET_UNIVERSE.map(async (asset) => ({ asset, series: await fetchSeries(asset.symbol) })));
  const liveCount = results.filter((result) => result.status === "fulfilled" && result.value.series.length > 20).length;
  const useLive = liveCount >= Math.ceil(MARKET_UNIVERSE.length * 0.7);
  const raw = MARKET_UNIVERSE.map((asset, index) => {
    const result = results[index];
    const liveSeries = result?.status === "fulfilled" ? result.value.series : [];
    return { asset, series: useLive && liveSeries.length > 20 ? liveSeries : seededDemoSeries(asset.symbol), live: useLive && liveSeries.length > 20 };
  });
  const qqq = raw.find((item) => item.asset.symbol === "QQQ")?.series ?? [];
  const qqq1m = returnOver(qqq, 21);
  const snapshots: TickerSnapshot[] = raw.map(({ asset, series, live }) => {
    const oneMonth = returnOver(series, 21);
    return {
      symbol: asset.symbol,
      label: asset.label,
      group: asset.group,
      currentPrice: series.at(-1)?.close ?? null,
      returns: {
        "1W": returnOver(series, 5),
        "1M": oneMonth,
        "3M": returnOver(series, 63),
        "6M": returnOver(series, 126),
        "1Y": returnOver(series, 252),
        "YTD": ytdReturn(series),
      },
      volatility: annualizedVolatility(series),
      maxDrawdown: maxDrawdown(series),
      relativeToQqq: oneMonth != null && qqq1m != null ? oneMonth - qqq1m : null,
      series: series.slice(-90),
      live,
    };
  });
  const correlations: MarketPayload["correlations"] = {};
  for (const a of raw) {
    correlations[a.asset.symbol] = {};
    for (const b of raw) correlations[a.asset.symbol][b.asset.symbol] = a.asset.symbol === b.asset.symbol ? 1 : correlation(a.series, b.series);
  }
  return {
    generatedAt: new Date().toISOString(),
    live: useLive,
    source: useLive ? "Yahoo Finance chart data" : "Illustrative demo dataset",
    snapshots,
    correlations,
  };
}
