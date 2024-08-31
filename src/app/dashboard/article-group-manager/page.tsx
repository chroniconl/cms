import ArticleGroupsOverview from './components/Landing'
import { getAllArticleGroups } from '@/server/getAllArticleGroups'

const Page = async () => {
  const articleGroups = await getAllArticleGroups()

  const fixedArticleGroups = articleGroups.map((group) => ({
    ...group,
    articles: JSON.parse(JSON.stringify(group.articles)),
  }))

  return <ArticleGroupsOverview articleGroups={fixedArticleGroups} />
}

export default Page
