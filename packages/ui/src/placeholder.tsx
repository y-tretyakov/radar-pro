import type { ReactNode } from 'react';

export interface PlaceholderProps {
  title?: string;
  children?: ReactNode;
}

/** Minimal shared shell component for monorepo wiring. */
export function Placeholder({ title = 'Radar Pro', children }: PlaceholderProps) {
  return (
    <div data-radar-pro-ui="placeholder">
      <h1>{title}</h1>
      {children}
    </div>
  );
}
