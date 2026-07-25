import { useMemo, useState } from "react";
import { Search, ShieldAlert, AlertTriangle } from "lucide-react";
import { usePolling } from "../hooks/usePolling";
import { getAlerts } from "../api/alerts";
import Input from "../components/common/Input";
import Badge, { severityTone } from "../components/common/Badge";
import EmptyState from "../components/common/EmptyState";
import { CardSkeleton } from "../components/common/Loading";
import { cn } from "../utils/helpers";
import { formatDate } from "../utils/helpers";
import { ALERT_SEVERITY_LABEL } from "../utils/constants";
import type { AlertSeverity } from "../types";

const severities: { label: string; value: AlertSeverity | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Critical", value: "critical" },
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

const severityIconTone: Record<string, string> = {
  critical: "bg-[#EF4444]/10 text-[#dc2626]",
  high: "bg-[#EF4444]/10 text-[#dc2626]",
  medium: "bg-[#F59E0B]/10 text-[#b45309]",
  low: "bg-[#2563EB]/10 text-[#2563EB]",
};

export default function Alerts() {
  const { data: alerts, isLoading } = usePolling(["alerts"], getAlerts);
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState<AlertSeverity | "all">("all");

  const filtered = useMemo(() => {
    return (alerts ?? []).filter((a) => {
      const matchesQuery =
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.description.toLowerCase().includes(query.toLowerCase());
      const matchesSeverity = severity === "all" || a.severity === severity;
      return matchesQuery && matchesSeverity;
    });
  }, [alerts, query, severity]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[#111827]">AI risk alerts</h1>
        <p className="mt-1 text-sm text-[#6B7280]">
          Pricing anomalies and procurement risk signals across your auctions.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="sm:w-80">
          <Input
            placeholder="Search alerts…"
            icon={<Search size={16} />}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search alerts"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {severities.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setSeverity(s.value)}
              className={cn(
                "focus-ring rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors",
                severity === s.value
                  ? "border-[#2563EB] bg-[#EEF4FF] text-[#2563EB]"
                  : "border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-[#F8FAFC]"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={ShieldAlert}
          title="No alerts found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((alert) => (
            <div
              key={alert.id}
              className="card-shadow rounded-2xl border border-[#E5E7EB] bg-white p-5"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-xl",
                      severityIconTone[alert.severity] ?? severityIconTone.low
                    )}
                  >
                    <AlertTriangle size={16} />
                  </div>
                  <h3 className="text-sm font-semibold text-[#111827]">{alert.title}</h3>
                </div>
                <Badge tone={severityTone(alert.severity)}>
                  {ALERT_SEVERITY_LABEL[alert.severity] ?? alert.severity}
                </Badge>
              </div>
              <p className="mb-4 text-sm text-[#6B7280]">{alert.description}</p>
              <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-3.5 text-xs text-[#6B7280]">
                {alert.risk_score !== undefined && (
                  <span className="font-medium text-[#2563EB]">
                    Confidence: {alert.risk_score}%
                  </span>
                )}
                <span>{formatDate(alert.created_at)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
