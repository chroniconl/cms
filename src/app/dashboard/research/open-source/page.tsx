import TrendingRepos from './__explore_components/TrendingRepos'

export default async function Page() {
  return (
    <div className="mx-auto w-full">
      <div className="px-4">
        <h1 className="ch-heading ch-color-primary">Explore</h1>
        <p className="ch-body ch-color-secondary mt-4">
          Check out the latest trends and discover what's happening in the world
          of software development.
        </p>
      </div>
      <TrendingRepos />
    </div>
  )
}
