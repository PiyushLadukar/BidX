import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "../../utils/helpers";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  tone?: "primary" | "secondary" | "success" | "danger" | "warning" | "neutral";
  trend?: { value: string; direction: "up" | "down" };
}

const toneClasses = {
  primary: "bg-[#2563EB]/10 text-[#2563EB]",
  secondary: "bg-[#4F46E5]/10 text-[#4F46E5]",
  success: "bg-[#22C55E]/10 text-[#16a34a]",
  danger: "bg-[#EF4444]/10 text-[#dc2626]",
  warning: "bg-[#F59E0B]/10 text-[#b45309]",
  neutral: "bg-[#6B7280]/10 text-[#4b5563]",
};

export default function StatCard({
  label,
  value,
  icon: Icon,
  tone = "primary",
  trend,
}: StatCardProps) {
  return (
    <div className="card-shadow rounded-2xl border border-[#E5E7EB] bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.06]">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-[#6B7280]">{label}</p>
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", toneClasses[tone])}>
          <Icon size={18} />
        </div>
      </div>
      <p className="mt-4 text-2xl font-semibold tracking-tight text-[#111827]">
        {value}
      </p>
      {trend && (
        <p
          className={cn(
            "mt-1.5 inline-flex items-center gap-1 text-xs font-medium",
            trend.direction === "up" ? "text-[#16a34a]" : "text-[#dc2626]"
          )}
        >
          {trend.direction === "up" ? (
            <ArrowUpRight size={13} />
          ) : (
            <ArrowDownRight size={13} />
          )}
          {trend.value}
        </p>
      )}
    </div>
  );
}
