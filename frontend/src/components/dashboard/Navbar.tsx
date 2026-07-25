import { Bell, Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { initials } from "../../utils/helpers";

export default function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user } = useAuth();

  return (
    <header className="glass sticky top-0 z-30 flex h-16 items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
          className="focus-ring -ml-1 flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F8FAFC] lg:hidden"
        >
          <Menu size={19} />
        </button>
        <div className="hidden items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-3.5 py-2 text-sm text-[#9CA3AF] shadow-sm sm:flex sm:w-72">
          <Search size={15} />
          <span>Search auctions, vendors…</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {user?.role === "hospital" && (
          <Link
            to="/alerts"
            aria-label="View alerts"
            className="focus-ring relative flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7280] transition-colors hover:bg-[#F8FAFC] hover:text-[#111827]"
          >
            <Bell size={18} />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#EF4444]" />
          </Link>
        )}
        <Link
          to="/profile"
          className="focus-ring flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-[#F8FAFC]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF4FF] text-xs font-semibold text-[#2563EB]">
            {user ? initials(user.full_name) : "?"}
          </span>
          <span className="hidden text-sm font-medium text-[#111827] sm:inline">
            {user?.full_name ?? "Account"}
          </span>
        </Link>
      </div>
    </header>
  );
}
