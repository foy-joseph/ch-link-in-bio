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

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <a
      href={`https://thecatholicherald.com/article/${article.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
    >
      {article.imageUrl && (
        <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-white/10">
          <Image
            src={article.imageUrl}
            alt={article.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      )}
      <div className="flex flex-col justify-center min-w-0 flex-1">
        <h2 className="text-[15px] font-semibold leading-tight text-white line-clamp-3">
          {article.name}
        </h2>
        <span className="text-xs text-white/50 mt-1">
          {timeAgo(article.publishingDate)}
        </span>
      </div>
    </a>
  );
}
