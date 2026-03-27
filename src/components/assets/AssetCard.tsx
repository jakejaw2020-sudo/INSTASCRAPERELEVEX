import type { BrandAsset } from '@/types';
import Badge from '@/components/ui/Badge';
import StatusDot from '@/components/ui/StatusDot';

export default function AssetCard({ asset }: { asset: BrandAsset }): JSX.Element {
  return (
    <div className="space-y-2 rounded-md border border-[#222] bg-[var(--bg-elevated)] p-3">
      {asset.public_url ? <img src={asset.public_url} alt={asset.name} className="h-24 w-full rounded-md object-cover" /> : <div className="h-24 rounded-md border border-dashed border-[#222]" />}
      <div className="flex items-center justify-between">
        <span className="text-sm">{asset.name}</span>
        {asset.is_primary && <StatusDot color="green" />}
      </div>
      <Badge>{asset.type}</Badge>
    </div>
  );
}
