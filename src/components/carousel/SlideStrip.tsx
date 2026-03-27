import type { GeneratedSlide } from '@/types';

export default function SlideStrip({ slides, selected, onSelect }: { slides: GeneratedSlide[]; selected: number; onSelect: (index: number) => void }): JSX.Element {
  return (
    <div className="space-y-2">
      {slides.map((slide, index) => (
        <button
          key={slide.slide_index}
          className={`w-full rounded-md border p-2 text-left text-xs ${selected === index ? 'border-[var(--accent)]' : 'border-[#222]'}`}
          onClick={() => onSelect(index)}
        >
          {slide.headline}
        </button>
      ))}
    </div>
  );
}
