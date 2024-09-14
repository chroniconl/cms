import { getAllPublishedPosts } from '@/server/getAllPublishedPosts'
import { getArticleGroup } from '@/server/getArticleGroup'
import { SortableApp } from './components/SortableApp'
import { SortableAppContext } from './components/SortableAppContext'
import { v4 as uuidv4 } from 'uuid'
import { Check } from 'lucide-react'

const Page = async ({ params }: { params: { group: string } }) => {
  if (!params.group) {
    throw new Error('No group provided')
  }
  const articleGroup = await getArticleGroup(params.group)

  console.log(articleGroup)
  // TODO: Move this to an API endpoint
  const articles = await getAllPublishedPosts()
  const uuids = Array.from({ length: articles.length }).map(
    (_) => 'skel_' + uuidv4(),
  )

  return (
    <SortableAppContext>
      <SortableApp
        articles={articles}
        skeletonKeys={uuids}
        articleGroup={articleGroup}
      />
    </SortableAppContext>
  )
}

export default Page
