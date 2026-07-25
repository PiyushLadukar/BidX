import { Link } from "react-router-dom";
import {
  Gavel,
  CheckCircle2,
  TrendingDown,
  ShieldAlert,
  Wallet,
  PlusCircle,
  ListFilter,
  ArrowRight,
} from "lucide-react";
import type { Alert, Auction, User } from "../../types";
import StatCard from "./StatCard";
import AuctionCard from "./AuctionCard";
import AIInsights from "./AIInsights";
import EmptyState from "../common/EmptyState";
import { CardSkeleton } from "../common/Loading";
import Badge, { severityTone } from "../common/Badge";
import { formatCurrency, formatRelativeTime } from "../../utils/helpers";

interface TenantDashboardProps {
  auctions: Auction[];
  alerts?: Alert[];
  user?: User | null;
  isLoading?: boolean;
}

export default function TenantDashboard({
  auctions,
  alerts = [],
  user,
  isLoading = false,
}: TenantDashboardProps) {
  const total = auctions.length;
  const active = auctions.filter((auction) => {
    const status = (auction.status ?? "").toLowerCase();
    return status === "active" || status === "open";
  }).length;
  const closed = auctions.filter((auction) => (auction.status ?? "").toLowerCase() === "closed").length;
  const spend = auctions.reduce(
    (sum, auction) => sum + (auction.current_lowest_bid ?? auction.starting_price ?? 0),
    0
  );
  const openAlerts = alerts.length;
  const recent = [...auctions]
    .sort(
      (a, b) => new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime()
    )
    .slice(0, 4);
  const results = [...auctions]
    .filter((auction) => (auction.status ?? "").toLowerCase() === "closed")
    .sort(
      (a, b) => new Date(b.closed_at ?? b.end_time ?? 0).getTime() - new Date(a.closed_at ?? a.end_time ?? 0).getTime()
    )
    .slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#111827]">
            Welcome back, {user?.full_name?.split(" ")[0] ?? "there"}
          </h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Keep an eye on live demand and review each auction outcome from one place.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/auctions/create"
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-600/20 hover:bg-[#1D4ED8]"
          >
            <PlusCircle size={16} />
            New auction
          </Link>
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
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => <CardSkeleton key={index} />)
        ) : (
          <>
            <StatCard label="Procurement spend" value={formatCurrency(spend)} icon={Wallet} tone="secondary" />
            <StatCard label="Total auctions" value={String(total)} icon={Gavel} tone="primary" />
            <StatCard label="Active auctions" value={String(active)} icon={TrendingDown} tone="success" trend={{ value: "Live now", direction: "up" }} />
            <StatCard label="Closed auctions" value={String(closed)} icon={CheckCircle2} tone="neutral" />
            <StatCard label="AI alerts" value={String(openAlerts)} icon={ShieldAlert} tone="danger" />
            <StatCard label="Results captured" value={String(results.length)} icon={CheckCircle2} tone="primary" />
          </>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#111827]">Recent activity</h2>
              <Link to="/auctions" className="text-sm font-medium text-[#2563EB] hover:underline">
                View all
              </Link>
            </div>
            {isLoading ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <CardSkeleton key={index} />
                ))}
              </div>
            ) : recent.length === 0 ? (
              <EmptyState
                icon={Gavel}
                title="No auctions yet"
                description="Create your first auction to start receiving vendor bids."
                action={
                  <Link
                    to="/auctions/create"
                    className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-600/20 hover:bg-[#1D4ED8]"
                  >
                    <PlusCircle size={16} />
                    Create auction
                  </Link>
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

          <div className="card-shadow rounded-2xl border border-[#E5E7EB] bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#111827]">Latest results</h2>
              <Link to="/auctions" className="text-sm font-medium text-[#2563EB] hover:underline">
                Review all
              </Link>
            </div>
            {results.length === 0 ? (
              <EmptyState icon={CheckCircle2} title="No closed auctions yet" description="Closed auctions will appear here once a result is captured." />
            ) : (
              <div className="space-y-3">
                {results.map((auction) => (
                  <div key={auction.id} className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[#111827]">{auction.title}</p>
                        <p className="mt-1 text-sm text-[#6B7280]">
                          {auction.winning_bid != null ? `Winning bid ${formatCurrency(auction.winning_bid)}` : "Outcome pending until the auction is finalized."}
                        </p>
                      </div>
                      <Badge tone="success">{auction.winning_bid != null ? "Awarded" : "Pending"}</Badge>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm text-[#6B7280]">
                      <span>{auction.winner_vendor_id ? `Vendor ${auction.winner_vendor_id}` : "No winner selected yet"}</span>
                      <Link to={`/auctions/${auction.id}`} className="inline-flex items-center gap-1.5 font-medium text-[#2563EB]">
                        Details <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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
              {isLoading ? (
                Array.from({ length: 2 }).map((_, index) => <CardSkeleton key={index} />)
              ) : alerts.length === 0 ? (
                <EmptyState icon={ShieldAlert} title="No alerts" description="Nothing flagged right now." />
              ) : (
                alerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className="card-shadow rounded-2xl border border-[#E5E7EB] bg-white p-4">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="line-clamp-1 text-sm font-medium text-[#111827]">{alert.title ?? alert.alert_type}</p>
                      <Badge tone={severityTone(alert.severity)}>{alert.severity}</Badge>
                    </div>
                    <p className="mb-2 line-clamp-2 text-xs text-[#6B7280]">{alert.description}</p>
                    <p className="text-[11px] text-[#9CA3AF]">{formatRelativeTime(alert.created_at)}</p>
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
