import { getAllPublishedPosts } from '@/server/getAllPublishedPosts'
import { v4 as uuidv4 } from 'uuid'
import ArticleGroupsOverview from './components/Landing'

const Page = async () => {
  // const articles = await getAllPublishedPosts()
  // const uuids = Array.from({ length: articles.length }).map(
  //   (_) => 'skel_' + uuidv4(),
  // )
  return <ArticleGroupsOverview />
}

export default Page
