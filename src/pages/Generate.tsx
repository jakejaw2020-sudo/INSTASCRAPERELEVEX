import { useMemo, useState } from 'react';
import SlideCanvas from '@/components/carousel/SlideCanvas';
import SlideEditor from '@/components/carousel/SlideEditor';
import SlideStrip from '@/components/carousel/SlideStrip';
import Button from '@/components/ui/Button';
import { generateCarouselContent, generateImage, runComplianceFilter } from '@/services/openai';
import type { BrandColor, GeneratedSlide } from '@/types';

function buildDallePrompt(slide: GeneratedSlide, brandColors: BrandColor[], slideIndex: number): string {
  const colorList = brandColors.map((color) => color.hex).join(', ');
  return `Abstract clinical background for a premium performance brand Instagram slide.
Style: dark, minimal, scientific, luxury.
Dominant colors: ${colorList}.
No text. No faces. No people. No medical imagery.
Mood: ${slideIndex === 0 ? 'bold and commanding' : 'clean and precise'}.
Format: 1080x1080 square.
Avoid: neon, psychedelic, gym imagery, protein powder, syringes, pills.
The background should feel like a high-end biotech brand design system.`;
}

export default function GeneratePage(): JSX.Element {
  const [slides, setSlides] = useState<GeneratedSlide[]>([]);
  const [selected, setSelected] = useState(0);
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [warning, setWarning] = useState<string[]>([]);
  const [status, setStatus] = useState('Idle');

  const current = slides[selected];
  const colors = useMemo<BrandColor[]>(() => [{ id: '1', hex: '#C8FF00', name: 'Accent Lime' }], []);

  return (
    <div className="grid h-full grid-cols-[220px_1fr_360px] gap-3 p-3">
      <section className="rounded-md border border-[#222] bg-[var(--bg-surface)] p-3">
        <SlideStrip slides={slides} selected={selected} onSelect={setSelected} />
      </section>
      <section className="space-y-3 rounded-md border border-[#222] bg-[var(--bg-surface)] p-3">
        <div className="flex gap-2">
          <Button onClick={async () => {
            setStatus('Content generation...');
            const generated = await generateCarouselContent(
              'You are a content strategist for Elevex Performance, a clinical human performance brand.',
              'Generate a high-performing carousel based on scientific longevity protocols.'
            );
            const merged: GeneratedSlide[] = [
              { slide_index: 0, headline: generated.cover.headline, hook_label: generated.cover.hook_label },
              ...generated.slides
            ];
            const compliance = runComplianceFilter(`${generated.caption} ${generated.hashtags} ${merged.map((slide) => `${slide.headline} ${slide.body_copy ?? ''}`).join(' ')}`);
            setWarning(compliance.flagged);

            for (const slide of merged) {
              setStatus(`Generating slide ${slide.slide_index + 1} of 6...`);
              slide.dalle_prompt = buildDallePrompt(slide, colors, slide.slide_index);
              slide.dalle_image_url = await generateImage(slide.dalle_prompt);
              slide.final_image_url = slide.dalle_image_url;
              setSlides([...merged]);
            }

            setCaption(generated.caption);
            setHashtags(generated.hashtags);
            setStatus('Complete');
          }}>Generate 6-Slide Draft</Button>
          <Button>Save to Queue</Button>
        </div>
        <div className="text-xs text-[var(--text-secondary)]">{status}</div>
        {warning.length > 0 ? (
          <div className="rounded-md border border-[var(--amber)] bg-[var(--accent-subtle)] p-2 text-xs text-[var(--amber)]">
            Compliance warning: {warning.join(', ')}
          </div>
        ) : null}
        <SlideCanvas imageUrl={current?.final_image_url} />
        <textarea value={caption} onChange={(event) => setCaption(event.target.value)} className="h-20 rounded-md border border-[#222] bg-[var(--bg-input)] p-2 text-sm" />
        <input value={hashtags} onChange={(event) => setHashtags(event.target.value)} className="rounded-md border border-[#222] bg-[var(--bg-input)] p-2 text-sm" />
      </section>
      <section className="rounded-md border border-[#222] bg-[var(--bg-surface)] p-3">
        <SlideEditor />
      </section>
    </div>
  );
}
