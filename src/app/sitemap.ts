import { getAllPublishedPosts } from "@/server/getAllPublishedPosts";
import { formatTimestampToSlug } from "@/utils/formatTimestampToSlug";
import type { MetadataRoute } from "next";

const url = process.env.NEXT_PUBLIC_SITE_URL;

export default async function sitemap() {
  const posts = await getAllPublishedPosts();
  const staticPaths = [
    {
      url: `${url}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];

  const dynamicPaths = posts.map((post) => {
    const lastModified = post.updated_at
      ? new Date(post.updated_at).toISOString()
      : new Date().toISOString();
    return {
      url: `${url}/blog/${formatTimestampToSlug(post.publish_date_day)}/${
        post.slug
      }`,
      lastModified,
      changeFrequency: "weekly" as const, // Explicitly cast to the expected type
      priority: 0.5,
    };
  });

  return [...staticPaths, ...dynamicPaths];
}
