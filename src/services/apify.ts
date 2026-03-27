import axios from 'axios';
import type { ApifyResult } from '@/types';

const APIFY_BASE_URL = 'https://api.apify.com/v2';

export async function scrapeInstagramUrl(url: string, apifyToken: string): Promise<ApifyResult[]> {
  const runResponse = await axios.post(
    `${APIFY_BASE_URL}/acts/apify~instagram-scraper/runs`,
    {
      directUrls: [url],
      resultsType: 'posts',
      resultsLimit: 5,
      addParentData: true
    },
    { params: { token: apifyToken } }
  );

  const runId: string = runResponse.data.data.id;
  const startedAt = Date.now();

  while (Date.now() - startedAt < 120000) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const statusResponse = await axios.get(`${APIFY_BASE_URL}/actor-runs/${runId}`, { params: { token: apifyToken } });
    const status: string = statusResponse.data.data.status;

    if (status === 'SUCCEEDED') {
      const datasetId: string = statusResponse.data.data.defaultDatasetId;
      const results = await axios.get(`${APIFY_BASE_URL}/datasets/${datasetId}/items`, { params: { token: apifyToken } });
      return results.data as ApifyResult[];
    }

    if (status === 'FAILED' || status === 'ABORTED') {
      throw new Error('Scraping failed.');
    }
  }

  throw new Error('Scraping timed out. The account may be private or the URL may be invalid.');
}
