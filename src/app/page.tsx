import BlogPostsGroup from "@/components/general/BlogPostsGroup";
import PublicLayout from "@/components/general/PublicLayout";
import { getAllPublishedPosts } from "@/server/getAllPublishedPosts";

export default async function Page() {
  const posts = await getAllPublishedPosts();

  return (
    <PublicLayout>
      <BlogPostsGroup posts={posts} />
    </PublicLayout>
  );
}
