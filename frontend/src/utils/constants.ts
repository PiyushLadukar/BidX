export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  "http://localhost:8000";

export const TOKEN_KEY = "bidx_token";
export const USER_KEY = "bidx_user";

export const POLL_INTERVAL_MS = 5000;

export const AUCTION_STATUS_LABEL: Record<string, string> = {
  open: "Active",
  closed: "Closed",
  pending: "Pending",
};

export const ALERT_SEVERITY_LABEL: Record<string, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};
