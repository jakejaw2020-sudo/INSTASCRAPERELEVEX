import type { CarouselPost } from '@/types';
import StatusDot from '@/components/ui/StatusDot';

export default function PostQueueItem({ post, active, onSelect }: { post: CarouselPost; active: boolean; onSelect: () => void }): JSX.Element {
  return (
    <button className={`w-full rounded-md border p-3 text-left ${active ? 'border-[var(--accent)]' : 'border-[#222]'}`} onClick={onSelect}>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span>{post.title}</span>
        <StatusDot color={post.status === 'approved' ? 'green' : 'yellow'} />
      </div>
      <div className="text-xs text-[var(--text-tertiary)]">{new Date(post.created_at).toLocaleString()}</div>
    </button>
  );
}
