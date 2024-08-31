'use client'
import React from 'react'
import { PlusCircle, ChevronRight, ChevronLeft } from 'lucide-react'
import { ChButtonSecondary } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm, SubmitHandler } from 'react-hook-form'

// Define the structure of an article
interface Article {
  id: string
  image: string
  title: string
  date: string
  description: string
  badge: string
}

// Define the structure of a group
interface Group {
  id: string
  title: string
  heading: string
  subheading: string
  url: string
  articles: Article[]
}

const MicroArticle: React.FC<{ article: Article }> = ({ article }) => (
  <div className="flex items-start space-x-2 rounded-md bg-muted p-2">
    <img
      src={article.image}
      alt={article.title}
      className="h-15 w-20 rounded object-cover"
    />
    <div className="min-w-0 flex-1">
      <h4 className="truncate text-sm font-semibold">{article.title}</h4>
      <p className="text-xs text-muted-foreground">
        {new Date(article.date).toLocaleDateString()}
      </p>
      <p className="truncate text-xs">{article.description}</p>
      <Badge variant="secondary" className="mt-1 text-xs">
        {article.badge}
      </Badge>
    </div>
  </div>
)

const ArticleCarousel: React.FC<{ articles: Article[] }> = ({ articles }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const nextArticle = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length)
  }

  const prevArticle = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + articles.length) % articles.length,
    )
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {articles.map((article) => (
            <div key={article.id} className="w-full flex-shrink-0">
              <MicroArticle article={article} />
            </div>
          ))}
        </div>
      </div>
      {articles.length > 1 && (
        <div className="absolute left-0 right-0 top-1/2 flex -translate-y-1/2 justify-between">
          <ChButtonSecondary className="rounded-full" onClick={prevArticle}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous article</span>
          </ChButtonSecondary>
          <ChButtonSecondary className="rounded-full" onClick={nextArticle}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next article</span>
          </ChButtonSecondary>
        </div>
      )}
    </div>
  )
}

interface GroupFormValues {
  title: string
  heading: string
  subheading: string
}

const CreateGroupModal: React.FC<{ onCreateGroup: (group: Group) => void }> = ({
  onCreateGroup,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const { register, handleSubmit, reset } = useForm<GroupFormValues>()

  const onSubmit: SubmitHandler<GroupFormValues> = async (data) => {
    const response = await fetch('/api/v1/article-group-manager', {
      method: 'POST',
      body: JSON.stringify({
        articles: [],
        heading: data.heading,
        subheading: data.subheading,
        reference_name: data.title,
      }),
    })

    const newGroupData = (await response.json()) as {
      data: {
        articles: JSON | null
        created_at: string
        heading: string | null
        id: string
        reference_name: string | null
        shareable_id: string | null
        subheading: string | null
        updated_at: string | null
      }
      error: any
    }

    if (newGroupData.error) {
      throw new Error('Failed to create article group')
    }

    // id: string
    // title: string
    // heading: string
    // subheading: string
    // url: string
    // articles: Article[]
    onCreateGroup({
      id: newGroupData.data.id || '',
      title: newGroupData.data?.reference_name || '',
      heading: newGroupData.data?.heading || '',
      subheading: newGroupData.data.subheading || '',
      url: newGroupData.data.shareable_id || '',
      // @ts-ignore
      articles: newGroupData.data.articles,
    })
    setIsOpen(false)
    reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <ChButtonSecondary>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Group
        </ChButtonSecondary>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Group</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Article Group Name</Label>
            <Input
              id="articleGroupName"
              {...register('title', { required: true })}
              placeholder="Enter article group name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="heading">Heading</Label>
            <Input
              id="heading"
              {...register('heading', { required: true })}
              placeholder="Enter group heading"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subheading">Subheading</Label>
            <Textarea
              id="subheading"
              {...register('subheading', { required: true })}
              placeholder="Enter group subheading"
              required
            />
          </div>
          <ChButtonSecondary type="submit" className="w-full">
            Create Group
          </ChButtonSecondary>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function ArticleGroupsOverview({
  articleGroups,
}: {
  articleGroups: {
    articles: JSON | null
    created_at: string
    heading: string | null
    id: string
    reference_name: string | null
    shareable_id: string | null
    subheading: string | null
    updated_at: string | null
  }[]
}) {
  const [groups, setGroups] = React.useState<Group[]>(
    (articleGroups.map((group) => ({
      id: group.id,
      title: group.reference_name,
      heading: group.heading,
      subheading: group.subheading,
      url: group.shareable_id,
      articles: group.articles,
    })) as unknown as Group[]) || [],
  )

  const handleCreateGroup = async (
    newGroup: Omit<Group, 'id' | 'articles'>,
  ) => {
    console.log(newGroup)

    const completeNewGroup: Group = {
      ...newGroup,
      id: String(groups.length + 1), // Generate a new id based on the length of the groups array
      articles: [], // Initialize with an empty array of articles
    }
    setGroups([...groups, completeNewGroup])
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Article Groups</h1>
        <CreateGroupModal onCreateGroup={handleCreateGroup} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {groups &&
          groups?.map((group) => (
            <Card key={group.id} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle>{group.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">{group.heading}</p>
                <p className="mb-4 text-sm text-muted-foreground">
                  {group.subheading}
                </p>
                <ArticleCarousel articles={group.articles} />
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {group.articles.length}{' '}
                    {group.articles.length === 1 ? 'Article' : 'Articles'}
                  </span>
                  <a
                    href={'/dashboard/article-group-manager/' + group.url}
                    className="ch-color-secondary ch-border-secondary-hover flex items-center rounded-sm px-4 py-2 text-sm hover:bg-stone-900"
                  >
                    Edit <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}
