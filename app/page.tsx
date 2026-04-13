import { getLatestArticles } from "@/lib/webflow";
import ArticleCard from "@/components/ArticleCard";
import NewsletterForm from "@/components/NewsletterForm";

export const revalidate = 300;

export default async function Home() {
  const articles = await getLatestArticles(50);

  return (
    <div className="min-h-dvh flex flex-col max-w-lg mx-auto w-full">
      {/* Header */}
      <header className="flex flex-col items-center pt-8 pb-2 px-4">
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
        <p className="text-[#7a7979] text-xs mt-1 mb-4">
          Get the daily newsletter
        </p>
      </header>

      {/* Newsletter signup */}
      <NewsletterForm />

      {/* Divider */}
      <div className="px-4 pb-2 pt-1">
        <div className="border-t border-[#dadada]" />
        <p className="text-[10px] uppercase tracking-widest text-[#7a7979] text-center mt-3 mb-1">
          Latest stories
        </p>
      </div>

      {/* Articles list */}
      <main className="flex-1 px-4">
        <div className="divide-y divide-[#dadada]">
          {articles.map((article, i) => (
            <ArticleCard key={article.id} article={article} position={i + 1} />
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
