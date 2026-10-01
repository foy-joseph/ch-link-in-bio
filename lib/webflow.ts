// The newest articles and the current issue, read from the Catholic Herald
// site's own feed (thecatholicherald.com/api/link-in-bio). This file used to
// call the Webflow CMS API; Webflow closed on 1 Oct 2026. The shapes below are
// unchanged so the page did not have to be.
export interface Article {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  summary: string;
  publishingDate: string;
}

export interface Magazine {
  id: string;
  name: string;
  slug: string;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
}

const FEED_URL = `${process.env.NEXT_PUBLIC_SITE_URL || "https://thecatholicherald.com"}/api/link-in-bio`;

async function feed(): Promise<{ articles: Article[]; magazine: Magazine | null }> {
  const res = await fetch(FEED_URL, { next: { revalidate: 300 } });
  if (!res.ok) {
    throw new Error(`Catholic Herald feed error: ${res.status}`);
  }
  return res.json();
}

export async function getLatestArticles(limit = 30): Promise<Article[]> {
  const { articles } = await feed();
  return articles
    .slice()
    .sort((a, b) => new Date(b.publishingDate).getTime() - new Date(a.publishingDate).getTime())
    .slice(0, limit);
}

export async function getCurrentMagazine(): Promise<Magazine | null> {
  const { magazine } = await feed();
  return magazine;
}
