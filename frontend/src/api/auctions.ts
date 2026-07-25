import api from "./axios";
import type { Auction, CreateAuctionPayload } from "../types";

export async function getAuctions(): Promise<Auction[]> {
  const { data } = await api.get<Auction[]>("/auctions");
  return data;
}

export async function getAuction(id: string): Promise<Auction> {
  const { data } = await api.get<Auction>(`/auctions/${id}`);
  return data;
}

export async function createAuction(
  payload: CreateAuctionPayload
): Promise<Auction> {
  const { data } = await api.post<Auction>("/auctions", payload);
  return data;
}

export async function closeAuction(id: string): Promise<Auction> {
  const { data } = await api.post<Auction>(`/auctions/${id}/close`);
  return data;
}
