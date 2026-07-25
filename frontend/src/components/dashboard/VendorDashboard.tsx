import { Link } from "react-router-dom";
import { Gavel, TrendingUp, Wallet, CheckCircle2, ArrowRight } from "lucide-react";
import type { Auction, User } from "../../types";
import StatCard from "./StatCard";
import AuctionCard from "./AuctionCard";
import EmptyState from "../common/EmptyState";
import { CardSkeleton } from "../common/Loading";
import { formatCurrency } from "../../utils/helpers";

interface VendorDashboardProps {
  auctions: Auction[];
  user?: User | null;
  isLoading?: boolean;
}

export default function VendorDashboard({
  auctions,
  user,
  isLoading = false,
}: VendorDashboardProps) {
  const liveAuctions = auctions.filter((auction) => {
    const status = (auction.status ?? "").toLowerCase();
    return status === "active" || status === "open";
  });
  const lowestBidValue = liveAuctions.reduce(
    (lowest, auction) => Math.min(lowest, auction.current_lowest_bid ?? auction.starting_price ?? lowest),
    Number.POSITIVE_INFINITY
  );
  const opportunities = liveAuctions.slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#111827]">
            Welcome back, {user?.full_name?.split(" ")[0] ?? "there"}
          </h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Discover live procurement opportunities and place the next competitive bid.
          </p>
        </div>
        <Link
          to="/auctions"
          className="focus-ring inline-flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-medium text-[#111827] shadow-sm hover:bg-[#F8FAFC]"
        >
          <Gavel size={16} />
          Explore auctions
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => <CardSkeleton key={index} />)
        ) : (
          <>
            <StatCard label="Live opportunities" value={String(liveAuctions.length)} icon={TrendingUp} tone="success" />
            <StatCard label="Best current bid" value={formatCurrency(lowestBidValue)} icon={Wallet} tone="secondary" />
            <StatCard label="Bid readiness" value="High" icon={CheckCircle2} tone="primary" />
          </>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#111827]">Open opportunities</h2>
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
            ) : opportunities.length === 0 ? (
              <EmptyState
                icon={Gavel}
                title="No live auctions"
                description="New procurement opportunities will appear here as soon as they go live."
              />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {opportunities.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-shadow rounded-2xl border border-[#E5E7EB] bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#111827]">How to win</h2>
              <CheckCircle2 size={16} className="text-[#16a34a]" />
            </div>
            <div className="space-y-3 text-sm text-[#6B7280]">
              <p>Review each opportunity carefully and submit a bid below the current lowest amount.</p>
              <p>Watch live pricing shifts and adjust quickly when a new bid appears.</p>
            </div>
          </div>

          <div className="card-shadow rounded-2xl border border-[#E5E7EB] bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#111827]">Bid strategy</h2>
              <CheckCircle2 size={16} className="text-[#16a34a]" />
            </div>
            <div className="space-y-3 text-sm text-[#6B7280]">
              <p>Track the current lowest bid and enter a slightly lower amount to take the lead.</p>
              <p>Open opportunities refresh automatically so you can react as soon as a new round begins.</p>
            </div>
            <Link to="/auctions" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB]">
              Explore opportunities <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
