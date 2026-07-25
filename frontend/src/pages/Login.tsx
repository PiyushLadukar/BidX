import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, ShieldCheck, TrendingDown, Users } from "lucide-react";
import toast from "react-hot-toast";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useAuth } from "../hooks/useAuth";
import type { ApiError } from "../types";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

const benefits = [
  {
    icon: TrendingDown,
    title: "Cut procurement costs",
    description: "Hospitals save an average of 18% through competitive bidding.",
  },
  {
    icon: ShieldCheck,
    title: "AI-verified pricing",
    description: "Every bid is screened for risk before you ever see it.",
  },
  {
    icon: Users,
    title: "3,200+ verified vendors",
    description: "A trusted network ready to compete on your next auction.",
  },
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      const user = await login(values);
      toast.success("Welcome back");
      const from =
        (location.state as { from?: string } | null)?.from ?? "/dashboard";
      navigate(user ? from : "/dashboard", { replace: true });
    } catch (err) {
      const message =
        (err as { response?: { data?: ApiError } })?.response?.data?.detail ??
        "Invalid email or password";
      setServerError(message);
      toast.error(message);
    }
  };

  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-2 font-semibold text-[#111827]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#2563EB] to-[#4F46E5] text-white">
              B
            </span>
            BidX
          </Link>

          <h1 className="text-2xl font-semibold tracking-tight text-[#111827]">
            Log in to your account
          </h1>
          <p className="mt-2 text-sm text-[#6B7280]">
            Enter your credentials to access your dashboard.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-4">
            {serverError && (
              <div className="rounded-xl border border-[#EF4444]/20 bg-[#EF4444]/5 px-4 py-3 text-sm text-[#dc2626]">
                {serverError}
              </div>
            )}

            <Input
              label="Email"
              type="email"
              autoComplete="email"
              icon={<Mail size={16} />}
              placeholder="you@hospital.org"
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              icon={<Lock size={16} />}
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password")}
            />

            <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
              Log in
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-[#6B7280]">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-[#2563EB] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#2563EB] to-[#4F46E5] lg:flex lg:flex-col lg:justify-center lg:px-16">
        <div className="hero-grid absolute inset-0 opacity-10" />
        <div className="relative">
          <h2 className="mb-3 text-3xl font-semibold tracking-tight text-white">
            Procurement, reimagined.
          </h2>
          <p className="mb-10 max-w-sm text-sm text-white/80">
            Join hundreds of hospitals and vendors already running transparent,
            AI-monitored procurement auctions on BidX.
          </p>
          <div className="space-y-5">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-0.5 text-xs text-white/75">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
