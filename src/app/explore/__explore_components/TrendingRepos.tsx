'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StarIcon, GitBranchIcon } from 'lucide-react'
import { Text } from '@/components/text'

export default function TrendingRepos() {
  const [loading, setLoading] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('all')
  const [trendingRepositories, setTrendingRepositories] = useState<any[]>([])
  const [offset, setOffset] = useState(0)
  const limit = 10
  const observerTarget = useRef(null)

  const filteredRepositories =
    selectedLanguage === 'all'
      ? trendingRepositories
      : trendingRepositories.filter(
          (repo) => repo.language === selectedLanguage,
        )

  useEffect(() => {
    setLoading(true)
    fetch('/api/v0.1/trending?limit=' + limit + '&offset=' + offset)
      .then((response) => response.json())
      .then(({ data, error }) => {
        if (error) {
          console.error(error)
          return
        }
        setTrendingRepositories([...trendingRepositories, ...data])
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }, [offset])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !loading) {
          setOffset((prevOffset) => prevOffset + limit)
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      },
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [loading])

  if (loading && trendingRepositories.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col gap-4">
          <h1 className="ch-heading ch-color-primary">Trending Repositories</h1>
          <p className="ch-body ch-color-secondary">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="ch-heading ch-color-primary">Trending Repositories</h1>
        <div className="flex gap-2">
          <Button
            onClick={() => setSelectedLanguage('all')}
            className={`rounded-md px-4 py-2 ${
              selectedLanguage === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            All
          </Button>
          <Button
            onClick={() => setSelectedLanguage('JavaScript')}
            className={`rounded-md px-4 py-2 ${
              selectedLanguage === 'JavaScript'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            JavaScript
          </Button>
          <Button
            onClick={() => setSelectedLanguage('PHP')}
            className={`rounded-md px-4 py-2 ${
              selectedLanguage === 'PHP'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            PHP
          </Button>
          <Button
            onClick={() => setSelectedLanguage('TypeScript')}
            className={`rounded-md px-4 py-2 ${
              selectedLanguage === 'TypeScript'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            TypeScript
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRepositories.map((repo) => (
          <Card key={repo.name} className="p-4">
            <a
              href={'https://github.com' + repo.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="mb-2 flex items-start justify-between">
                <div className="flex flex-col">
                  <Text className="font-bold">{repo.name}</Text>
                  <Text>{repo.fullName}</Text>
                </div>
                <div className="flex items-center gap-2">
                  <StarIcon className="h-4 w-4" />
                  <span className="ch-body ch-color-secondary">
                    {repo.stars}
                  </span>
                  <GitBranchIcon className="h-4 w-4" />
                  <span className="ch-body ch-color-secondary">
                    {repo.forks}
                  </span>
                </div>
              </div>
              <p className="ch-body ch-color-secondary mb-4">
                {repo.description}
              </p>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="ch-border rounded-md px-2 py-1"
                >
                  {repo.language}
                </Badge>
              </div>
            </a>
          </Card>
        ))}
      </div>
      <div ref={observerTarget}></div>
      {filteredRepositories.length !== 0 && loading && (
        <p className="mt-4 text-center">Loading...</p>
      )}
    </div>
  )
}
