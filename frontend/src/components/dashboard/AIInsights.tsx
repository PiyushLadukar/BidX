import { Sparkles, TrendingDown, ShieldCheck } from "lucide-react";
import type { Alert } from "../../types";

interface AIInsightsProps {
  alerts?: Alert[];
  bidCount?: number;
  variant?: "dashboard" | "auction";
}

export default function AIInsights({
  alerts,
  bidCount = 0,
  variant = "dashboard",
}: AIInsightsProps) {
  const highRiskCount =
    alerts?.filter((a) => (a.severity ?? "").toLowerCase() === "high" || (a.severity ?? "").toLowerCase() === "critical")
      .length ?? 0;

  if (variant === "auction") {
    return (
      <div className="card-shadow rounded-2xl border border-[#E5E7EB] bg-gradient-to-br from-white to-[#EEF4FF] p-5">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB]/10 text-[#2563EB]">
            <Sparkles size={15} />
          </div>
          <h2 className="text-sm font-semibold text-[#111827]">
            AI recommendation
          </h2>
        </div>
        <p className="text-sm text-[#374151]">
          {bidCount > 1
            ? `${bidCount} vendors are actively competing. Pricing spread looks consistent with market norms for this category.`
            : "Not enough bidding activity yet to generate a recommendation. Check back once more vendors participate."}
        </p>
      </div>
    );
  }

  return (
    <div className="card-shadow rounded-2xl border border-[#E5E7EB] bg-gradient-to-br from-white to-[#EEF4FF] p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB]/10 text-[#2563EB]">
          <Sparkles size={15} />
        </div>
        <h2 className="text-sm font-semibold text-[#111827]">AI recommendation</h2>
      </div>
      <div className="space-y-3">
        <div className="flex items-start gap-2.5">
          <TrendingDown size={15} className="mt-0.5 shrink-0 text-[#16a34a]" />
          <p className="text-sm text-[#374151]">
            Competitive bidding is actively lowering procurement costs across
            your open auctions.
          </p>
        </div>
        <div className="flex items-start gap-2.5">
          <ShieldCheck size={15} className="mt-0.5 shrink-0 text-[#2563EB]" />
          <p className="text-sm text-[#374151]">
            {highRiskCount > 0
              ? `${highRiskCount} high-risk signal${highRiskCount === 1 ? "" : "s"} detected — review your alerts.`
              : "No high-risk pricing signals detected right now."}
          </p>
        </div>
      </div>
    </div>
  );
}
