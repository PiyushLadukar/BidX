import { usePolling } from "../hooks/usePolling";
import { getAuctions } from "../api/auctions";
import { getAlerts } from "../api/alerts";
import { useAuth } from "../hooks/useAuth";
import TenantDashboard from "../components/dashboard/TenantDashboard";
import VendorDashboard from "../components/dashboard/VendorDashboard";

export default function Dashboard() {
  const { user } = useAuth();
  const isHospital = user?.role === "hospital";
  const { data: auctions, isLoading: auctionsLoading } = usePolling(
    ["auctions"],
    getAuctions
  );
  const { data: alerts, isLoading: alertsLoading } = usePolling(
    ["alerts"],
    getAlerts,
    { enabled: isHospital }
  );

  if (isHospital) {
    return (
      <TenantDashboard
        auctions={auctions ?? []}
        alerts={alerts ?? []}
        user={user}
        isLoading={auctionsLoading || alertsLoading}
      />
    );
  }

  return (
    <VendorDashboard
      auctions={auctions ?? []}
      user={user}
      isLoading={auctionsLoading || alertsLoading}
    />
  );
}
