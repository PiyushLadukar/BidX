import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { POLL_INTERVAL_MS } from "../utils/constants";

export function usePolling<T>(
  queryKey: unknown[],
  queryFn: () => Promise<T>,
  options?: Partial<UseQueryOptions<T>>
) {
  return useQuery<T>({
    queryKey,
    queryFn,
    refetchInterval: POLL_INTERVAL_MS,
    refetchOnWindowFocus: true,
    ...options,
  });
}
