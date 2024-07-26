"use client"

import { useEffect, useState } from "react"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Badge } from "@repo/ui/badge"
import { StarIcon, GitBranchIcon } from "lucide-react"

export default function TrendingRepos() {
	const [loading, setLoading] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [trendingRepositories, setTrendingRepositories] = useState<any[]>([])
	const [offset, setOffset] = useState(0)
	const limit = 10
  const filteredRepositories =
    selectedLanguage === "all"
      ? trendingRepositories
      : trendingRepositories.filter((repo) => repo.language === selectedLanguage)

	useEffect(() => {
		setLoading(true)
		fetch("/api/v0.1/trending?limit=" + limit + "&offset=" + offset)
			.then((response) => response.json())
			.then(({data, error}) => {
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

	const handleLoadMore = () => {
		setOffset((prevOffset) => prevOffset + limit)
	}

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="mb-6 flex justify-between items-center">
					<h1 className="ch-heading ch-primary">Trending Repositories</h1>
					<p className="ch-body ch-muted">
						Loading...
					</p>
				</div>
			</div>
		)
	}

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="ch-heading ch-primary">Trending Repositories</h1>
        <div className="flex gap-2">
          <Button
            onClick={() => setSelectedLanguage("all")}
            className={`px-4 py-2 rounded-md ${
              selectedLanguage === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            All
          </Button>
          <Button
            onClick={() => setSelectedLanguage("JavaScript")}
            className={`px-4 py-2 rounded-md ${
              selectedLanguage === "JavaScript"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            JavaScript
          </Button>
          <Button
            onClick={() => setSelectedLanguage("PHP")}
            className={`px-4 py-2 rounded-md ${
              selectedLanguage === "PHP" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            PHP
          </Button>
          <Button
            onClick={() => setSelectedLanguage("TypeScript")}
            className={`px-4 py-2 rounded-md ${
              selectedLanguage === "TypeScript"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            TypeScript
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRepositories.map((repo) => (
          <Card key={repo.name} className="p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="font-bold text-lg">{repo.name}</div>
              <div className="flex items-center gap-2">
                <StarIcon className="w-4 h-4" />
                <span>{repo.stars}</span>
                <GitBranchIcon className="w-4 h-4" />
                <span>{repo.forks}</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">{repo.description}</p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="ch-border px-2 py-1 rounded-md">
                {repo.language}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
				<button className="ch-button-secondary-marketing" onClick={handleLoadMore}>View 10 more</button>
    </div>
  )
}