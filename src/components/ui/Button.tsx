import type { ButtonHTMLAttributes } from 'react';

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
  return (
    <button
      {...props}
      className={`rounded-md border border-[#222] bg-[var(--bg-elevated)] px-3 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:border-[#333] hover:bg-[#171717] ${props.className ?? ''}`}
    />
  );
}
