export function formatCurrency(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDate(value: string | number | Date): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatRelativeTime(value: string | number | Date): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  const diffMs = date.getTime() - Date.now();
  const diffSec = Math.round(diffMs / 1000);
  const abs = Math.abs(diffSec);

  const units: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4.345, "week"],
    [12, "month"],
    [Number.POSITIVE_INFINITY, "year"],
  ];

  let unitValue = diffSec;
  let unitName: Intl.RelativeTimeFormatUnit = "second";
  let divisor = 1;

  for (const [amount, unit] of units) {
    if (abs < divisor * amount) {
      unitName = unit;
      break;
    }
    divisor *= amount;
    unitName = unit;
  }

  unitValue = Math.round(diffSec / divisor);
  return new Intl.RelativeTimeFormat("en-US", { numeric: "auto" }).format(
    unitValue,
    unitName
  );
}

export function getCountdown(closingTime: string): {
  label: string;
  expired: boolean;
} {
  const diff = new Date(closingTime).getTime() - Date.now();
  if (diff <= 0) return { label: "Closed", expired: true };

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) return { label: `${days}d ${hours}h left`, expired: false };
  if (hours > 0) return { label: `${hours}h ${minutes}m left`, expired: false };
  return { label: `${minutes}m ${seconds}s left`, expired: false };
}

export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

export function cn(...classes: unknown[]): string {
  return classes.filter((c): c is string => Boolean(c)).join(" ");
}
