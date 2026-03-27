import type { PostAnalysis } from '@/types';
import Button from '@/components/ui/Button';

export default function AnalysisPanel({ analysis }: { analysis: PostAnalysis | null }): JSX.Element {
  if (!analysis) {
    return <div className="text-sm text-[var(--text-tertiary)]">Analyze a post to view strategic decomposition.</div>;
  }

  return (
    <div className="space-y-2 text-sm text-[var(--text-secondary)]">
      <div>Hook: {analysis.hook_type}</div>
      <div>Emotion: {analysis.emotional_angle}</div>
      <div>Density: {analysis.information_density}</div>
      <div>Structure: {analysis.slide_structure}</div>
      <div>CTA: {analysis.cta_type}</div>
      <div>{analysis.performance_reason}</div>
      <div>{analysis.brand_adaptation}</div>
      <Button className="w-full">Generate Carousel →</Button>
    </div>
  );
}
