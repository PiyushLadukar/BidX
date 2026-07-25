export type UserRole = "hospital" | "vendor";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
  created_at?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user?: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  organization?: string;
}

export type AuctionStatus = "open" | "closed" | "pending";

export interface Auction {
  id: string;
  title: string;
  description: string;
  category?: string;
  quantity?: number;
  unit?: string;
  status: AuctionStatus;
  starting_price: number;
  lowest_bid?: number | null;
  hospital_id?: string;
  hospital_name?: string;
  created_at: string;
  closing_time: string;
  bid_count?: number;
}

export interface CreateAuctionPayload {
  title: string;
  description: string;
  category?: string;
  quantity?: number;
  unit?: string;
  starting_price: number;
  closing_time: string;
}

export interface Bid {
  id: string;
  auction_id: string;
  vendor_id: string;
  vendor_name?: string;
  amount: number;
  created_at: string;
}

export interface CreateBidPayload {
  auction_id: string;
  amount: number;
}

export type AlertSeverity = "low" | "medium" | "high" | "critical";

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  risk_score?: number;
  auction_id?: string;
  created_at: string;
}

export interface ApiError {
  detail?: string;
  message?: string;
}
