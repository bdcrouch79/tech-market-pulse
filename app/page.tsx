import { Dashboard } from "@/components/dashboard";
import { getMarketPayload } from "@/lib/market-data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const payload = await getMarketPayload();
  return <Dashboard payload={payload} />;
}
