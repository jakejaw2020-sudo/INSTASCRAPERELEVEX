import { useMemo, useState } from 'react';
import AssetGrid from '@/components/assets/AssetGrid';
import AssetUploader from '@/components/assets/AssetUploader';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import type { BrandAsset } from '@/types';

const tabs = [
  ['All', 'all'],
  ['Logos', 'logo'],
  ['Backgrounds', 'template_bg'],
  ['Colors', 'color_palette'],
  ['Icons', 'icon']
] as const;

export default function AssetsPage(): JSX.Element {
  const [assets, setAssets] = useState<BrandAsset[]>([]);
  const [filter, setFilter] = useState<(typeof tabs)[number][1]>('all');
  const [colorHex, setColorHex] = useState('#C8FF00');
  const [colorName, setColorName] = useState('Accent Lime');

  const filtered = useMemo(() => filter === 'all' ? assets : assets.filter((asset) => asset.type === filter), [assets, filter]);

  return (
    <div className="grid h-full grid-cols-[200px_1fr] gap-3 p-3">
      <aside className="space-y-2 rounded-md border border-[#222] p-3">
        {tabs.map(([label, value]) => (
          <Button key={value} className="w-full" onClick={() => setFilter(value)}>{label}</Button>
        ))}
      </aside>
      <section className="space-y-3 rounded-md border border-[#222] p-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-sm">Brand Asset Library</h2>
          <AssetUploader onUpload={async () => {
            const files = await window.electronAPI.openFilePicker({ properties: ['openFile'], filters: [{ name: 'Assets', extensions: ['png', 'jpg', 'jpeg', 'svg'] }] });
            if (files[0]) {
              setAssets((prev) => [...prev, {
                id: crypto.randomUUID(),
                name: files[0].split('/').pop() ?? 'asset',
                type: 'other',
                file_path: files[0],
                public_url: null,
                metadata: {},
                is_active: true,
                is_primary: false,
                created_at: new Date().toISOString()
              }]);
            }
          }} />
        </div>

        <div className="rounded-md border border-[#222] p-3">
          <h3 className="mb-2 text-xs text-[var(--text-secondary)]">Add brand color</h3>
          <div className="flex gap-2">
            <Input value={colorHex} onChange={(event) => setColorHex(event.target.value)} />
            <Input value={colorName} onChange={(event) => setColorName(event.target.value)} />
            <Button onClick={() => setAssets((prev) => [...prev, {
              id: crypto.randomUUID(),
              name: colorName,
              type: 'color_palette',
              file_path: null,
              public_url: null,
              metadata: { hex: colorHex, name: colorName },
              is_active: true,
              is_primary: prev.filter((entry) => entry.type === 'color_palette').length === 0,
              created_at: new Date().toISOString()
            }])}>Add</Button>
          </div>
        </div>

        <AssetGrid assets={filtered} />
      </section>
    </div>
  );
}
