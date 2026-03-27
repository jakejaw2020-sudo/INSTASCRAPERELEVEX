export default function TopBar(): JSX.Element {
  return (
    <header className="flex h-12 items-center justify-between border-b border-[#222] px-4">
      <h1 className="font-display text-sm text-[var(--text-secondary)]">Clinical Command Center</h1>
      <div className="text-xs text-[var(--text-tertiary)]">Single-user local desktop runtime</div>
    </header>
  );
}
