import type { PropsWithChildren } from 'react';

export default function Badge({ children }: PropsWithChildren): JSX.Element {
  return <span className="rounded-md border border-[#222] px-2 py-1 text-xs text-[var(--text-secondary)]">{children}</span>;
}
