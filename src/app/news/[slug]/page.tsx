import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllArticlesFromSupabase,
  getArticleBySlugFromSupabase,
  getRelatedArticlesFromSupabase,
  getPrevNextArticlesFromSupabase,
} from "@/lib/news";
import { ArticleView } from "./ArticleView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generación estática de parámetros para prerenderizado ultrarrápido
 */
export async function generateStaticParams() {
  const articles = await getAllArticlesFromSupabase();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

/**
 * Generación de Metadata Dinámica para SEO (Google Indexing, Open Graph, Twitter Cards)
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlugFromSupabase(slug);

  if (!article) {
    return {
      title: "Artículo no encontrado | EIP & Associates",
    };
  }

  const siteUrl = "https://eippanamalawyers.net";
  const pageUrl = `${siteUrl}/news/${article.slug}`;

  return {
    title: `${article.title} | EIP & Associates Panamá`,
    description: article.summary,
    keywords: [
      article.category,
      "Abogados Panamá",
      "Derecho Panamá",
      "Residencia Panamá",
      "Inversión Panamá",
    ],
    authors: [{ name: article.author.name }],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: article.title,
      description: article.summary,
      url: pageUrl,
      siteName: "EIP & Associates",
      images: [
        {
          url: article.imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: "es_PA",
      type: "article",
      publishedTime: article.isoDate,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary,
      images: [article.imageUrl],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlugFromSupabase(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticlesFromSupabase(article, 3);
  const { prev, next } = await getPrevNextArticlesFromSupabase(article);

  return (
    <ArticleView
      article={article}
      relatedArticles={relatedArticles}
      prevArticle={prev}
      nextArticle={next}
    />
  );
}
