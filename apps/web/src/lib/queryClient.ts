import { QueryClient } from '@tanstack/react-query';

/**
 * Shared QueryClient for server state.
 * Defaults favor a calm skeleton phase (no aggressive refetch).
 */
export function createAppQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}
