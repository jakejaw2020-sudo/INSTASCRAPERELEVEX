import Input from '@/components/ui/Input';

export default function SlideEditor(): JSX.Element {
  return (
    <div className="space-y-2">
      <Input placeholder="Headline" />
      <Input placeholder="Body copy" />
    </div>
  );
}
