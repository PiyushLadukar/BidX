import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E5E7EB] bg-[#FAFAFA] px-6 py-16 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#2563EB]">
        <Icon size={22} />
      </div>
      <h3 className="text-base font-semibold text-[#111827]">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-[#6B7280]">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
