import Image from "next/image";
import type { Article } from "@/lib/webflow";

function timeAgo(dateString: string): string {
  const now = Date.now();
  const then = new Date(dateString).getTime();
  const seconds = Math.floor((now - then) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

export default function ArticleCard({
  article,
  position,
}: {
  article: Article;
  position: number;
}) {
  return (
    <a
      href={`https://thecatholicherald.com/${article.slug}?utm_source=linkinbio&utm_medium=social&utm_content=pos_${position}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-3 py-3 hover:bg-white/60 transition-colors rounded-md"
    >
      {article.imageUrl && (
        <div className="relative w-28 flex-shrink-0 rounded-md overflow-hidden bg-[#dadada] aspect-[1.91/1]">
          <Image
            src={article.imageUrl}
            alt={article.name}
            fill
            className="object-cover"
            sizes="112px"
          />
        </div>
      )}
      <div className="flex flex-col justify-center min-w-0 flex-1">
        <h2 className="font-serif text-[15px] font-semibold leading-tight text-[#222] line-clamp-3">
          {article.name}
        </h2>
        <span className="text-xs text-[#7a7979] mt-1">
          {timeAgo(article.publishingDate)}
        </span>
      </div>
    </a>
  );
}
