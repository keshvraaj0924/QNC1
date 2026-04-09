import { adminApi } from '@/services/adminApi';
import HomeContent from './HomeContent';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  let content = null;
  // Temporarily disabled for Design Approval phase
  /*
  try {
    content = await adminApi.getPublicContent();
  } catch (err) {
    console.error('Failed to fetch homepage content:', err);
  }
  */

  return <HomeContent content={content} />;
}
