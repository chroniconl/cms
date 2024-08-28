import { getAllPublishedPosts } from '@/server/getAllPublishedPosts'
import { SortableApp } from './components/SortableApp'
import { SortableAppContext } from './components/SortableAppContext'
import { v4 as uuidv4 } from 'uuid'
import { Check } from 'lucide-react'

const Page = async () => {
  const articles = await getAllPublishedPosts()
  const uuids = Array.from({ length: articles.length }).map(
    (_) => 'skel_' + uuidv4(),
  )
  return (
    <div className="flex">
      {/* <div className="flex flex-col gap-2">
        <h2>Choose a feature</h2>
        <ul className="flex flex-col gap-2">
          <li className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-teal-700 text-sm text-white shadow-sm shadow-teal-600 dark:border-teal-600">
              <Check className="h-5 w-5 text-teal-400" />
            </div>
            <p className="text-sm font-medium">Page Builder</p>
          </li>
          <li className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-teal-700 text-sm text-white shadow-sm shadow-teal-600 dark:border-teal-600">
              <Check className="h-5 w-5 text-teal-400" />
            </div>
            <p className="text-sm font-medium">Media Gallery</p>
          </li>
          <li className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-teal-700 text-sm text-white shadow-sm shadow-teal-600 dark:border-teal-600">
              <Check className="h-5 w-5 text-teal-400" />
            </div>
            <p className="text-sm font-medium">Log Manager</p>
          </li>
        </ul>
      </div> */}
      <SortableAppContext>
        <SortableApp articles={articles} skeletonKeys={uuids} />
      </SortableAppContext>
    </div>
  )
}

export default Page
