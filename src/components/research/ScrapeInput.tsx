import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function ScrapeInput({ onScrape }: { onScrape: (url: string) => Promise<void> }): JSX.Element {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-3">
      <Input placeholder="https://instagram.com/p/..." value={url} onChange={(event) => setUrl(event.target.value)} />
      <Button
        disabled={!url || loading}
        onClick={async () => {
          setLoading(true);
          try {
            await onScrape(url);
          } finally {
            setLoading(false);
          }
        }}
      >
        {loading ? 'Scraping...' : 'Scrape'}
      </Button>
    </div>
  );
}
