import { getAllPublishedPosts } from "@/server/getAllPublishedPosts";
import { formatTimestampToSlug } from "@/utils/formatTimestampToSlug";
function escapeXML(str) {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}
export async function GET(req) {
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

	if (!siteUrl) {
		// 404 error
		return new Response("Not found", {
			status: 404,
		});
	}

	const posts = await getAllPublishedPosts();

	const feed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>My Blog</title>
      <link>${siteUrl}</link>
      <description>This is my blog's RSS feed</description>
      <language>en-us</language>
      <pubDate>${new Date().toUTCString()}</pubDate>
      ${posts
			.map((post) => {
				const postUrl = `${siteUrl}/blog/${formatTimestampToSlug(post.publish_date_day)}/${post.slug}`;
				const pubDate = new Date(post.publish_date_day).toUTCString();
				const postDescription = escapeXML(post.description);
				return `
            <item>
              <title>${post.title}</title>
              <link>${postUrl}</link>
              <description>${postDescription}</description>
              <pubDate>${pubDate}</pubDate>
              <guid>${postUrl}</guid>
            </item>
          `;
			})
			.join("")}
    </channel>
  </rss>`;

	return new Response(feed, {
		status: 200,
		headers: {
			"content-type": "application/xml",
			"cache-control": "s-maxage=31556952",
		},
	});
}