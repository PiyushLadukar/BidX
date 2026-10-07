import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../utils/helpers";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, className, id, type, ...props }, ref) => {
    const inputId = id ?? props.name;
    // Password fields get a show/hide toggle; each field tracks its own visibility.
    const isPassword = type === "password";
    const [showPassword, setShowPassword] = useState(false);
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
            type={isPassword && showPassword ? "text" : type}
            className={cn(
              "focus-ring h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#111827] placeholder:text-[#9CA3AF] shadow-sm transition-colors focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10",
              icon && "pl-10",
              isPassword && "pr-11",
              error && "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/10",
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              disabled={props.disabled}
              className="focus-ring absolute inset-y-0 right-1.5 my-auto flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7280] transition-colors hover:bg-[#F8FAFC] hover:text-[#111827] disabled:pointer-events-none disabled:opacity-50"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          )}
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
