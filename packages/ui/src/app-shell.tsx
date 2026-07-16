import type { ReactNode } from 'react';

export interface AppShellProps {
  sidebarOpen?: boolean;
  sidebar?: ReactNode;
  header?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/**
 * Lightweight app chrome: optional sidebar + header + main content.
 * Layout visuals are styled by the host app (`.rp-shell*`).
 */
export function AppShell({
  sidebarOpen = true,
  sidebar,
  header,
  children,
  className,
}: AppShellProps) {
  const classes = [
    'rp-shell',
    sidebarOpen ? 'rp-shell--sidebar-open' : 'rp-shell--sidebar-collapsed',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div data-radar-pro-ui="app-shell" className={classes} data-sidebar-open={sidebarOpen}>
      {sidebar ? (
        <aside className="rp-shell__sidebar" aria-hidden={!sidebarOpen}>
          {sidebar}
        </aside>
      ) : null}
      <div className="rp-shell__main">
        {header ? <header className="rp-shell__header">{header}</header> : null}
        <main className="rp-shell__content">{children}</main>
      </div>
    </div>
  );
}
