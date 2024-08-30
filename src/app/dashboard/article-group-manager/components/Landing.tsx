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

const CreateGroupModal: React.FC<{
  onCreateGroup: (group: Omit<Group, 'id' | 'articles'>) => void
}> = ({ onCreateGroup }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [heading, setHeading] = React.useState('')
  const [subheading, setSubheading] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreateGroup({ title, heading, subheading, url: '' })
    setIsOpen(false)
    setTitle('')
    setHeading('')
    setSubheading('')
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter group title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="heading">Heading</Label>
            <Input
              id="heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder="Enter group heading"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subheading">Subheading</Label>
            <Textarea
              id="subheading"
              value={subheading}
              onChange={(e) => setSubheading(e.target.value)}
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

export default function ArticleGroupsOverview() {
  const [groups, setGroups] = React.useState<Group[]>([
    {
      id: '1',
      title: 'TypeScript Tutorials',
      heading: 'Learn TypeScript',
      subheading: 'Enhance your JavaScript skills',
      url: '/typescript-tutorials',
      articles: [
        {
          id: '1',
          image: '/placeholder.svg?height=60&width=80',
          title: 'TypeScript Basics',
          date: '2024-08-01',
          description: 'Get started with TypeScript fundamentals',
          badge: 'Beginner',
        },
        {
          id: '2',
          image: '/placeholder.svg?height=60&width=80',
          title: 'Advanced Types',
          date: '2024-08-15',
          description: 'Explore complex types in TypeScript',
          badge: 'Advanced',
        },
        {
          id: '3',
          image: '/placeholder.svg?height=60&width=80',
          title: 'TypeScript with React',
          date: '2024-08-30',
          description: 'Use TypeScript in React applications',
          badge: 'Intermediate',
        },
      ],
    },
    {
      id: '2',
      title: 'React Basics',
      heading: 'Getting Started with React',
      subheading: 'Build interactive UIs',
      url: '/react-basics',
      articles: [
        {
          id: '4',
          image: '/placeholder.svg?height=60&width=80',
          title: 'React Components',
          date: '2024-09-01',
          description: 'Learn about React components',
          badge: 'Beginner',
        },
        {
          id: '5',
          image: '/placeholder.svg?height=60&width=80',
          title: 'State and Props',
          date: '2024-09-15',
          description: 'Understand state and props in React',
          badge: 'Intermediate',
        },
      ],
    },
  ])

  const handleCreateGroup = (newGroup: Omit<Group, 'id' | 'articles'>) => {
    const groupWithId: Group = {
      ...newGroup,
      id: (groups.length + 1).toString(),
      articles: [],
    }
    setGroups([...groups, groupWithId])
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Article Groups</h1>
        <CreateGroupModal onCreateGroup={handleCreateGroup} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
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
