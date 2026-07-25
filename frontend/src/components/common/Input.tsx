import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/helpers";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, className, id, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-[#111827]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-[#6B7280]">
              {icon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={cn(
              "focus-ring h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#111827] placeholder:text-[#9CA3AF] shadow-sm transition-colors focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10",
              icon && "pl-10",
              error && "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/10",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-xs text-[#EF4444]">
            {error}
          </p>
        )}
        {!error && hint && (
          <p className="mt-1.5 text-xs text-[#6B7280]">{hint}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
