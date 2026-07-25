import api from "./axios";
import type { Bid, CreateBidPayload } from "../types";

export async function placeBid(payload: CreateBidPayload): Promise<Bid> {
  const { data } = await api.post<Bid>("/bids", payload);
  return data;
}

export async function getBids(auctionId: string): Promise<Bid[]> {
  const { data } = await api.get<Bid[]>(`/bids/${auctionId}`);
  return data;
}

export async function getLowestBid(auctionId: string): Promise<Bid> {
  const { data } = await api.get<Bid>(`/bids/${auctionId}/lowest`);
  return data;
}
