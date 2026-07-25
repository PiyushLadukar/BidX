import type { ReactNode } from "react";
import { cn } from "../../utils/helpers";

type Tone = "success" | "danger" | "warning" | "primary" | "neutral" | "secondary";

const toneClasses: Record<Tone, string> = {
  success: "bg-[#22C55E]/10 text-[#16a34a] ring-1 ring-inset ring-[#22C55E]/20",
  danger: "bg-[#EF4444]/10 text-[#dc2626] ring-1 ring-inset ring-[#EF4444]/20",
  warning: "bg-[#F59E0B]/10 text-[#b45309] ring-1 ring-inset ring-[#F59E0B]/20",
  primary: "bg-[#2563EB]/10 text-[#2563EB] ring-1 ring-inset ring-[#2563EB]/20",
  secondary: "bg-[#4F46E5]/10 text-[#4F46E5] ring-1 ring-inset ring-[#4F46E5]/20",
  neutral: "bg-[#6B7280]/10 text-[#4b5563] ring-1 ring-inset ring-[#6B7280]/15",
};

export default function Badge({
  tone = "neutral",
  children,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function statusTone(status: string): Tone {
  if (status === "open") return "success";
  if (status === "closed") return "neutral";
  if (status === "pending") return "warning";
  return "neutral";
}

export function severityTone(severity: string): Tone {
  if (severity === "critical" || severity === "high") return "danger";
  if (severity === "medium") return "warning";
  return "primary";
}
