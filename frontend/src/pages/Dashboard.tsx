import { Link } from "react-router-dom";
import {
  Gavel,
  CheckCircle2,
  TrendingDown,
  ShieldAlert,
  Users,
  Wallet,
  PlusCircle,
  ListFilter,
} from "lucide-react";
import { usePolling } from "../hooks/usePolling";
import { getAuctions } from "../api/auctions";
import { getAlerts } from "../api/alerts";
import { useAuth } from "../hooks/useAuth";
import StatCard from "../components/dashboard/StatCard";
import AuctionCard from "../components/dashboard/AuctionCard";
import AIInsights from "../components/dashboard/AIInsights";
import EmptyState from "../components/common/EmptyState";
import { CardSkeleton } from "../components/common/Loading";
import Badge, { severityTone } from "../components/common/Badge";
import { formatCurrency, formatRelativeTime } from "../utils/helpers";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: auctions, isLoading: auctionsLoading } = usePolling(
    ["auctions"],
    getAuctions
  );
  const { data: alerts, isLoading: alertsLoading } = usePolling(
    ["alerts"],
    getAlerts
  );

  const total = auctions?.length ?? 0;
  const active = auctions?.filter((a) => a.status === "open").length ?? 0;
  const closed = auctions?.filter((a) => a.status === "closed").length ?? 0;
  const vendorNames = new Set(
    (auctions ?? []).flatMap((a) => (a.hospital_name ? [a.hospital_name] : []))
  );
  const spend = (auctions ?? []).reduce(
    (sum, a) => sum + (a.lowest_bid ?? a.starting_price ?? 0),
    0
  );
  const openAlerts = alerts?.length ?? 0;

  const recent = [...(auctions ?? [])]
    .sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 4);

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#111827]">
            Welcome back, {user?.name?.split(" ")[0] ?? "there"}
          </h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            {user?.role === "hospital"
              ? "Here's what's happening across your procurement auctions."
              : "Here's where you can find your next winning bid."}
          </p>
        </div>
        <div className="flex gap-2">
          {user?.role === "hospital" && (
            <Link
              to="/auctions/create"
              className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-600/20 hover:bg-[#1D4ED8]"
            >
              <PlusCircle size={16} />
              New auction
            </Link>
          )}
          <Link
            to="/auctions"
            className="focus-ring inline-flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-medium text-[#111827] shadow-sm hover:bg-[#F8FAFC]"
          >
            <ListFilter size={16} />
            Browse auctions
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {auctionsLoading || alertsLoading ? (
          Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
        ) : (
          <>
            <StatCard
              label="Procurement spend"
              value={formatCurrency(spend)}
              icon={Wallet}
              tone="secondary"
            />
            <StatCard label="Total auctions" value={String(total)} icon={Gavel} tone="primary" />
            <StatCard
              label="Active auctions"
              value={String(active)}
              icon={TrendingDown}
              tone="success"
              trend={{ value: "Live now", direction: "up" }}
            />
            <StatCard label="Closed auctions" value={String(closed)} icon={CheckCircle2} tone="neutral" />
            <StatCard
              label="AI alerts"
              value={String(openAlerts)}
              icon={ShieldAlert}
              tone="danger"
            />
            <StatCard
              label="Vendor network"
              value={vendorNames.size > 0 ? String(vendorNames.size) : "3,200+"}
              icon={Users}
              tone="primary"
            />
          </>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#111827]">Recent activity</h2>
            <Link to="/auctions" className="text-sm font-medium text-[#2563EB] hover:underline">
              View all
            </Link>
          </div>
          {auctionsLoading ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : recent.length === 0 ? (
            <EmptyState
              icon={Gavel}
              title="No auctions yet"
              description={
                user?.role === "hospital"
                  ? "Create your first auction to start receiving vendor bids."
                  : "Check back soon — new auctions will appear here."
              }
              action={
                user?.role === "hospital" && (
                  <Link
                    to="/auctions/create"
                    className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-600/20 hover:bg-[#1D4ED8]"
                  >
                    <PlusCircle size={16} />
                    Create auction
                  </Link>
                )
              }
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {recent.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <AIInsights alerts={alerts} />

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#111827]">Latest alerts</h2>
              <Link to="/alerts" className="text-sm font-medium text-[#2563EB] hover:underline">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {alertsLoading ? (
                Array.from({ length: 2 }).map((_, i) => <CardSkeleton key={i} />)
              ) : !alerts || alerts.length === 0 ? (
                <EmptyState icon={ShieldAlert} title="No alerts" description="Nothing flagged right now." />
              ) : (
                alerts.slice(0, 3).map((alert) => (
                  <div
                    key={alert.id}
                    className="card-shadow rounded-2xl border border-[#E5E7EB] bg-white p-4"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="line-clamp-1 text-sm font-medium text-[#111827]">
                        {alert.title}
                      </p>
                      <Badge tone={severityTone(alert.severity)}>{alert.severity}</Badge>
                    </div>
                    <p className="mb-2 line-clamp-2 text-xs text-[#6B7280]">
                      {alert.description}
                    </p>
                    <p className="text-[11px] text-[#9CA3AF]">
                      {formatRelativeTime(alert.created_at)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
