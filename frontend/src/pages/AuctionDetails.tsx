import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Clock, Lock, PlusCircle, CheckCircle2, Gavel } from "lucide-react";
import toast from "react-hot-toast";
import { usePolling } from "../hooks/usePolling";
import { getAuction, closeAuction } from "../api/auctions";
import { getBids, placeBid } from "../api/bids";
import { useAuth } from "../hooks/useAuth";
import Badge, { statusTone } from "../components/common/Badge";
import BidTable from "../components/dashboard/BidTable";
import AIInsights from "../components/dashboard/AIInsights";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Modal from "../components/common/Modal";
import { PageLoading } from "../components/common/Loading";
import EmptyState from "../components/common/EmptyState";
import { formatCurrency, formatDate, getCountdown } from "../utils/helpers";
import { AUCTION_STATUS_LABEL } from "../utils/constants";
import type { ApiError } from "../types";

const bidSchema = z.object({
  amount: z.coerce.number().positive("Enter a bid amount greater than 0"),
});
type BidFormInput = z.input<typeof bidSchema>;
type BidFormValues = z.output<typeof bidSchema>;

export default function AuctionDetails() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [bidModalOpen, setBidModalOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const {
    data: auction,
    isLoading: auctionLoading,
    error: auctionError,
  } = usePolling(["auction", id], () => getAuction(id as string), {
    enabled: Boolean(id),
  });

  const { data: bids, isLoading: bidsLoading } = usePolling(
    ["bids", id],
    () => getBids(id as string),
    { enabled: Boolean(id) }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BidFormInput, unknown, BidFormValues>({
    resolver: zodResolver(bidSchema),
  });

  if (auctionLoading) return <PageLoading label="Loading auction" />;

  if (auctionError || !auction) {
    return (
      <EmptyState
        title="Auction not found"
        description="This auction may have been removed or the link is incorrect."
        action={
          <Link
            to="/auctions"
            className="focus-ring inline-flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-medium text-[#111827] shadow-sm hover:bg-[#F8FAFC]"
          >
            <ArrowLeft size={16} />
            Back to auctions
          </Link>
        }
      />
    );
  }

  const countdown = getCountdown(auction.end_time ?? auction.start_time ?? auction.created_at ?? new Date().toISOString());
  const isHospital = user?.role === "hospital";
  const isVendor = user?.role === "vendor";
  const status = (auction.status ?? "active").toLowerCase();
  const canBid = isVendor && (status === "active" || status === "open") && !countdown.expired;
  const canClose = isHospital && (status === "active" || status === "open");

  const lowestBid =
    bids && bids.length > 0
      ? Math.min(...bids.map((b) => b.bid_amount))
      : auction.current_lowest_bid ?? null;

  const timeline = [
    {
      icon: PlusCircle,
      label: "Auction created",
      date: auction.created_at,
      done: true,
    },
    {
      icon: Gavel,
      label: `${bids?.length ?? 0} bid${(bids?.length ?? 0) === 1 ? "" : "s"} received`,
      date: bids && bids.length > 0 ? bids[0].created_at : undefined,
      done: (bids?.length ?? 0) > 0,
    },
    {
      icon: auction.status === "closed" ? CheckCircle2 : Clock,
      label: auction.status === "closed" ? "Auction closed" : "Awaiting closure",
      date: status === "closed" ? auction.end_time : undefined,
      done: status === "closed",
    },
  ];

  const onPlaceBid = async (values: BidFormValues) => {
    if (!id) return;
    try {
      await placeBid({ auction_id: Number(id), bid_amount: values.amount });
      toast.success("Bid placed successfully");
      reset();
      setBidModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["bids", id] });
      queryClient.invalidateQueries({ queryKey: ["auction", id] });
    } catch (err) {
      const message =
        (err as { response?: { data?: ApiError } })?.response?.data?.detail ??
        "Could not place your bid";
      toast.error(message);
    }
  };

  const onCloseAuction = async () => {
    if (!id) return;
    setClosing(true);
    try {
      await closeAuction(id);
      toast.success("Auction closed");
      queryClient.invalidateQueries({ queryKey: ["auction", id] });
      queryClient.invalidateQueries({ queryKey: ["auctions"] });
    } catch (err) {
      const message =
        (err as { response?: { data?: ApiError } })?.response?.data?.detail ??
        "Could not close the auction";
      toast.error(message);
    } finally {
      setClosing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Link
        to="/auctions"
        className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] hover:text-[#111827]"
      >
        <ArrowLeft size={15} />
        Back to auctions
      </Link>

      <div className="card-shadow rounded-2xl border border-[#E5E7EB] bg-white p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="mb-2 flex items-center gap-2.5">
              <h1 className="text-xl font-semibold tracking-tight text-[#111827]">
                {auction.title}
              </h1>
              <Badge tone={statusTone(status)}>
                {AUCTION_STATUS_LABEL[status] ?? auction.status}
              </Badge>
            </div>
            <p className="max-w-2xl text-sm text-[#6B7280]">{auction.description}</p>
          </div>
          <div className="flex gap-2">
            {canBid && (
              <Button onClick={() => setBidModalOpen(true)}>Place bid</Button>
            )}
            {canClose && (
              <Button variant="danger" onClick={onCloseAuction} loading={closing}>
                <Lock size={15} />
                Close auction
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-[#E5E7EB] pt-5 sm:grid-cols-4">
          <div>
            <p className="text-xs text-[#6B7280]">Starting price</p>
            <p className="mt-1 text-base font-semibold text-[#111827]">
              {formatCurrency(auction.starting_price)}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#6B7280]">Lowest bid</p>
            <p className="mt-1 text-base font-semibold text-[#16a34a]">
              {formatCurrency(lowestBid)}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#6B7280]">Category</p>
            <p className="mt-1 text-base font-semibold text-[#111827]">
              {auction.category || "—"}
            </p>
          </div>
          <div>
            <p className="mb-1 flex items-center gap-1.5 text-xs text-[#6B7280]">
              <Clock size={12} />
              {status === "active" || status === "open" ? "Closes" : "Closed"}
            </p>
            <p className="text-base font-semibold text-[#111827]">
              {countdown.expired ? formatDate(auction.end_time ?? auction.start_time ?? auction.created_at ?? new Date().toISOString()) : countdown.label}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="mb-3 text-lg font-semibold text-[#111827]">Bid history</h2>
            {bidsLoading ? (
              <PageLoading label="Loading bids" />
            ) : (
              <BidTable bids={bids ?? []} />
            )}
          </div>
        </div>

        <div className="space-y-6">
          <AIInsights variant="auction" bidCount={bids?.length ?? 0} />

          <div className="card-shadow rounded-2xl border border-[#E5E7EB] bg-white p-5">
            <h3 className="mb-4 text-sm font-semibold text-[#111827]">Timeline</h3>
            <div className="space-y-4">
              {timeline.map((step, i) => (
                <div key={step.label} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        step.done
                          ? "bg-[#22C55E]/10 text-[#16a34a]"
                          : "bg-[#F3F4F6] text-[#9CA3AF]"
                      }`}
                    >
                      <step.icon size={14} />
                    </div>
                    {i < timeline.length - 1 && (
                      <div className="mt-1 h-6 w-px bg-[#E5E7EB]" />
                    )}
                  </div>
                  <div className="pt-1">
                    <p className="text-sm font-medium text-[#111827]">{step.label}</p>
                    {step.date && (
                      <p className="text-xs text-[#9CA3AF]">{formatDate(step.date)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={bidModalOpen}
        onClose={() => setBidModalOpen(false)}
        title="Place your bid"
      >
        <form onSubmit={handleSubmit(onPlaceBid)} noValidate className="space-y-4">
          <p className="text-sm text-[#6B7280]">
            Current lowest bid is{" "}
            <span className="font-semibold text-[#16a34a]">
              {formatCurrency(lowestBid)}
            </span>
            . Submit a lower amount to take the lead.
          </p>
          <Input
            label="Your bid amount (INR)"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            error={errors.amount?.message}
            {...register("amount")}
          />
          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={() => setBidModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Submit bid
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
