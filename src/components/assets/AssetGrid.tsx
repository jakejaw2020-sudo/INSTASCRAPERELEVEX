import type { BrandAsset } from '@/types';
import AssetCard from './AssetCard';

export default function AssetGrid({ assets }: { assets: BrandAsset[] }): JSX.Element {
  return <div className="grid grid-cols-3 gap-3">{assets.map((asset) => <AssetCard key={asset.id} asset={asset} />)}</div>;
}
