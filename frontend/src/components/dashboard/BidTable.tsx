import { Trophy } from "lucide-react";
import EmptyState from "../common/EmptyState";
import { formatCurrency, formatDate, initials } from "../../utils/helpers";
import type { Bid } from "../../types";

export default function BidTable({ bids }: { bids: Bid[] }) {
  if (bids.length === 0) {
    return (
      <EmptyState
        title="No bids yet"
        description="Vendor bids will appear here as soon as they're placed."
      />
    );
  }

  const sorted = [...bids].sort((a, b) => a.amount - b.amount);
  const lowestAmount = sorted[0]?.amount;

  return (
    <div className="card-shadow overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA] text-left text-xs font-medium uppercase tracking-wide text-[#6B7280]">
            <th className="px-5 py-3.5">Vendor</th>
            <th className="px-5 py-3.5">Amount</th>
            <th className="px-5 py-3.5">Placed</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((bid) => (
            <tr
              key={bid.id}
              className="border-b border-[#E5E7EB] transition-colors last:border-0 hover:bg-[#F8FAFC]"
            >
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EEF4FF] text-[11px] font-semibold text-[#2563EB]">
                    {initials(bid.vendor_name ?? "V")}
                  </span>
                  <span className="text-[#111827]">
                    {bid.vendor_name ?? "Vendor"}
                  </span>
                </div>
              </td>
              <td className="px-5 py-3.5">
                <span
                  className={
                    bid.amount === lowestAmount
                      ? "inline-flex items-center gap-1.5 font-semibold text-[#16a34a]"
                      : "text-[#111827]"
                  }
                >
                  {bid.amount === lowestAmount && <Trophy size={13} />}
                  {formatCurrency(bid.amount)}
                </span>
              </td>
              <td className="px-5 py-3.5 text-[#6B7280]">
                {formatDate(bid.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
