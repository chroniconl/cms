export async function GET(req) {
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

	if (!siteUrl) {
		// 404 error
		return new Response('Not found', {
			status: 404,
		});
	}

	return new Response('This page is actively being built', {
		status: 200,
		headers: {
			"content-type": "application/xml",
			"cache-control": "s-maxage=31556952",
		},
	});
}
