import axios from 'axios';
import type { CarouselSlide } from '@/types';

export async function publishCarousel(params: {
  slides: CarouselSlide[];
  caption: string;
  instagramUserId: string;
  accessToken: string;
}): Promise<string> {
  const containerIds: string[] = [];

  for (const slide of params.slides) {
    const response = await axios.post(`https://graph.facebook.com/v19.0/${params.instagramUserId}/media`, {
      image_url: slide.final_image_url,
      is_carousel_item: true,
      access_token: params.accessToken
    });
    containerIds.push(response.data.id as string);
  }

  const carouselResponse = await axios.post(`https://graph.facebook.com/v19.0/${params.instagramUserId}/media`, {
    media_type: 'CAROUSEL',
    children: containerIds.join(','),
    caption: params.caption,
    access_token: params.accessToken
  });

  const publishResponse = await axios.post(`https://graph.facebook.com/v19.0/${params.instagramUserId}/media_publish`, {
    creation_id: carouselResponse.data.id,
    access_token: params.accessToken
  });

  return publishResponse.data.id as string;
}
