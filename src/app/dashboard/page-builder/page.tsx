import { getAllPublishedPosts } from '@/server/getAllPublishedPosts'
import { SortableApp } from './components/SortableApp'
import { SortableAppContext } from './components/SortableAppContext'
import { v4 as uuidv4 } from 'uuid'

const Page = async () => {
  const articles = await getAllPublishedPosts()
  const uuids = Array.from({ length: articles.length }).map((_) => uuidv4())
  return (
    <div className="px-4">
      <SortableAppContext>
        <SortableApp articles={articles} skeletonKeys={uuids} />
      </SortableAppContext>
    </div>
  )
}

export default Page
