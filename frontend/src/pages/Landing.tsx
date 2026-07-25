import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Gavel,
  Users,
  BarChart3,
  ShieldAlert,
  Lock,
  Radar,
  ChevronDown,
  Star,
  Check,
  TrendingDown,
  Building2,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Procurement",
    description:
      "Every auction is continuously scored by AI models trained on real purchasing data.",
  },
  {
    icon: Gavel,
    title: "Reverse Auction Engine",
    description:
      "Vendors compete transparently, driving prices down in real time until the clock runs out.",
  },
  {
    icon: Users,
    title: "Vendor Management",
    description:
      "Verify, onboard, and track supplier performance from a single unified workspace.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Spend, savings, and vendor performance visualized the moment it happens — no refresh needed.",
  },
  {
    icon: Radar,
    title: "Risk Detection",
    description:
      "Anomalous pricing and suspicious bidding patterns are flagged before you commit to a vendor.",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description:
      "Role-based access, audit trails, and encrypted data handling built for regulated healthcare.",
  },
];

const stats = [
  { label: "Procurement spend managed", value: "$482M" },
  { label: "Average cost reduction", value: "18.4%" },
  { label: "Verified vendors", value: "3,200+" },
  { label: "Auctions closed monthly", value: "1,150+" },
];

const workflow = [
  {
    title: "Post the requirement",
    description:
      "Hospitals define the supply, specifications, budget, and closing deadline in minutes.",
    icon: Building2,
  },
  {
    title: "Vendors compete openly",
    description:
      "Verified vendors submit competitive bids, each one pushing the price lower.",
    icon: Gavel,
  },
  {
    title: "AI reviews every bid",
    description:
      "Risk models flag anomalies while analytics surface the strongest offer.",
    icon: Radar,
  },
];

