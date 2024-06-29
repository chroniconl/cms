import { Text } from '@/components/ui/text'
import { Heading } from '@/components/ui/heading'
import NewDocumentButton from './_posts_components/NewDocumentButton'
import CategoryFilterOptionOnServer from './_posts_components/CategoryFilterOption.server'
import { getPostsAction } from './_posts_utils/getPostsAction'
import PostsList from './_posts_components/PostsList'

export default async function PostsPage() {
  const data = await getPostsAction()

  return (
    <>
      <section className="mb-20 grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <Heading>Your Posts</Heading>
          <Text>
            Here you can view all the posts you have created and manage their
            settings.
          </Text>
        </div>
        <div className="col-span-12 flex gap-2 md:col-span-6 md:justify-end">
          <NewDocumentButton url={process.env.NEXT_PUBLIC_SITE_URL as string} />
        </div>
      </section>
      <main className="grid grid-cols-12 gap-12">
        <section className="hidden md:col-span-4 md:block">
          <div className="sticky top-8 mb-16 space-y-4">
            <CategoryFilterOptionOnServer />
          </div>
        </section>
        <section className="col-span-12 md:col-span-8">
          <PostsList data={data} />
        </section>
      </main>
    </>
  )
}
