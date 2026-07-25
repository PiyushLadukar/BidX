import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../../utils/helpers";

type Variant = "primary" | "secondary" | "outline" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[#2563EB] text-white shadow-sm shadow-blue-600/20 hover:bg-[#1D4ED8] hover:shadow-md hover:shadow-blue-600/25",
  secondary:
    "bg-[#EEF4FF] text-[#2563EB] hover:bg-[#dfe9ff]",
  outline:
    "bg-white text-[#111827] border border-[#E5E7EB] hover:bg-[#F8FAFC] hover:border-[#d1d5db] shadow-sm",
  danger: "bg-[#EF4444] text-white shadow-sm hover:bg-[#dc2626]",
  ghost: "bg-transparent text-[#6B7280] hover:bg-[#F8FAFC] hover:text-[#111827]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm rounded-lg",
  md: "h-11 px-5 text-sm rounded-xl",
  lg: "h-12 px-6 text-base rounded-xl",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", loading, disabled, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "focus-ring inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
