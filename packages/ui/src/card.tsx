import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children?: ReactNode;
}

/** Minimal card surface for dashboard stubs and panels. */
export function Card({ title, children, className, ...rest }: CardProps) {
  const classes = ['rp-card', className].filter(Boolean).join(' ');

  return (
    <div data-radar-pro-ui="card" className={classes} {...rest}>
      {title ? <h2 className="rp-card__title">{title}</h2> : null}
      {children ? <div className="rp-card__body">{children}</div> : null}
    </div>
  );
}
