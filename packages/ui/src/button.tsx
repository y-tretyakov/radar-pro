import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

/** Minimal shared button — styles live in the consuming app. */
export function Button({
  variant = 'primary',
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = ['rp-button', `rp-button--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} data-radar-pro-ui="button" data-variant={variant} className={classes} {...rest}>
      {children}
    </button>
  );
}
