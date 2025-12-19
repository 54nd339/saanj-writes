import { NotFound } from '@/components/ui';
import { getSiteConfig } from '@/lib/hygraph';

export default async function GlobalNotFound() {
  const siteConfig = await getSiteConfig();
  return <NotFound siteName={siteConfig.siteName} />;
}
