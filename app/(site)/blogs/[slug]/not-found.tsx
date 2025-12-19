import { NotFound, Icon } from '@/components/ui';
import { ROUTES } from '@/lib/constants';
import { getSiteConfig } from '@/lib/hygraph';

export default async function PostNotFound() {
  const siteConfig = await getSiteConfig();
  return (
    <NotFound
      title="Post Not Found"
      message="The piece you're looking for seems to have wandered off into the literary ether."
      showHomeButton={false}
      siteName={siteConfig.siteName}
      primaryAction={{
        label: 'Back to Anthology',
        href: ROUTES.BLOGS,
        icon: <Icon name="arrowLeft" size={14} />,
      }}
    />
  );
}
