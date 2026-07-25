import { useState } from "react";
import {
  Mail,
  Building2,
  ShieldCheck,
  LogOut,
  Bell,
  Lock,
  Activity,
  Camera,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import EmptyState from "../components/common/EmptyState";
import { initials } from "../utils/helpers";

export default function Profile() {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState({
    auctionUpdates: true,
    aiAlerts: true,
    weeklyDigest: false,
  });
  const showAiAlerts = user?.role === "hospital";

  if (!user) return null;

  const toggle = (key: keyof typeof notifications) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[#111827]">Profile</h1>
        <p className="mt-1 text-sm text-[#6B7280]">
          Manage your account, organization, and security preferences.
        </p>
      </div>

      <Card padding="lg">
        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF4FF] text-lg font-semibold text-[#2563EB]">
              {initials(user.full_name)}
            </span>
            <button
              type="button"
              aria-label="Change avatar"
              className="focus-ring absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#6B7280] shadow-sm hover:bg-[#F8FAFC]"
            >
              <Camera size={13} />
            </button>
          </div>
          <div>
            <p className="text-base font-semibold text-[#111827]">{user.full_name}</p>
            <p className="text-sm capitalize text-[#6B7280]">{user.role} account</p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 border-t border-[#E5E7EB] pt-6 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3F4F6] text-[#6B7280]">
              <Mail size={16} />
            </div>
            <div>
              <p className="text-xs text-[#6B7280]">Email</p>
              <p className="text-sm font-medium text-[#111827]">{user.email}</p>
            </div>
          </div>

          {user.company_name && (
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3F4F6] text-[#6B7280]">
                <Building2 size={16} />
              </div>
              <div>
                <p className="text-xs text-[#6B7280]">Organization</p>
                <p className="text-sm font-medium text-[#111827]">{user.company_name}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3F4F6] text-[#6B7280]">
              <ShieldCheck size={16} />
            </div>
            <div>
              <p className="text-xs text-[#6B7280]">Account type</p>
              <p className="text-sm font-medium capitalize text-[#111827]">{user.role}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card padding="lg">
        <div className="mb-5 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#2563EB]">
            <Lock size={17} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#111827]">Security</h2>
            <p className="text-xs text-[#6B7280]">Update your password regularly.</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Current password" type="password" placeholder="••••••••" />
          <Input label="New password" type="password" placeholder="••••••••" />
        </div>
        <div className="mt-5 flex justify-end">
          <Button variant="outline">Update password</Button>
        </div>
      </Card>

      <Card padding="lg">
        <div className="mb-5 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#2563EB]">
            <Bell size={17} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#111827]">Notifications</h2>
            <p className="text-xs text-[#6B7280]">Choose what you want to be notified about.</p>
          </div>
        </div>
        <div className="divide-y divide-[#E5E7EB]">
          {[
            { key: "auctionUpdates" as const, label: "Auction status updates", description: "Bid activity and auction closures." },
            ...(showAiAlerts
              ? [{ key: "aiAlerts" as const, label: "AI risk alerts", description: "Pricing anomalies flagged in real time." }]
              : []),
            { key: "weeklyDigest" as const, label: "Weekly digest", description: "A weekly summary of procurement activity." },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-medium text-[#111827]">{item.label}</p>
                <p className="text-xs text-[#6B7280]">{item.description}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={notifications[item.key]}
                onClick={() => toggle(item.key)}
                className={`focus-ring relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  notifications[item.key] ? "bg-[#2563EB]" : "bg-[#E5E7EB]"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    notifications[item.key] ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </Card>

      <Card padding="lg">
        <div className="mb-5 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#2563EB]">
            <Activity size={17} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#111827]">Account activity</h2>
            <p className="text-xs text-[#6B7280]">Recent actions on your account.</p>
          </div>
        </div>
        <EmptyState
          icon={Activity}
          title="No recent activity"
          description="Account activity will appear here as you use BidX."
        />
      </Card>

      <Button variant="danger" onClick={logout}>
        <LogOut size={16} />
        Log out
      </Button>
    </div>
  );
}
