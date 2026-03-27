export default function SlideCanvas({ imageUrl }: { imageUrl?: string }): JSX.Element {
  return <div className="h-[560px] rounded-md border border-[#222] bg-[var(--bg-elevated)]">{imageUrl ? <img src={imageUrl} className="h-full w-full object-contain" /> : null}</div>;
}
