export default function StatusDot({ color }: { color: 'green' | 'red' | 'yellow' | 'gray' }): JSX.Element {
  const map = { green: 'bg-[var(--teal)]', red: 'bg-[var(--red)]', yellow: 'bg-[var(--amber)]', gray: 'bg-[var(--text-tertiary)]' };
  return <span className={`inline-block h-[6px] w-[6px] rounded-full ${map[color]}`} />;
}
