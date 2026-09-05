import { ImageResponse } from "next/og";

export const alt = "Tech Market Pulse — technology market intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#08111f", color: "white", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, fontWeight: 800 }}>
        <div style={{ width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 18, background: "#7c3aed", fontSize: 22 }}>TMP</div>
        Tech Market Pulse
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: "-4px", fontWeight: 900, maxWidth: 980 }}>See the market structure behind the headlines.</div>
        <div style={{ fontSize: 28, color: "#aab6c8" }}>Leadership · Momentum · Volatility · Drawdown · Correlation</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#7f8ca1", fontSize: 22 }}><span>Technology market intelligence</span><span>Crouch Development</span></div>
    </div>,
    size,
  );
}
