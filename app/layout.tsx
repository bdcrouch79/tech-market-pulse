import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pulse.crouchdevelopment.com"),
  title: { default: "Tech Market Pulse | Experimental Lab", template: "%s | Tech Market Pulse" },
  description: "An experimental Crouch Development market-analytics lab exploring leadership, momentum, volatility, drawdown, relative strength, and correlation across major technology assets.",
  openGraph: {
    title: "Tech Market Pulse | Experimental Crouch Development Lab",
    description: "A public market-analytics experiment exploring the structure behind technology-market headlines.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Market Pulse | Experimental Lab",
    description: "Experimental technology-market analytics built by Crouch Development.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="night">
      <body className="min-h-screen bg-base-100 text-base-content antialiased">
        <header className="sticky top-0 z-40 border-b border-base-content/10 bg-base-100/90 backdrop-blur-xl">
          <div className="mx-auto flex min-h-16 max-w-[1500px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-3 font-black tracking-[-0.03em]">
              <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-content">TMP</span>
              <span>Tech Market Pulse</span>
              <span className="badge badge-warning badge-sm font-black uppercase tracking-[0.12em]">Experimental Lab</span>
            </Link>
            <nav className="flex items-center gap-1">
              <Link href="/methodology" className="btn btn-ghost btn-sm rounded-full">Methodology</Link>
              <a href="https://crouchdevelopment.com/products" className="btn btn-primary btn-sm rounded-full" rel="noreferrer">Crouch Development Labs</a>
            </nav>
          </div>
        </header>

        <div className="border-b border-warning/25 bg-warning/10">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-1 px-4 py-3 text-sm sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
            <p className="font-bold text-warning">Experimental software from Crouch Development Labs.</p>
            <p className="text-base-content/60">Built for research, education, and demonstration. Not investment advice, a forecast, or a trading recommendation.</p>
          </div>
        </div>

        {children}

        <footer className="border-t border-base-content/10 py-10">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-4 px-4 text-sm text-base-content/50 sm:px-6 lg:px-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-bold text-base-content/75">Crouch Development Labs · Experimental</p>
              <p className="mt-1 max-w-2xl">Tech Market Pulse is a public analytics experiment built to demonstrate data engineering, quantitative analysis, visualization, and product design.</p>
            </div>
            <p className="max-w-xl md:text-right">Educational analysis only. Not investment advice, personalized financial guidance, a forecasting system, or a trading recommendation.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
