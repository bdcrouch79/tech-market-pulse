import { ImageResponse } from "next/og";

export const alt = "Tech Market Pulse — technology market intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const bars = [34, 47, 41, 58, 54, 72, 63, 82, 74, 91, 86];

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#07111f",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 82% 22%, rgba(124,58,237,.32), transparent 32%), radial-gradient(circle at 72% 92%, rgba(37,99,235,.22), transparent 32%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.16,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.09) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 70px",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 66,
                height: 66,
                borderRadius: 17,
                background: "linear-gradient(135deg,#7c3aed,#2563eb)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="46" height="46" viewBox="0 0 64 64">
                <path
                  d="M8 36h12l5-13 8 26 7-20 5 7h11"
                  fill="none"
                  stroke="white"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-1px" }}>Tech Market Pulse</div>
              <div style={{ fontSize: 17, color: "#94a3b8" }}>Crouch Development intelligence lab</div>
            </div>
          </div>
          <div
            style={{
              padding: "9px 15px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,.14)",
              color: "#cbd5e1",
              fontSize: 16,
              display: "flex",
            }}
          >
            Market structure, visualized
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 56 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 710 }}>
            <div style={{ fontSize: 72, lineHeight: 0.98, letterSpacing: "-4px", fontWeight: 950 }}>
              See what is leading before the headline catches up.
            </div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 20, color: "#aebbd0" }}>
              <span>Momentum</span><span>•</span><span>Volatility</span><span>•</span><span>Drawdown</span><span>•</span><span>Correlation</span>
            </div>
          </div>

          <div
            style={{
              width: 330,
              height: 230,
              borderRadius: 26,
              border: "1px solid rgba(255,255,255,.12)",
              background: "rgba(15,23,42,.76)",
              padding: 22,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 24px 70px rgba(0,0,0,.28)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#94a3b8", fontSize: 16 }}>Leadership pulse</span>
              <span style={{ color: "#c4b5fd", fontSize: 15 }}>TECH</span>
            </div>
            <div style={{ height: 122, display: "flex", alignItems: "flex-end", gap: 9 }}>
              {bars.map((height, index) => (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    height: `${height}%`,
                    borderRadius: 7,
                    background: index > 7 ? "#8b5cf6" : "#334155",
                    display: "flex",
                  }}
                />
              ))}
            </div>
            <div style={{ fontSize: 16, color: "#64748b" }}>AAPL · MSFT · NVDA · QQQ · SMH + more</div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748b", fontSize: 18 }}>
          <span>pulse.crouchdevelopment.com</span>
          <span>Educational market analytics</span>
        </div>
      </div>
    </div>,
    size,
  );
}
