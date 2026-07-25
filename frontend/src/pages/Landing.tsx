import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Gavel,
  Users,
  BarChart3,
  ShieldCheck,
  Lock,
  Radar,
  Building2,
  Sparkles,
  Clock,
} from "lucide-react";

const GITHUB_URL = "https://github.com/PiyushLadukar";
const LINKEDIN_URL = "https://www.linkedin.com/in/piyush-ladukar/";
const AVATAR_URL = "https://github.com/PiyushLadukar.png?size=200";

function GithubMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.08.78 2.18 0 1.57-.01 2.84-.01 3.23 0 .32.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.35-5.15-11.5-12-11.5Z" />
    </svg>
  );
}

function LinkedinMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

const features = [
  {
    icon: Gavel,
    title: "Reverse auctions",
    description: "Vendors bid the price down, not up — every round moves in your favor.",
  },
  {
    icon: Radar,
    title: "Risk detection",
    description: "Bids are checked against category norms before they ever reach you.",
  },
  {
    icon: Users,
    title: "Verified vendors",
    description: "Every supplier is reviewed before they're allowed to place a bid.",
  },
  {
    icon: BarChart3,
    title: "Live analytics",
    description: "Spend and savings update the moment a bid lands, not at month end.",
  },
  {
    icon: Lock,
    title: "Access control",
    description: "Role-based permissions and a full audit trail on every award.",
  },
  {
    icon: Building2,
    title: "Multi-facility",
    description: "Run procurement across one hospital or an entire network from one place.",
  },
];

const hospitalBenefits = [
  "Post a requirement and set your own closing time",
  "Watch vendors compete in real time on price",
  "Get an AI risk read before you award anything",
];

const vendorBenefits = [
  "See every open auction you're eligible to bid on",
  "Track your bid position as competitors respond",
  "Get notified the moment an auction closes",
];

