import type { PropsWithChildren } from 'react';

export default function Modal({ children }: PropsWithChildren): JSX.Element {
  return <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70">{children}</div>;
}
