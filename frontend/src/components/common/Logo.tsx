import { ArrowDown } from "lucide-react";

interface LogoProps {
  compact?: boolean;
  className?: string;
}

export default function Logo({ compact = false, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 font-semibold text-[#111827] ${className}`.trim()}>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#2563EB] to-[#4F46E5] text-white shadow-sm">
        <ArrowDown size={17} strokeWidth={2.5} />
      </span>
      {!compact && <span>BidX</span>}
    </div>
  );
}