const steps = [
  {
    icon: Building2,
    title: "Post the requirement",
    description: "Define the supply, budget ceiling, and closing time.",
  },
  {
    icon: Gavel,
    title: "Vendors compete",
    description: "Verified suppliers bid openly until the clock runs out.",
  },
  {
    icon: ShieldCheck,
    title: "AI reviews the field",
    description: "Anomalies get flagged before anything is awarded.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-[#111827]">
      <header className="sticky top-0 z-40 border-b border-[#E5E7EB] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2.5 font-semibold text-[#111827]">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB] text-white">
              B
            </span>
            BidX
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-[#374151] lg:flex">
            <a href="#features" className="hover:text-[#111827]">Features</a>
            <a href="#workflow" className="hover:text-[#111827]">How it works</a>
            <a href="#ai" className="hover:text-[#111827]">AI engine</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="focus-ring hidden text-sm font-medium text-[#374151] hover:text-[#111827] sm:inline-flex"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="focus-ring inline-flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-600/20 transition-all hover:bg-[#1D4ED8] hover:shadow-md"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-20 pt-20 sm:pt-28">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-gradient-to-b from-[#EEF4FF] to-white"
          aria-hidden="true"
        />
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-xs font-medium text-[#374151] shadow-sm">
              <Sparkles size={13} className="text-[#2563EB]" />
              AI-powered reverse procurement
            </div>
            <h1 className="text-5xl font-semibold leading-[1.1] tracking-tight text-[#111827] sm:text-6xl">
              Bids, but better.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#6B7280]">
              Hospitals post what they need. Verified vendors compete on
              price. AI reviews every bid for risk before you commit to a
              purchase.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/register"
                className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/25 transition-all hover:bg-[#1D4ED8] hover:shadow-md"
              >
                Start an auction
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/login"
                className="focus-ring inline-flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-6 py-3.5 text-sm font-semibold text-[#111827] shadow-sm hover:bg-[#F8FAFC]"
              >
                Log in
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_2px_rgba(17,24,39,0.04),0_24px_48px_-28px_rgba(17,24,39,0.18)]">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-semibold text-[#111827]">
                  Surgical gloves — bulk order
                </p>
                <span className="rounded-full bg-[#22C55E]/10 px-2.5 py-1 text-xs font-medium text-[#16a34a]">
                  Open
                </span>
              </div>
              <div className="mb-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#FAFAFA] p-4">
                  <p className="text-xs text-[#6B7280]">Lowest bid</p>
                  <p className="mt-1 text-2xl font-semibold text-[#16a34a]">$4,120</p>
                </div>
                <div className="rounded-xl bg-[#FAFAFA] p-4">
                  <p className="text-xs text-[#6B7280]">Vendors competing</p>
                  <p className="mt-1 text-2xl font-semibold text-[#111827]">4</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { name: "MedSupply Co.", amount: "$4,120" },
                  { name: "Vantage Health", amount: "$4,340" },
                  { name: "CorePharm Ltd.", amount: "$4,590" },
                ].map((bid) => (
                  <div
                    key={bid.name}
                    className="flex items-center justify-between rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-sm"
                  >
                    <span className="text-[#374151]">{bid.name}</span>
                    <span className="font-medium text-[#111827]">{bid.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="absolute -left-6 -top-6 hidden items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 shadow-lg shadow-black/5 sm:flex"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB]/10 text-[#2563EB]">
                <ShieldCheck size={17} />
              </div>
              <div>
                <p className="text-xs text-[#6B7280]">Every bid</p>
                <p className="text-sm font-semibold text-[#111827]">AI reviewed</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="absolute -bottom-6 -right-4 hidden items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 shadow-lg shadow-black/5 sm:flex"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F59E0B]/10 text-[#b45309]">
                <Clock size={17} />
              </div>
              <div>
                <p className="text-xs text-[#6B7280]">Closes</p>
                <p className="text-sm font-semibold text-[#111827]">In 2h 14m</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="border-t border-[#E5E7EB] bg-[#FAFAFA]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
              Platform
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
              Everything procurement teams need
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.06]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#2563EB]">
                  <Icon size={20} />
                </div>
                <h3 className="mb-1.5 text-base font-semibold text-[#111827]">{title}</h3>
                <p className="text-sm leading-relaxed text-[#6B7280]">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="border-t border-[#E5E7EB]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
              Built for both sides
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
              Whichever side of the auction you're on
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#2563EB]">
                <Building2 size={20} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#111827]">For hospitals</h3>
              <p className="mb-5 text-sm text-[#6B7280]">
                Turn procurement into a competitive market, without the back
                and forth.
              </p>
              <ul className="space-y-3">
                {hospitalBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-[#374151]">
                    <Check size={15} className="mt-0.5 shrink-0 text-[#16a34a]" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#2563EB]">
                <Gavel size={20} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#111827]">For vendors</h3>
              <p className="mb-5 text-sm text-[#6B7280]">
                Get transparent access to procurement opportunities you
                actually qualify for.
              </p>
              <ul className="space-y-3">
                {vendorBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-[#374151]">
                    <Check size={15} className="mt-0.5 shrink-0 text-[#16a34a]" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section id="workflow" className="border-t border-[#E5E7EB] bg-[#FAFAFA]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
              How it works
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
              From requirement to award in three steps
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {steps.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-sm"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
                    <Icon size={20} />
                  </div>
                  <span className="text-xs font-semibold text-[#9CA3AF]">
                    Step {i + 1} of 3
                  </span>
                </div>
                <h3 className="mb-1.5 text-base font-semibold text-[#111827]">{title}</h3>
                <p className="text-sm leading-relaxed text-[#6B7280]">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI SECTION */}
      <section id="ai" className="border-t border-[#E5E7EB]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
                AI insights
              </p>
              <h2 className="mb-5 text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
                Watching every bid, not just the lowest one
              </h2>
              <p className="mb-7 text-base leading-relaxed text-[#6B7280]">
                Each bid is scored against category pricing history the
                moment it lands. If something looks off — a price that's too
                good, a pattern that repeats — it's flagged before an award
                is made, not after.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Radar, label: "Anomaly detection" },
                  { icon: ShieldCheck, label: "Vendor risk scoring" },
                  { icon: BarChart3, label: "Live analytics" },
                  { icon: Lock, label: "Full audit trail" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white p-3.5 shadow-sm"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EEF4FF] text-[#2563EB]">
                      <Icon size={15} />
                    </div>
                    <p className="text-sm font-medium text-[#111827]">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] p-7"
            >
              <p className="mb-5 text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                How a bid gets checked
              </p>
              <div className="space-y-3">
                {[
                  { label: "Bid received", detail: "Vendor submits a price", tone: "neutral" },
                  { label: "Risk model scores it", detail: "Checked against category history", tone: "primary" },
                  { label: "Cleared or flagged", detail: "You see the verdict instantly", tone: "success" },
                ].map((row, i) => (
                  <div key={row.label} className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${
                          row.tone === "primary"
                            ? "bg-[#2563EB] text-white"
                            : row.tone === "success"
                              ? "bg-[#22C55E]/10 text-[#16a34a]"
                              : "bg-white border border-[#E5E7EB] text-[#6B7280]"
                        }`}
                      >
                        {i + 1}
                      </div>
                      {i < 2 && <div className="h-6 w-px bg-[#E5E7EB]" />}
                    </div>
                    <div className="flex-1 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3">
                      <p className="text-sm font-semibold text-[#111827]">{row.label}</p>
                      <p className="text-xs text-[#6B7280]">{row.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BUILDER */}
      <section className="border-t border-[#E5E7EB] bg-[#FAFAFA]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mx-auto flex max-w-xl flex-col items-center gap-5 rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm sm:flex-row sm:text-left"
          >
            <img
              src={AVATAR_URL}
              alt="Piyush Ladukar"
              width={72}
              height={72}
              className="h-[72px] w-[72px] shrink-0 rounded-full border border-[#E5E7EB] object-cover"
            />
            <div className="flex-1">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">
                Built by
              </p>
              <p className="text-lg font-semibold text-[#111827]">Piyush Ladukar</p>
              <p className="text-sm text-[#6B7280]">Designed and built this end to end.</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] text-[#374151] transition-colors hover:border-[#111827] hover:text-[#111827]"
              >
                <GithubMark size={18} />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] text-[#374151] transition-colors hover:border-[#2563EB] hover:text-[#2563EB]"
              >
                <LinkedinMark size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-[#E5E7EB]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col items-center justify-between gap-8 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#4F46E5] px-8 py-12 text-center shadow-xl shadow-blue-600/20 sm:flex-row sm:text-left">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Ready to run your first auction?
              </h2>
              <p className="mt-2 text-sm text-white/80">
                Set up your organization and invite vendors in minutes.
              </p>
            </div>
            <Link
              to="/register"
              className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#2563EB] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#F8FAFC]"
            >
              Create your account
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}