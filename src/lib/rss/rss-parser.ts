import Parser from "rss-parser";

export interface ParsedRssItem {
  guid: string;
  title: string;
  link: string;
  pubDate?: string;
  isoDate?: string;
  creator?: string;
  author?: string;
  summary?: string;
  content?: string;
  contentSnippet?: string;
  categories?: string[];
  category?: string;
  imageUrl?: string;
}

export interface ParsedRssFeed {
  title?: string;
  description?: string;
  link?: string;
  items: ParsedRssItem[];
}

/**
 * Descarga y parsea el XML del feed RSS oficial de Soro AI.
 */
export async function parseRssFeed(feedUrl: string): Promise<ParsedRssFeed> {
  const parser = new Parser({
    customFields: {
      item: [
        ["media:content", "mediaContent", { keepArray: false }],
        ["media:thumbnail", "mediaThumbnail", { keepArray: false }],
        ["content:encoded", "contentEncoded"],
        ["dc:creator", "creator"],
        ["category", "categoryRaw"],
      ],
    },
  });

  // Realizar fetch con timeout y User-Agent
  const response = await fetch(feedUrl, {
    headers: {
      "User-Agent": "EIP-Associates-RSSSync/1.0 (+https://eippanamalawyers.net)",
      Accept: "application/rss+xml, application/xml, text/xml, */*",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`HTTP Error ${response.status} ${response.statusText}: ${errorText.slice(0, 100)}`);
  }

  const xmlText = await response.text();
  const feed = await parser.parseString(xmlText);

  const items: ParsedRssItem[] = (feed.items || []).map((item: any) => {
    // Extraer imagen destacada si existe en mediaContent, mediaThumbnail, enclosure o tag img en content
    let imageUrl = "";
    if (item.mediaContent && item.mediaContent.$ && item.mediaContent.$.url) {
      imageUrl = item.mediaContent.$.url;
    } else if (item.mediaThumbnail && item.mediaThumbnail.$ && item.mediaThumbnail.$.url) {
      imageUrl = item.mediaThumbnail.$.url;
    } else if (item.enclosure && item.enclosure.url && item.enclosure.type?.startsWith("image/")) {
      imageUrl = item.enclosure.url;
    } else {
      const match = (item.contentEncoded || item.content || "").match(/<img[^>]+src=["']([^"']+)["']/i);
      if (match && match[1]) {
        imageUrl = match[1];
      }
    }

    // Extraer categoría
    let category = "Noticias Legales";
    if (Array.isArray(item.categories) && item.categories.length > 0) {
      category = typeof item.categories[0] === "string" ? item.categories[0] : item.categories[0]._ || category;
    } else if (item.categoryRaw) {
      category = typeof item.categoryRaw === "string" ? item.categoryRaw : item.categoryRaw._ || category;
    }

    const guid = item.guid || item.id || item.link || item.title;

    return {
      guid: String(guid),
      title: item.title || "Publicación Legal",
      link: item.link || "",
      pubDate: item.pubDate,
      isoDate: item.isoDate || (item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString()),
      creator: item.creator || item.author || "Soro AI / EIP & Associates",
      author: item.author || item.creator || "Soro AI / EIP & Associates",
      summary: item.summary || item.contentSnippet || "",
      content: item.contentEncoded || item.content || item.summary || item.contentSnippet || "",
      contentSnippet: item.contentSnippet || "",
      categories: Array.isArray(item.categories) ? item.categories : [category],
      category,
      imageUrl,
    };
  });

  return {
    title: feed.title,
    description: feed.description,
    link: feed.link,
    items,
  };
}
