import Button from '@/components/ui/Button';

export default function AssetUploader({ onUpload }: { onUpload: () => Promise<void> }): JSX.Element {
  return <Button onClick={onUpload}>Upload</Button>;
}
