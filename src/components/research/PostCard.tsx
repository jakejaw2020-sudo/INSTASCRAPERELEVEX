import type { ApifyResult } from '@/types';
import Button from '@/components/ui/Button';

export default function PostCard({ post, onAnalyze }: { post: ApifyResult; onAnalyze: (post: ApifyResult) => void }): JSX.Element {
  return (
    <article className="space-y-2 rounded-md border border-[#222] bg-[var(--bg-elevated)] p-3">
      <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
        <img src={post.ownerProfilePicUrl} alt={post.ownerUsername} className="h-6 w-6 rounded-full" />
        @{post.ownerUsername}
      </div>
      <img src={post.displayUrl} alt="Post media" className="h-40 w-full rounded-md object-cover" />
      <p className="text-xs text-[var(--text-secondary)]">{post.caption.slice(0, 120)}...</p>
      <div className="flex justify-between text-xs text-[var(--text-tertiary)]">
        <span>{post.likesCount} likes</span>
        <span>{post.commentsCount} comments</span>
      </div>
      <Button onClick={() => onAnalyze(post)}>Analyze with GPT-4o</Button>
    </article>
  );
}
