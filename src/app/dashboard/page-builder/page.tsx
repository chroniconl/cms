import { getAllPublishedPosts } from '@/server/getAllPublishedPosts'
import { SortableApp } from './components/SortableApp'
import { SortableAppContext } from './components/SortableAppContext'
import { v4 as uuidv4 } from 'uuid'

const Page = async () => {
  const posts = await getAllPublishedPosts()
  const uuids = Array.from({ length: posts.length }).map((_) => uuidv4())
  return (
    <div className="px-4">
      <SortableAppContext>
        <SortableApp posts={posts} skeletonKeys={uuids} />
      </SortableAppContext>
    </div>
  )
}

export default Page