const testimonials = [
  {
    quote:
      "BidX cut our supply procurement cycle from three weeks to four days, and our finance team finally trusts the numbers.",
    name: "Sarah Chen",
    role: "VP Procurement, Riverside Health Network",
  },
  {
    quote:
      "The AI risk alerts caught a pricing anomaly our team would have missed. That single catch paid for the platform.",
    name: "Marcus Devereux",
    role: "Director of Supply Chain, Ashford Medical Group",
  },
  {
    quote:
      "Vendors actually enjoy bidding on BidX. The transparency keeps everyone honest and the process is refreshingly fast.",
    name: "Priya Raman",
    role: "Head of Vendor Relations, Solace Regional Hospitals",
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "$0",
    period: "for verified vendors",
    description: "Everything a vendor needs to compete on active auctions.",
    features: ["Unlimited bids", "Real-time auction alerts", "Bid history & analytics"],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "per organization",
    description: "For hospitals running high-volume procurement programs.",
    features: [
      "Unlimited auctions",
      "AI risk detection suite",
      "Dedicated vendor network",
      "SSO & audit trails",
      "Priority support",
    ],
    cta: "Talk to sales",
    highlighted: true,
  },
  {
    name: "Network",
    price: "Custom",
    period: "for hospital systems",
    description: "Multi-facility procurement with consolidated reporting.",
    features: ["Everything in Enterprise", "Cross-facility analytics", "Volume-based pricing"],
    cta: "Talk to sales",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "How does the reverse auction actually work?",
    a: "A hospital posts a procurement need with a starting price and deadline. Verified vendors then submit bids below the current lowest price. When the auction closes, the hospital reviews the lowest qualifying bid alongside AI risk insights before awarding it.",
  },
  {
    q: "How are vendors verified?",
    a: "Every vendor completes an onboarding review covering licensing, past performance, and compliance documentation before they're permitted to bid on live auctions.",
  },
  {
    q: "What does the AI risk engine actually flag?",
    a: "It monitors bid velocity, pricing deviation from category norms, and vendor history to surface anomalies — like bids that are suspiciously low or patterns consistent with collusion.",
  },
  {
    q: "Can BidX integrate with our existing procurement systems?",
    a: "Yes. BidX exposes a documented API so your ERP or procurement software can sync auctions, vendors, and awarded bids automatically.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E5E7EB] py-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="focus-ring flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="text-base font-medium text-[#111827]">{q}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-[#6B7280] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">{a}</p>}
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-[#111827]">
      <header className="glass sticky top-0 z-40">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#2563EB] to-[#4F46E5] text-white">
              B
            </span>
            BidX
          </div>
          <nav className="hidden items-center gap-8 text-sm font-medium text-[#374151] lg:flex">
            <a href="#features" className="hover:text-[#111827]">Features</a>
            <a href="#workflow" className="hover:text-[#111827]">Solutions</a>
            <a href="#pricing" className="hover:text-[#111827]">Pricing</a>
            <a href="#faq" className="hover:text-[#111827]">Resources</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="focus-ring hidden rounded-xl px-4 py-2 text-sm font-medium text-[#374151] hover:text-[#111827] sm:inline-flex"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="focus-ring inline-flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-600/20 transition-all hover:bg-[#1D4ED8] hover:shadow-md"
            >
              Get started
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </header>

      <section className="hero-grid relative overflow-hidden px-6 pb-28 pt-20 sm:pt-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-xs font-medium text-[#374151] shadow-sm"
            >
              <Sparkles size={13} className="text-[#2563EB]" />
              AI-powered reverse procurement
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-5xl font-semibold tracking-tight text-[#111827] sm:text-6xl"
            >
              Bids But Better.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 max-w-lg text-lg leading-relaxed text-[#6B7280]"
            >
              BidX turns hospital procurement into a transparent, real-time
              market. Vendors compete on price, AI watches every bid for
              risk, and your team awards with confidence.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/register"
                className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/25 transition-all hover:bg-[#1D4ED8] hover:shadow-md"
              >
                Start procuring smarter
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/login"
                className="focus-ring inline-flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-6 py-3.5 text-sm font-semibold text-[#111827] shadow-sm hover:bg-[#F8FAFC]"
              >
                View live dashboard
              </Link>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-8 text-xs font-medium uppercase tracking-wide text-[#9CA3AF]"
            >
              Trusted by procurement teams at hospital networks nationwide
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="card-shadow rounded-3xl border border-[#E5E7EB] bg-white p-6">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-semibold text-[#111827]">
                  Surgical gloves — bulk order
                </p>
                <span className="rounded-full bg-[#22C55E]/10 px-2.5 py-1 text-xs font-medium text-[#16a34a]">
                  Active
                </span>
              </div>
              <div className="mb-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#FAFAFA] p-3.5">
                  <p className="text-xs text-[#6B7280]">Lowest bid</p>
                  <p className="mt-1 text-lg font-semibold text-[#16a34a]">$4,120</p>
                </div>
                <div className="rounded-xl bg-[#FAFAFA] p-3.5">
                  <p className="text-xs text-[#6B7280]">Closes in</p>
                  <p className="mt-1 text-lg font-semibold text-[#111827]">02:14:09</p>
                </div>
              </div>
              <div className="space-y-2.5">
                {[
                  { name: "MedSupply Co.", amount: "$4,120" },
                  { name: "Vantage Health", amount: "$4,340" },
                  { name: "CorePharm Ltd.", amount: "$4,590" },
                ].map((bid) => (
                  <div
                    key={bid.name}
                    className="flex items-center justify-between rounded-xl border border-[#E5E7EB] px-3.5 py-2.5 text-sm"
                  >
                    <span className="text-[#374151]">{bid.name}</span>
                    <span className="font-medium text-[#111827]">{bid.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card-shadow absolute -left-8 -top-6 hidden w-44 rounded-2xl border border-[#E5E7EB] bg-white/95 p-4 backdrop-blur sm:block"
            >
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#22C55E]/10 text-[#16a34a]">
                <TrendingDown size={15} />
              </div>
              <p className="text-xs text-[#6B7280]">Cost saved this month</p>
              <p className="text-lg font-semibold text-[#111827]">$1.2M</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="card-shadow absolute -bottom-6 -right-6 hidden w-44 rounded-2xl border border-[#E5E7EB] bg-white/95 p-4 backdrop-blur sm:block"
            >
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB]/10 text-[#2563EB]">
                <ShieldAlert size={15} />
              </div>
              <p className="text-xs text-[#6B7280]">Risk signals this week</p>
              <p className="text-lg font-semibold text-[#111827]">3 flagged</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-[#E5E7EB] bg-[#FAFAFA] px-6 py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center lg:text-left">
              <p className="text-3xl font-semibold tracking-tight text-[#111827]">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-[#6B7280]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
            Platform
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
            Everything procurement teams need, built in
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="card-shadow rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.06]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#2563EB]">
                <Icon size={20} />
              </div>
              <h3 className="mb-1.5 text-base font-semibold text-[#111827]">{title}</h3>
              <p className="text-sm leading-relaxed text-[#6B7280]">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="bg-[#FAFAFA] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
              How it works
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
              From requirement to award in three steps
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {workflow.map(({ icon: Icon, title, description }, i) => (
              <div key={title} className="relative rounded-2xl bg-white p-6 card-shadow border border-[#E5E7EB]">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
                    <Icon size={20} />
                  </div>
                  <span className="text-xs font-semibold text-[#9CA3AF]">
                    Step {i + 1} of 3
                  </span>
                </div>
                <h3 className="mb-1.5 text-base font-semibold text-[#111827]">{title}</h3>
                <p className="text-sm leading-relaxed text-[#6B7280]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
              AI Insights
            </p>
            <h2 className="mb-5 text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
              An AI layer watching every bid, not just the lowest one
            </h2>
            <p className="mb-7 text-base leading-relaxed text-[#6B7280]">
              BidX continuously models pricing behavior across your auctions.
              It flags anomalies, surfaces vendor risk, and gives your team a
              clear recommendation before you commit to a purchase.
            </p>
            <div className="space-y-4">
              {[
                "Real-time anomaly detection on every incoming bid",
                "Vendor risk scoring based on historical performance",
                "Confidence-rated recommendations, not just raw numbers",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#22C55E]/10 text-[#16a34a]">
                    <Check size={12} />
                  </div>
                  <p className="text-sm text-[#374151]">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card-shadow rounded-3xl border border-[#E5E7EB] bg-white p-6">
            <div className="mb-4 flex items-center gap-2">
              <ShieldAlert size={16} className="text-[#dc2626]" />
              <p className="text-sm font-semibold text-[#111827]">Risk alert</p>
              <span className="ml-auto rounded-full bg-[#EF4444]/10 px-2.5 py-1 text-xs font-medium text-[#dc2626]">
                High
              </span>
            </div>
            <p className="mb-4 text-sm text-[#6B7280]">
              Bid from CorePharm Ltd. is 34% below category average — flagged
              for manual review before award.
            </p>
            <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-4 text-xs text-[#6B7280]">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={12} />2 minutes ago
              </span>
              <span className="font-medium text-[#2563EB]">Confidence: 91%</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FAFAFA] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
              Testimonials
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
              Procurement teams trust BidX
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="card-shadow rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <div className="mb-3 flex gap-0.5 text-[#F59E0B]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="mb-5 text-sm leading-relaxed text-[#374151]">
                  "{t.quote}"
                </p>
                <p className="text-sm font-semibold text-[#111827]">{t.name}</p>
                <p className="text-xs text-[#6B7280]">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
            Pricing
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
            Simple pricing for hospitals and vendors
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl border p-7 ${
                tier.highlighted
                  ? "card-shadow relative border-[#2563EB] bg-white ring-1 ring-[#2563EB]"
                  : "card-shadow border-[#E5E7EB] bg-white"
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-7 rounded-full bg-[#2563EB] px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
              <h3 className="mb-1 text-lg font-semibold text-[#111827]">{tier.name}</h3>
              <p className="mb-4 text-sm text-[#6B7280]">{tier.description}</p>
              <div className="mb-6 flex items-baseline gap-1.5">
                <span className="text-3xl font-semibold tracking-tight text-[#111827]">
                  {tier.price}
                </span>
                <span className="text-sm text-[#6B7280]">{tier.period}</span>
              </div>
              <ul className="mb-7 space-y-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[#374151]">
                    <Check size={14} className="text-[#16a34a]" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className={`focus-ring flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                  tier.highlighted
                    ? "bg-[#2563EB] text-white shadow-sm shadow-blue-600/25 hover:bg-[#1D4ED8]"
                    : "border border-[#E5E7EB] text-[#111827] hover:bg-[#F8FAFC]"
                }`}
              >
                {tier.cta}
                <ArrowUpRight size={15} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="bg-[#FAFAFA] px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
              FAQ
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>
          <div>
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <div className="card-shadow rounded-3xl border border-[#E5E7EB] bg-gradient-to-br from-[#2563EB] to-[#4F46E5] p-12 text-white">
          <h2 className="mb-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to run your first auction?
          </h2>
          <p className="mx-auto mb-8 max-w-md text-sm text-white/80">
            Set up your organization in minutes and invite vendors to start
            competing on price today.
          </p>
          <Link
            to="/register"
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#2563EB] shadow-lg transition-all hover:bg-[#F8FAFC]"
          >
            Create your account
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-[#E5E7EB] px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="mb-3 flex items-center gap-2 font-semibold text-[#111827]">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#2563EB] to-[#4F46E5] text-white">
                B
              </span>
              BidX
            </div>
            <p className="max-w-xs text-sm text-[#6B7280]">
              AI-powered reverse procurement for hospitals and their verified
              vendor networks.
            </p>
          </div>
          {[
            {
              title: "Product",
              links: ["Features", "Solutions", "Pricing", "Security"],
            },
            {
              title: "Company",
              links: ["About", "Careers", "Blog", "Contact"],
            },
            {
              title: "Resources",
              links: ["Documentation", "API reference", "Support", "Status"],
            },
          ].map((col) => (
            <div key={col.title}>
              <p className="mb-3 text-sm font-semibold text-[#111827]">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-[#6B7280] hover:text-[#111827]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-7xl border-t border-[#E5E7EB] pt-6 text-xs text-[#9CA3AF]">
          © {new Date().getFullYear()} BidX, Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
