import { newsData } from '@/data/newsData';
import { notFound } from 'next/navigation';
import NewsArticleClient from './NewsArticleClient';

export async function generateStaticParams() {
  return newsData.map((news) => ({
    id: news.slug,
  }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const newsItem = newsData.find((n) => n.slug === id);

  if (!newsItem) {
    notFound();
  }

  return <NewsArticleClient newsItem={newsItem} />;
}
