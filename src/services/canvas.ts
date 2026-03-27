import { Canvas, FabricImage, Rect, Textbox } from 'fabric';
import type { BrandColor } from '@/types';

export async function compositeSlide(params: {
  dalleImageUrl: string;
  headline: string;
  bodyCopy?: string;
  hookLabel?: string;
  slideIndex: number;
  logoUrl: string;
  brandColors: BrandColor[];
}): Promise<Blob> {
  const accentColor = params.brandColors[0]?.hex ?? '#C8FF00';
  const canvas = new Canvas(undefined, { width: 1080, height: 1080 });

  const bgImage = await FabricImage.fromURL(params.dalleImageUrl);
  bgImage.scaleToWidth(1080);
  canvas.add(bgImage);

  const overlay = new Rect({ left: 0, top: 0, width: 1080, height: 1080, fill: 'rgba(0,0,0,0.45)' });
  canvas.add(overlay);

  const headline = new Textbox(params.headline, {
    left: 80,
    top: 260,
    width: 920,
    fill: '#F0EEE8',
    fontFamily: 'DM Mono',
    fontSize: params.slideIndex === 0 ? 72 : 56,
    fontWeight: 500
  });
  canvas.add(headline);

  if (params.bodyCopy) {
    const body = new Textbox(params.bodyCopy, {
      left: 80,
      top: 520,
      width: 920,
      fill: '#AAAAAA',
      fontFamily: 'Inter',
      fontSize: 32
    });
    canvas.add(body);
  }

  if (params.hookLabel) {
    canvas.add(new Textbox(params.hookLabel.toUpperCase(), {
      left: 80,
      top: 200,
      width: 920,
      fill: accentColor,
      fontFamily: 'DM Mono',
      fontSize: 24
    }));
  }

  canvas.add(new Rect({ left: 0, top: 0, width: 8, height: 1080, fill: accentColor }));

  const logo = await FabricImage.fromURL(params.logoUrl);
  logo.scaleToWidth(160);
  logo.left = 80;
  logo.top = 920;
  canvas.add(logo);

  canvas.add(new Textbox(`${params.slideIndex + 1}/6`, {
    left: 950,
    top: 1000,
    fill: accentColor,
    fontFamily: 'DM Mono',
    fontSize: 20
  }));

  return await new Promise((resolve, reject) => {
    canvas.getElement().toBlob((blob) => {
      if (!blob) {
        reject(new Error('Failed to generate PNG blob.'));
        return;
      }
      resolve(blob);
      canvas.dispose();
    }, 'image/png');
  });
}
