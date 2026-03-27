import type { PropsWithChildren } from 'react';

export default function PanelLayout({ children }: PropsWithChildren): JSX.Element {
  return <div className="grid h-[calc(100vh-3rem)] grid-cols-3 gap-3 p-3">{children}</div>;
}
