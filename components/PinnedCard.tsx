import Image from "next/image";

export default function PinnedCard({
  title,
  imageUrl,
  href,
  label = "Featured",
}: {
  title: string;
  imageUrl: string;
  href: string;
  label?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="flex gap-3 py-3 hover:bg-white/60 transition-colors rounded-md"
    >
      <div className="relative w-28 flex-shrink-0 overflow-hidden bg-[#dadada] aspect-[1.91/1]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="112px"
        />
      </div>
      <div className="flex flex-col justify-center min-w-0 flex-1">
        <span className="text-[10px] uppercase tracking-widest text-[#db3334] font-semibold mb-1">
          {label}
        </span>
        <h2 className="font-serif text-[15px] font-semibold leading-tight text-[#222] line-clamp-3">
          {title}
        </h2>
      </div>
    </a>
  );
}
