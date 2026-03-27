import Button from '@/components/ui/Button';

export default function ApprovalActions(): JSX.Element {
  return (
    <div className="flex gap-2">
      <Button>Approve</Button>
      <Button>Publish Now</Button>
      <Button>Delete</Button>
    </div>
  );
}
