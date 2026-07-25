import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Gavel,
  ShieldAlert,
  User,
  PlusCircle,
  LogOut,
  X,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { cn, initials } from "../../utils/helpers";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/auctions", label: "Auctions", icon: Gavel },
  { to: "/alerts", label: "AI Alerts", icon: ShieldAlert },
  { to: "/profile", label: "Profile", icon: User },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { user, logout } = useAuth();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-[#111827]/30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-[#E5E7EB] bg-white transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <div className="flex items-center gap-2 font-semibold text-[#111827]">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#2563EB] to-[#4F46E5] text-sm text-white">
              B
            </span>
            BidX
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="focus-ring flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F8FAFC] lg:hidden"
          >
            <X size={17} />
          </button>
        </div>

        {user?.role === "hospital" && (
          <div className="px-4 pb-2">
            <NavLink
              to="/auctions/create"
              className="focus-ring flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-3 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-[#1D4ED8]"
            >
              <PlusCircle size={16} />
              New Auction
            </NavLink>
          </div>
        )}

        <nav className="flex-1 space-y-1 px-3 py-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "focus-ring flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#EEF4FF] text-[#2563EB]"
                    : "text-[#6B7280] hover:bg-[#F8FAFC] hover:text-[#111827]"
                )
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-[#E5E7EB] p-3">
          <div className="mb-2 flex items-center gap-2.5 rounded-xl bg-[#FAFAFA] px-3 py-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF4FF] text-xs font-semibold text-[#2563EB]">
              {user ? initials(user.name) : "?"}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[#111827]">
                {user?.name}
              </p>
              <p className="truncate text-xs capitalize text-[#6B7280]">
                {user?.role} account
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            className="focus-ring flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#6B7280] transition-colors hover:bg-[#EF4444]/5 hover:text-[#EF4444]"
          >
            <LogOut size={17} />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}
