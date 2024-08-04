/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'source.unsplash.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'utfs.io',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'github.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'azhrbvulmwgxcijoaenn.supabase.co',
				port: '',
			},
		],
	},
}

export default nextConfig
