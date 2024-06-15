// Next.JS Crawl Budget Performance Updates
// Block files ending in .json, _buildManifest.js, _middlewareManifest.js, _ssgManifest.js, and any other JS files
// The asterisks allows any file name
// The dollar sign ensures it only matches the end of an URL and not a oddly formatted url (e.g. /locations.json.html)
const disallow = `
	Disallow: /*.json$
	Disallow: /*_buildManifest.js$
	Disallow: /*_middlewareManifest.js$
	Disallow: /*_ssgManifest.js$
	Disallow: /*.js$

	Disallow: /api/
	Disallow: /console/
	Disallow: /web-tools/
`;

export async function GET() {
	const robotsTxt = `User-agent: *

		${disallow}

		Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml
	`;

	return new Response(robotsTxt.replace(/^\s+/gm, ""), {
		status: 200,
		headers: {
			"content-type": "text/plain; charset=utf-8",
			"cache-control": "s-maxage=31556952",
		},
	});
}
