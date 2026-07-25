import api from "./axios";
import type { Alert } from "../types";

export async function getAlerts(): Promise<Alert[]> {
  const { data } = await api.get<Alert[]>("/ai-alerts/");
  return data;
}
