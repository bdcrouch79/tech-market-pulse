export async function GET() {
  return Response.json({ status: "ok", application: "tech-market-pulse", timestamp: new Date().toISOString() });
}
