import { getLatestArticles } from "@/lib/webflow";
import ArticleCard from "@/components/ArticleCard";

export const revalidate = 300;

export default async function Home() {
  const articles = await getLatestArticles(50);

  return (
    <div className="min-h-dvh flex flex-col bg-[#111] max-w-lg mx-auto w-full">
      {/* Header */}
      <header className="flex flex-col items-center pt-8 pb-4 px-4">
        <div className="w-16 h-16 mb-3 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
          <img src="/ch-logo.jpg" alt="The Catholic Herald" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-white text-lg font-bold tracking-tight">
          The Catholic Herald
        </h1>
        <p className="text-white/50 text-sm mt-0.5">Latest stories</p>
      </header>

      {/* Subscribe CTA */}
      <div className="px-4 pb-3">
        <a
          href="https://thecatholicherald.com/subscribe"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 rounded-lg bg-[#c41e1e] text-white text-center text-sm font-semibold hover:bg-[#a81a1a] transition-colors"
        >
          Subscribe to The Catholic Herald
        </a>
      </div>

      {/* Articles list */}
      <main className="flex-1 px-1">
        <div className="divide-y divide-white/5">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center">
        <a
          href="https://thecatholicherald.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/30 text-xs hover:text-white/50 transition-colors"
        >
          thecatholicherald.com
        </a>
      </footer>
    </div>
  );
}
