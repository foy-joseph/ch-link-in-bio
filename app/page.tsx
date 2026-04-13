import Image from "next/image";
import { getLatestArticles } from "@/lib/webflow";
import ArticleCard from "@/components/ArticleCard";

export const revalidate = 300;

export default async function Home() {
  const articles = await getLatestArticles(50);
  const [featured, ...rest] = articles;

  return (
    <div className="min-h-dvh flex flex-col max-w-lg mx-auto w-full">
      {/* Header */}
      <header className="flex flex-col items-center pt-8 pb-4 px-4">
        <div className="w-16 h-16 mb-3 rounded-full overflow-hidden">
          <img
            src="/ch-logo.jpg"
            alt="The Catholic Herald"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="font-serif text-xl font-semibold tracking-tight text-[#222]">
          The Catholic Herald
        </h1>
        <p className="text-[#7a7979] text-sm mt-0.5">Latest stories</p>
      </header>

      {/* Subscribe CTA */}
      <div className="px-4 pb-4">
        <a
          href="https://thecatholicherald.com/subscribe?utm_source=linkinbio&utm_medium=social&utm_campaign=subscribe_cta"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 rounded-lg bg-[#db3334] text-white text-center text-sm font-semibold hover:bg-[#c42d2e] transition-colors"
        >
          Subscribe to The Catholic Herald
        </a>
      </div>

      {/* Featured article */}
      {featured && (
        <a
          href={`https://thecatholicherald.com/${featured.slug}?utm_source=linkinbio&utm_medium=social&utm_content=featured`}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-4 mb-4 block rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          {featured.imageUrl && (
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={featured.imageUrl}
                alt={featured.name}
                fill
                className="object-cover"
                sizes="(max-width: 512px) 100vw, 512px"
                priority
              />
            </div>
          )}
          <div className="p-4">
            <h2 className="font-serif text-lg font-semibold leading-snug text-[#222]">
              {featured.name}
            </h2>
            {featured.summary && (
              <p className="text-sm text-[#7a7979] mt-1.5 line-clamp-2">
                {featured.summary}
              </p>
            )}
          </div>
        </a>
      )}

      {/* Articles list */}
      <main className="flex-1 px-4">
        <div className="divide-y divide-[#dadada]">
          {rest.map((article, i) => (
            <ArticleCard key={article.id} article={article} position={i + 2} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center">
        <a
          href="https://thecatholicherald.com?utm_source=linkinbio&utm_medium=social"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#7a7979] text-xs hover:text-[#222] transition-colors"
        >
          thecatholicherald.com
        </a>
      </footer>
    </div>
  );
}
