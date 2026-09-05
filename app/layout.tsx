import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pulse.crouchdevelopment.com"),
  title: { default: "Tech Market Pulse", template: "%s | Tech Market Pulse" },
  description: "Live technology-market intelligence across leadership, momentum, volatility, drawdown, relative strength, and correlation.",
  openGraph: {
    title: "Tech Market Pulse",
    description: "See the market structure behind the headlines.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Tech Market Pulse", description: "Technology-market intelligence built by Crouch Development." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="night">
      <body className="min-h-screen bg-base-100 text-base-content antialiased">
        <header className="sticky top-0 z-40 border-b border-base-content/10 bg-base-100/85 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-3 font-black tracking-[-0.03em]">
              <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-content">TMP</span>
              <span>Tech Market Pulse</span>
            </Link>
            <nav className="flex items-center gap-1">
              <Link href="/methodology" className="btn btn-ghost btn-sm rounded-full">Methodology</Link>
              <a href="https://crouchdevelopment.com" className="btn btn-primary btn-sm rounded-full" rel="noreferrer">Crouch Development</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="border-t border-base-content/10 py-10">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-4 text-sm text-base-content/50 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
            <span>Built by Crouch Development as a public systems and analytics showcase.</span>
            <span>Educational analysis only. Not investment advice.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
