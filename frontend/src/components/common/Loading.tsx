import { Loader2 } from "lucide-react";
import { cn } from "../../utils/helpers";

export function Spinner({ className }: { className?: string }) {
  return (
    <Loader2
      className={cn("animate-spin text-[#2563EB]", className)}
      size={20}
    />
  );
}

export function PageLoading({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex h-64 w-full flex-col items-center justify-center gap-3 text-[#6B7280]">
      <Spinner className="h-6 w-6" />
      <p className="text-sm">{label}…</p>
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-[#E5E7EB]/70",
        className
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="card-shadow rounded-2xl border border-[#E5E7EB] bg-white p-5">
      <Skeleton className="mb-4 h-4 w-24" />
      <Skeleton className="mb-2 h-7 w-32" />
      <Skeleton className="h-3 w-40" />
    </div>
  );
}
