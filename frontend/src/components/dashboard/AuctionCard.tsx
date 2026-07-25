import { Link } from "react-router-dom";
import { Clock, Package, ArrowUpRight } from "lucide-react";
import Badge, { statusTone } from "../common/Badge";
import { formatCurrency, getCountdown } from "../../utils/helpers";
import { AUCTION_STATUS_LABEL } from "../../utils/constants";
import type { Auction } from "../../types";

export default function AuctionCard({ auction }: { auction: Auction }) {
  const countdown = getCountdown(auction.end_time ?? auction.start_time ?? auction.created_at ?? new Date().toISOString());

  return (
    <Link
      to={`/auctions/${auction.id}`}
      className="card-shadow group block rounded-2xl border border-[#E5E7EB] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#c7d5f5] hover:shadow-lg hover:shadow-black/[0.06]"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="line-clamp-1 text-base font-semibold text-[#111827] group-hover:text-[#2563EB]">
          {auction.title}
        </h3>
        <Badge tone={statusTone(auction.status)}>
          {AUCTION_STATUS_LABEL[auction.status] ?? auction.status}
        </Badge>
      </div>

      <p className="mb-4 line-clamp-2 text-sm text-[#6B7280]">
        {auction.description}
      </p>

      <div className="mb-4 flex items-center gap-4 text-xs text-[#6B7280]">
        {auction.category && (
          <span className="inline-flex items-center gap-1.5">
            <Package size={13} />
            {auction.category}
          </span>
        )}
        <span className="inline-flex items-center gap-1.5">
          <Clock size={13} />
          {countdown.label}
        </span>
      </div>

      <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-3.5">
        <div>
          <p className="text-xs text-[#6B7280]">Lowest bid</p>
          <p className="text-sm font-semibold text-[#16a34a]">
            {formatCurrency(auction.current_lowest_bid ?? auction.starting_price)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-xs text-[#6B7280]">
            {auction.bid_count ?? 0} bid{auction.bid_count === 1 ? "" : "s"}
          </p>
          <ArrowUpRight
            size={15}
            className="text-[#9CA3AF] transition-colors group-hover:text-[#2563EB]"
          />
        </div>
      </div>
    </Link>
  );
}
