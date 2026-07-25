export type UserRole = "hospital" | "vendor" | string;

export interface User {
  id: number;
  full_name: string;
  email: string;
  role: UserRole;
  company_name?: string | null;
  created_at?: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface RegisterResponse {
  message: string;
  user_id: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
  role: UserRole;
  company_name?: string | null;
  tenant_name: string;
}

export type AuctionStatus = "open" | "active" | "closed" | "pending";

export interface Auction {
  id: number;
  title: string;
  description: string | null;
  category: string;
  quantity: number;
  status: AuctionStatus | string;
  starting_price: number;
  current_lowest_bid?: number | null;
  start_time?: string;
  end_time?: string;
  created_at?: string;
  closed_at?: string | null;
  tenant_id?: number;
  bid_count?: number;
}

export interface CreateAuctionPayload {
  title: string;
  description?: string | null;
  category: string;
  quantity: number;
  starting_price: number;
  start_time: string;
  end_time: string;
}

export interface Bid {
  id: number;
  auction_id: number;
  vendor_id: number;
  bid_amount: number;
  created_at: string;
  vendor_name?: string;
}

export interface CreateBidPayload {
  auction_id: number;
  bid_amount: number;
}

export type AlertSeverity = "low" | "medium" | "high" | "critical";

export interface Alert {
  id: number;
  auction_id: number;
  alert_type: string;
  severity: AlertSeverity | string;
  description: string;
  created_at: string;
  title?: string;
}

export interface ApiError {
  detail?: string;
  message?: string;
}
