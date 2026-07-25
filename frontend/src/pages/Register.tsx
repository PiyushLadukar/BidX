import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, User, Building2, ShieldCheck, Sparkles, Gavel } from "lucide-react";
import toast from "react-hot-toast";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useAuth } from "../hooks/useAuth";
import { cn } from "../utils/helpers";
import type { ApiError } from "../types";

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  organization: z.string().min(2, "Enter your organization name"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(8, "Use at least 8 characters"),
  role: z.enum(["hospital", "vendor"], { message: "Choose an account type" }),
});

type FormValues = z.infer<typeof schema>;

const roleCards = [
  {
    value: "hospital" as const,
    icon: Building2,
    title: "Hospital",
    description: "Post procurement auctions and award vendors.",
  },
  {
    value: "vendor" as const,
    icon: Gavel,
    title: "Vendor",
    description: "Bid competitively on live procurement auctions.",
  },
];

const benefits = [
  {
    icon: Sparkles,
    title: "AI risk detection",
    description: "Every bid is screened for pricing anomalies automatically.",
  },
  {
    icon: ShieldCheck,
    title: "Verified network only",
    description: "Every vendor is reviewed before they can place a bid.",
  },
];

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { role: "hospital" },
  });

  const role = watch("role");

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      await registerUser(values);
      toast.success("Account created");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const message =
        (err as { response?: { data?: ApiError } })?.response?.data?.detail ??
        "Could not create your account";
      setServerError(message);
      toast.error(message);
    }
  };

  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-14 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 font-semibold text-[#111827]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#2563EB] to-[#4F46E5] text-white">
              B
            </span>
            BidX
          </Link>

          <h1 className="text-2xl font-semibold tracking-tight text-[#111827]">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-[#6B7280]">
            Join as a hospital or a verified vendor.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-7 space-y-4">
            {serverError && (
              <div className="rounded-xl border border-[#EF4444]/20 bg-[#EF4444]/5 px-4 py-3 text-sm text-[#dc2626]">
                {serverError}
              </div>
            )}

            <div>
              <p className="mb-2 text-sm font-medium text-[#111827]">
                I'm signing up as
              </p>
              <div className="grid grid-cols-2 gap-3">
                {roleCards.map(({ value, icon: Icon, title, description }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setValue("role", value)}
                    className={cn(
                      "focus-ring rounded-xl border p-3.5 text-left transition-all",
                      role === value
                        ? "border-[#2563EB] bg-[#EEF4FF] ring-1 ring-[#2563EB]"
                        : "border-[#E5E7EB] hover:bg-[#F8FAFC]"
                    )}
                  >
                    <Icon
                      size={17}
                      className={role === value ? "text-[#2563EB]" : "text-[#6B7280]"}
                    />
                    <p className="mt-2 text-sm font-semibold text-[#111827]">{title}</p>
                    <p className="mt-0.5 text-xs text-[#6B7280]">{description}</p>
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Full name"
              icon={<User size={16} />}
              placeholder="Jordan Lee"
              error={errors.name?.message}
              {...register("name")}
            />

            <Input
              label="Organization"
              icon={<Building2 size={16} />}
              placeholder="St. Mary's Hospital"
              error={errors.organization?.message}
              {...register("organization")}
            />

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
              autoComplete="new-password"
              icon={<Lock size={16} />}
              placeholder="At least 8 characters"
              error={errors.password?.message}
              {...register("password")}
            />

            <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
              Create account
            </Button>
          </form>

          <p className="mt-7 text-center text-sm text-[#6B7280]">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-[#2563EB] hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#2563EB] to-[#4F46E5] lg:flex lg:flex-col lg:justify-center lg:px-16">
        <div className="hero-grid absolute inset-0 opacity-10" />
        <div className="relative">
          <h2 className="mb-3 text-3xl font-semibold tracking-tight text-white">
            Bids But Better.
          </h2>
          <p className="mb-10 max-w-sm text-sm text-white/80">
            Whether you're posting an auction or competing to win one, BidX
            keeps procurement transparent, fast, and AI-verified.
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
