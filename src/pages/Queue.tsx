import { useMemo, useState } from 'react';
import ApprovalActions from '@/components/queue/ApprovalActions';
import PostQueueItem from '@/components/queue/PostQueueItem';
import type { CarouselPost } from '@/types';

const seedPosts: CarouselPost[] = [
  { id: '1', title: 'HRV Protocol Stack', status: 'ready', caption: 'Caption', hashtags: '#tag', music_mood: 'focused', slide_count: 6, created_at: new Date().toISOString(), approved_at: null, instagram_post_id: null }
];

export default function QueuePage(): JSX.Element {
  const [posts] = useState(seedPosts);
  const [selectedId, setSelectedId] = useState<string | null>(seedPosts[0]?.id ?? null);
  const selected = useMemo(() => posts.find((post) => post.id === selectedId) ?? null, [posts, selectedId]);

  return (
    <div className="grid h-full grid-cols-[360px_1fr] gap-3 p-3">
      <section className="space-y-2 rounded-md border border-[#222] bg-[var(--bg-surface)] p-3">
        {posts.map((post) => <PostQueueItem key={post.id} post={post} active={post.id === selectedId} onSelect={() => setSelectedId(post.id)} />)}
      </section>
      <section className="space-y-3 rounded-md border border-[#222] bg-[var(--bg-surface)] p-3">
        <h2 className="font-display text-sm">{selected?.title}</h2>
        <p className="text-sm text-[var(--text-secondary)]">{selected?.caption}</p>
        <p className="text-xs text-[var(--text-tertiary)]">{selected?.hashtags}</p>
        <ApprovalActions />
      </section>
    </div>
  );
}
