import Link from 'next/link'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@repo/ui/card'
import { Input } from '@repo/ui/input'
import PublicLayout from '@/components/PublicLayout'
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'
import Image from 'next/image'
import { ChButtonSecondaryMarketing } from '@repo/ui/button'

export default function About() {
  return (
    <PublicLayout>
      <div className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Chroniconl
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Hanging out on the technical side of entrepreneurship.
                  </p>
                </div>
              </div>
              <Image
                src="https://azhrbvulmwgxcijoaenn.supabase.co/storage/v1/object/public/my-blog/20240418_060049.jpg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  About the Blog
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Chroniconl is a tech blog dedicated to covering the latest
                  advancements in software. Our mission is to provide our
                  readers with in-depth analysis, insights, and trends shaping
                  the tech industry. From emerging technologies to industry
                  news, we aim to be a trusted source of information for tech
                  enthusiasts, professionals, and anyone interested in staying
                  up-to-date with the rapidly evolving world of technology.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  About the Author
                </h2>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/matthewbub.png"
                      alt="Author"
                    />
                    <AvatarFallback className="h-full w-full">
                      MB
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">Matthew Bub</h3>
                    <p className="text-muted-foreground">
                      Tech enthusiast and writer
                    </p>
                    <div className="mt-2 flex gap-2">
                      <Link
                        href="https://twitter.com/matthew_bub"
                        className="text-muted-foreground hover:underline"
                        prefetch={false}
                      >
                        <TwitterIcon className="h-5 w-5" />
                      </Link>
                      <Link
                        href="https://www.linkedin.com/in/matthewbub/"
                        className="text-muted-foreground hover:underline"
                        prefetch={false}
                      >
                        <LinkedinIcon className="h-5 w-5" />
                      </Link>
                      <Link
                        href="https://github.com/matthewbub/"
                        className="text-muted-foreground hover:underline"
                        prefetch={false}
                      >
                        <GithubIcon className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Matthew Bub is a tech enthusiast and writer with a passion for
                  exploring the latest advancements in technology. He has been
                  covering the tech industry for over 4 years, sharing his
                  insights and analysis on Chroniconl. When he's not writing,
                  you can find him tinkering with the latest gadgets or
                  exploring the world of emerging technologies.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Featured Articles
                </h2>
                <div className="grid gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        Just Enough Server React to Keep It Moving
                      </CardTitle>
                      {/* <CardDescription>
                        Exploring the latest advancements and potential
                        implications of AI technology.
                      </CardDescription> */}
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        React's server components haven't had the warmest
                        welcoming into the ecosystem. There's still a lot of
                        room for improvement in the developer experience, but
                        doesn't that technically make it a gold mine for React
                        developers?
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href="/blog/2024/07/16/just-enough-server-react-to-keep-it-moving"
                        className="text-primary hover:underline"
                        prefetch={false}
                      >
                        Read more
                      </Link>
                    </CardFooter>
                  </Card>
                  {/* <Card>
                    <CardHeader>
                      <CardTitle>
                        The Rise of 5G: Transforming the Digital Landscape
                      </CardTitle>
                      <CardDescription>
                        Examining the impact of 5G technology on connectivity,
                        speed, and the future of communication.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        The rollout of 5G technology has been a game-changer in
                        the world of communication. In this article, we explore
                        the capabilities of 5G, its potential applications, and
                        the ways it is transforming the digital landscape.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href="#"
                        className="text-primary hover:underline"
                        prefetch={false}
                      >
                        Read more
                      </Link>
                    </CardFooter>
                  </Card> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full border-t py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Stay Updated with Chroniconl
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Subscribe to our newsletter to receive the latest news,
                insights, and updates from the world of technology.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="max-w-lg flex-1"
                />
                <ChButtonSecondaryMarketing type="submit">
                  Subscribe
                </ChButtonSecondaryMarketing>
              </form>
              <p className="text-xs text-muted-foreground">
                We respect your privacy. Your email will never be shared with
                third parties.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  )
}
