import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <p className="mb-2 text-sm font-semibold text-[#2563EB]">404</p>
      <h1 className="mb-2 text-3xl font-semibold tracking-tight text-[#111827]">
        Page not found
      </h1>
      <p className="mb-6 max-w-sm text-sm text-[#6B7280]">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link
        to="/"
        className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-medium text-white shadow-sm shadow-blue-600/20 hover:bg-[#1D4ED8]"
      >
        <ArrowLeft size={16} />
        Back home
      </Link>
    </div>
  );
}
