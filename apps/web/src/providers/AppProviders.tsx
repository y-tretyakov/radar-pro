import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import { useEffect, useState, type ReactNode } from 'react';
import { createAppQueryClient } from '../lib/queryClient.js';
import { applyDocumentTheme } from '../lib/theme.js';
import { useUiStore } from '../stores/uiStore.js';

function ThemeSync() {
  const theme = useUiStore((s) => s.theme);

  useEffect(() => {
    applyDocumentTheme(theme);

    if (theme !== 'system') {
      return;
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => applyDocumentTheme('system');
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [theme]);

  return null;
}

export interface AppProvidersProps {
  children: ReactNode;
}

/**
 * App-wide providers: TanStack Query + nuqs (React Router v7 adapter).
 * Theme sync is client-only via uiStore.
 */
export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(() => createAppQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <ThemeSync />
        {children}
      </NuqsAdapter>
      {import.meta.env.DEV ? <ReactQueryDevtools initialIsOpen={false} /> : null}
    </QueryClientProvider>
  );
}
