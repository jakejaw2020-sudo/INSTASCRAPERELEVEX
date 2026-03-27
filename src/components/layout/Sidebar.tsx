import { NavLink } from 'react-router-dom';

const routes = [
  ['Dashboard', '/dashboard'],
  ['Research', '/research'],
  ['Generate', '/generate'],
  ['Queue', '/queue'],
  ['Assets', '/assets'],
  ['Settings', '/settings']
] as const;

export default function Sidebar(): JSX.Element {
  return (
    <aside className="w-[200px] border-r border-[#222] bg-[var(--bg-surface)] p-2">
      <div className="px-2 pb-6 pt-3 font-display text-sm text-[var(--accent)]">ELEVEX STUDIO</div>
      <nav className="space-y-1">
        {routes.map(([label, path]) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => `block rounded-md border px-3 py-2 text-sm ${isActive ? 'border-[#333] bg-[#171717] text-[var(--text-primary)]' : 'border-transparent text-[var(--text-secondary)] hover:border-[#222]'}`}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
