import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, PlusCircle, Gavel, ChevronLeft, ChevronRight, ArrowDownUp } from "lucide-react";
import { usePolling } from "../hooks/usePolling";
import { getAuctions } from "../api/auctions";
import { useAuth } from "../hooks/useAuth";
import AuctionCard from "../components/dashboard/AuctionCard";
import EmptyState from "../components/common/EmptyState";
import { CardSkeleton } from "../components/common/Loading";
import Input from "../components/common/Input";
import { cn } from "../utils/helpers";
import type { AuctionStatus } from "../types";

const filters: { label: string; value: AuctionStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Closed", value: "closed" },
  { label: "Pending", value: "pending" },
];

const sortOptions = [
  { label: "Newest first", value: "newest" },
  { label: "Closing soonest", value: "closing" },
  { label: "Lowest bid", value: "lowest" },
] as const;

type SortValue = (typeof sortOptions)[number]["value"];

const PAGE_SIZE = 9;

export default function Auctions() {
  const { user } = useAuth();
  const { data: auctions, isLoading } = usePolling(["auctions"], getAuctions);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<AuctionStatus | "all">("all");
  const [sort, setSort] = useState<SortValue>("newest");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const list = (auctions ?? []).filter((a) => {
      const matchesQuery =
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        (a.description ?? "").toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "all" || a.status === status || (status === "active" && (a.status === "active" || a.status === "open"));
      return matchesQuery && matchesStatus;
    });

    const sorted = [...list].sort((a, b) => {
      if (sort === "newest") {
        return new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime();
      }
      if (sort === "closing") {
        return new Date(a.end_time ?? a.created_at ?? 0).getTime() - new Date(b.end_time ?? b.created_at ?? 0).getTime();
      }
      const aLow = a.current_lowest_bid ?? a.starting_price;
      const bLow = b.current_lowest_bid ?? b.starting_price;
      return aLow - bLow;
    });

    return sorted;
  }, [auctions, query, status, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page_ = Math.min(page, totalPages);
  const paged = filtered.slice((page_ - 1) * PAGE_SIZE, page_ * PAGE_SIZE);

  const updateQuery = (v: string) => {
    setQuery(v);
    setPage(1);
  };
  const updateStatus = (v: AuctionStatus | "all") => {
    setStatus(v);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#111827]">Auctions</h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Browse and track every active and past procurement auction.
          </p>
        </div>
        {user?.role === "hospital" && (
          <Link
            to="/auctions/create"
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-600/20 hover:bg-[#1D4ED8]"
          >
            <PlusCircle size={16} />
            New auction
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="sm:w-80">
            <Input
              placeholder="Search auctions…"
              icon={<Search size={16} />}
              value={query}
              onChange={(e) => updateQuery(e.target.value)}
              aria-label="Search auctions"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => updateStatus(f.value)}
                className={cn(
                  "focus-ring rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors",
                  status === f.value
                    ? "border-[#2563EB] bg-[#EEF4FF] text-[#2563EB]"
                    : "border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-[#F8FAFC]"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ArrowDownUp size={15} className="text-[#9CA3AF]" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortValue)}
            className="focus-ring h-10 rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] shadow-sm"
            aria-label="Sort auctions"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Gavel}
          title="No auctions found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paged.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-5">
              <p className="text-sm text-[#6B7280]">
                Page {page_} of {totalPages} · {filtered.length} auction
                {filtered.length === 1 ? "" : "s"}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={page_ === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] disabled:cursor-not-allowed disabled:opacity-40 hover:enabled:bg-[#F8FAFC]"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  disabled={page_ === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] disabled:cursor-not-allowed disabled:opacity-40 hover:enabled:bg-[#F8FAFC]"
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
