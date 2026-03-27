import type { PropsWithChildren } from 'react';

export default function Panel({ children, className = '' }: PropsWithChildren<{ className?: string }>): JSX.Element {
  return <section className={`rounded-md border border-[#222] bg-[var(--bg-surface)] ${className}`}>{children}</section>;
}
