import api from "./axios";
import type { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse, User } from "../types";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", payload);
  return data;
}

export async function register(payload: RegisterPayload): Promise<RegisterResponse> {
  const { data } = await api.post<RegisterResponse>("/auth/register", payload);
  return data;
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>("/auth/me");
  return data;
}
