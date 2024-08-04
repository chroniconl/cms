import PublicLayout from '@/components/PublicLayout'
import TrendingRepos from './__explore_components/TrendingRepos'

export default async function Page() {
	return (
		<PublicLayout>
			<div className="mx-auto w-fit">
				<div className="px-4">
					<h1 className="ch-heading ch-primary">Explore</h1>
					<p className="ch-body ch-muted mt-4">
						Check out the latest trends and discover what's happening in the
						world of software development.
					</p>
				</div>
				<TrendingRepos />
			</div>
		</PublicLayout>
	)
}
