import { useState } from 'react';
import PanelLayout from '@/components/layout/PanelLayout';
import AnalysisPanel from '@/components/research/AnalysisPanel';
import PostCard from '@/components/research/PostCard';
import ScrapeInput from '@/components/research/ScrapeInput';
import { generateJson } from '@/services/openai';
import type { ApifyResult, PostAnalysis } from '@/types';

const SYSTEM_PROMPT = `You are a content strategist analyzing viral Instagram posts for a clinical human performance brand.
Analyze the provided post data and extract:
1. Hook type (curiosity gap, bold claim, contrarian, how-to, list, story)
2. Emotional angle (fear of missing out, aspiration, social proof, authority, curiosity)
3. Information density (low / medium / high)
4. Slide structure pattern (how information is sequenced)
5. CTA type (follow, save, comment, click link)
6. Why it performed well (2-3 sentences)
7. How to adapt it for a clinical performance brand without copying it

Return as JSON: { hook_type, emotional_angle, information_density, slide_structure, cta_type, performance_reason, brand_adaptation }`;

export default function ResearchPage(): JSX.Element {
  const [posts, setPosts] = useState<ApifyResult[]>([]);
  const [analysis, setAnalysis] = useState<PostAnalysis | null>(null);

  return (
    <PanelLayout>
      <section className="rounded-md border border-[#222] bg-[var(--bg-surface)] p-3">
        <ScrapeInput onScrape={async (url) => {
          const results = await window.electronAPI.scrapeInstagram(url);
          setPosts(results);
        }} />
      </section>
      <section className="space-y-2 overflow-y-auto rounded-md border border-[#222] bg-[var(--bg-surface)] p-3">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onAnalyze={async (target) => {
              const response = await generateJson(SYSTEM_PROMPT, JSON.stringify(target));
              setAnalysis(JSON.parse(response) as PostAnalysis);
            }}
          />
        ))}
      </section>
      <section className="rounded-md border border-[#222] bg-[var(--bg-surface)] p-3">
        <AnalysisPanel analysis={analysis} />
      </section>
    </PanelLayout>
  );
}
