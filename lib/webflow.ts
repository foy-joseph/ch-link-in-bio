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

const COLLECTION_ID = "683ed37ff077394405011d03";
const MAGAZINES_COLLECTION_ID = "683ed37ff077394405011ce2";

export async function getLatestArticles(limit = 30): Promise<Article[]> {
  const res = await fetch(
    `https://api.webflow.com/v2/collections/${COLLECTION_ID}/items?limit=${limit}&sortBy=lastPublished&sortOrder=desc`,
    {
      headers: {
        Authorization: `Bearer ${process.env.WEBFLOW_API_TOKEN}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Webflow API error: ${res.status}`);
  }

  const data = await res.json();

  const articles: Article[] = data.items.map((item: any) => ({
    id: item.id,
    name: item.fieldData.name,
    slug: item.fieldData.slug,
    imageUrl: item.fieldData["article-image"]?.url ?? null,
    summary: item.fieldData["short-summary"] ?? "",
    publishingDate: item.fieldData["publishing-date"],
  }));

  // Sort by publishing-date descending so list order matches the "Xh ago" display
  articles.sort(
    (a, b) =>
      new Date(b.publishingDate).getTime() -
      new Date(a.publishingDate).getTime()
  );

  return articles;
}

export async function getCurrentMagazine(): Promise<Magazine | null> {
  const res = await fetch(
    `https://api.webflow.com/v2/collections/${MAGAZINES_COLLECTION_ID}/items?limit=1&sortBy=createdOn&sortOrder=desc`,
    {
      headers: {
        Authorization: `Bearer ${process.env.WEBFLOW_API_TOKEN}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Webflow API error: ${res.status}`);
  }

  const data = await res.json();
  const item = data.items?.[0];
  if (!item) return null;

  const cover = item.fieldData["magazine-cover-image"];
  return {
    id: item.id,
    name: item.fieldData.name,
    slug: item.fieldData.slug,
    coverImageUrl: cover?.url ?? null,
    coverImageAlt: cover?.alt ?? null,
  };
}
