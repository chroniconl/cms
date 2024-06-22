import { Categories } from "@/components/general/Categories";
import { Time } from "@/components/general/Time";
import Header from "@/components/general/header/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { ClientImage } from "@/components/ui/image";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { formatToPST } from "@/utils/dates";
import { formatTimestampToSlug } from "@/utils/formatTimestampToSlug";
import { supabase } from "@/utils/supabase";
import Link from "next/link";

export default async function Page() {
  const { data: headlinePost, error: headlinePostError } = await supabase
    .from("posts")
    .select("*, category:categories(id, name, slug, color)")
    .eq("visibility", "public")
    .eq("headline_post", true)
    .single();

  if (headlinePostError) {
    console.error(headlinePostError);
    return <div>Error fetching post</div>;
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*, category:categories(id, name, slug, color)")
    .order("created_at", { ascending: false });

  // .eq("visibility", "public")
  // .lt("publish_date", new Date().toISOString())
  // .order("publish_date", { ascending: false })

  if (error) {
    throw Error();
  }
  // console.log(data[0])
  // console.log(data.find((post) => post.publish_date_day))
  // console.log(data.find((post) => post.publish_date_time))
  // const headlinePost = data.find((post) => post.headline_post);

  return (
    <>
      <Header />

      <div className="grid grid-cols-12 gap-8 px-[10px] md:px-[20px] lg:px-[40px] my-8">
        <main className="col-span-12 lg:col-span-9">
          <section className="mb-6 md:mb-10 lg:mb-16">
            <article className="group bg-secondary px-2.5 pt-3 pb-6 md:p-4 shadow-md rounded-md">
              <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-md shadow-md">
                <ClientImage
                  src={headlinePost?.image_url}
                  alt={headlinePost?.image_alt}
                  className="object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="mt-4 flex flex-col justify-between group-hover:opacity-75">
                <div>
                  <Heading className="text-lg font-bold text-stone-900">
                    <Link
                      href={`/blog/${formatToPST(
                        headlinePost?.publish_date_day,
                      )}/${headlinePost?.slug}`}
                      prefetch={false}
                    >
                      {headlinePost?.title}
                    </Link>
                  </Heading>
                  <Text className="mt-2 text-sm text-stone-500 line-clamp-3">
                    {headlinePost?.description?.slice(0, 200)}
                  </Text>
                </div>
                <div className="mt-3 flex items-center text-sm">
                  <Time date={headlinePost?.publish_date_day} />
                  <Badge color={headlinePost?.category?.color}>
                    {headlinePost?.category?.name}
                  </Badge>
                </div>
              </div>
            </article>
          </section>
          <section className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data?.map((post, i) => (
              <Link
                key={post.id}
                href={`/blog/${formatTimestampToSlug(post.publish_date)}/${
                  post.slug
                }`}
              >
                <article key={post.id} className="group">
                  <ClientImage src={post.image_url} alt={post.image_alt} />
                  <div className="mt-4 flex flex-col justify-between">
                    <div>
                      <Heading className="text-base font-bold text-stone-900">
                        {post.title}
                      </Heading>
                      <Text
                        className="mt-2 text-sm text-stone-500 line-clamp-2"
                        small
                      >
                        {post?.description?.slice(0, 200)}
                      </Text>
                    </div>
                    <div className="mt-3 flex items-center text-sm">
                      <Badge color={post.category?.color}>
                        {post.category?.name}
                      </Badge>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </section>
        </main>
        <aside className="lg:col-span-3 hidden lg:block">
          <div className="sticky top-8 space-y-4 mb-16">
            <Categories />
            <div className="rounded-md bg-secondary p-4 shadow-md mt-4">
              <h3 className="text-lg font-bold">Search</h3>
              <div className="mt-2">
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="w-full"
                />
              </div>
            </div>
            <div className="rounded-md bg-secondary p-4 shadow-md mt-4">
              <h3 className="text-lg font-bold">Featured</h3>
              <div className="mt-4 space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="group">
                    <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-md bg-stone-200 shadow-md">
                      <img
                        src="/placeholder.svg"
                        alt="Featured Article Thumbnail"
                        width={320}
                        height={180}
                        className="object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <div className="mt-2">
                      <Heading level={4} className="text-sm font-bold">
                        <Link href="#" prefetch={false}>
                          New Study Shows Benefits of Exercise for Mental Health
                        </Link>
                      </Heading>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-md bg-secondary p-4 shadow-md mt-4">
              <Heading className="text-lg font-bold">Newsletter</Heading>
              <Text className="mt-2" small>
                Subscribe to our newsletter to receive the latest news and
                updates.
              </Text>
              <div className="mt-4">
                <Input
                  type="email-address"
                  placeholder="Enter your email"
                  className="w-full"
                />
                <Button className="mt-2 w-full">Subscribe</Button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
