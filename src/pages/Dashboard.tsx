import Button from '@/components/ui/Button';

export default function DashboardPage(): JSX.Element {
  const stats = [
    ['Total published', '0'],
    ['Posts this week', '0'],
    ['Awaiting approval', '0'],
    ['In draft', '0']
  ];

  return (
    <div className="space-y-3 p-3">
      <section className="grid grid-cols-4 gap-3">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-md border border-[#222] bg-[var(--bg-surface)] p-3">
            <div className="text-xs text-[var(--text-tertiary)]">{label}</div>
            <div className="font-display text-xl">{value}</div>
          </div>
        ))}
      </section>
      <section className="grid grid-cols-2 gap-3">
        <div className="space-y-2 rounded-md border border-[#222] bg-[var(--bg-surface)] p-3">
          <h3 className="text-sm">Recent Activity</h3>
          <div className="text-xs text-[var(--text-tertiary)]">No activity yet.</div>
        </div>
        <div className="space-y-2 rounded-md border border-[#222] bg-[var(--bg-surface)] p-3">
          <h3 className="text-sm">Quick Actions</h3>
          <div className="flex gap-2">
            <Button>New Research Target</Button>
            <Button>View Queue</Button>
          </div>
        </div>
      </section>
      <section className="rounded-md border border-[#222] bg-[var(--bg-surface)] p-3">
        <h3 className="mb-2 text-sm">This Week Schedule</h3>
        <div className="grid grid-cols-7 gap-2 text-xs">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="rounded-md border border-[#222] p-2 text-center">{day}</div>
          ))}
        </div>
      </section>
    </div>
  );
}
