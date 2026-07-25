import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/helpers";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  children,
  hoverable,
  padding = "md",
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "card-shadow rounded-2xl border border-[#E5E7EB] bg-white transition-all duration-200",
        hoverable && "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.06]",
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
