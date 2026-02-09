import { PostCard } from './PostCard';
import { StaggerGrid } from '@/components/ui/StaggerGrid';
import type { Post } from '@/lib/types';

interface PostGridProps {
  posts: Post[];
  className?: string;
  columns?: 2 | 3;
}

export function PostGrid({ posts, className, columns = 3 }: PostGridProps) {
  return (
    <StaggerGrid className={className} columns={columns}>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </StaggerGrid>
  );
}

