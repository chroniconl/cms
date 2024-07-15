export const fetchCache = 'force-no-store'

import { Text } from '@/components/text'
import { Heading } from '@/components/heading'
import NewDocumentButton from './_posts_components/NewDocumentButton'
import { getPostsAction } from './_posts_utils/getPostsAction'
import PostsList from './_posts_components/PostsList'

export default async function PostsPage() {
  const { clientSafeData, count } = await getPostsAction()

  if (!clientSafeData) {
    throw new Error('Error fetching posts')
  }

  return (
    <>
      <section className="mb-5 grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <Heading className="mb-2">Your Posts</Heading>
          <Text>
            Here you can view all the posts you have created and manage their
            settings.
          </Text>
        </div>
        <div className="col-span-12 flex gap-2 md:col-span-6 md:justify-end">
          <NewDocumentButton />
        </div>
      </section>
      <div className="grid grid-cols-12 gap-4">
        <section className="col-span-12">
          <PostsList data={clientSafeData} count={count} />
        </section>
      </div>
    </>
  )
}
