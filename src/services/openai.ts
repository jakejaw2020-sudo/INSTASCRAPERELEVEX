import type { GeneratedCarousel } from '@/types';

const BANNED_PHRASES = [
  'treats', 'cures', 'heals', 'prevents disease', 'FDA approved',
  'clinically proven', 'guaranteed', 'diagnose', 'prescription',
  'BPC-157', 'TB-500', 'Semaglutide', 'Tirzepatide', 'peptide injection',
  'gains', 'shredded', 'beast mode', 'swole', 'bulk', 'cut'
];

export function runComplianceFilter(text: string): { passed: boolean; flagged: string[] } {
  const flagged = BANNED_PHRASES.filter((phrase) => text.toLowerCase().includes(phrase.toLowerCase()));
  return { passed: flagged.length === 0, flagged };
}

export async function generateJson(systemPrompt: string, userPrompt: string): Promise<string> {
  return window.electronAPI.generateContent({ systemPrompt, userPrompt, jsonMode: true });
}

export async function generateCarouselContent(systemPrompt: string, userPrompt: string): Promise<GeneratedCarousel> {
  const response = await generateJson(systemPrompt, userPrompt);
  return JSON.parse(response) as GeneratedCarousel;
}

export async function generateImage(prompt: string): Promise<string> {
  return window.electronAPI.generateImage({ prompt, size: '1024x1024', quality: 'standard' });
}
