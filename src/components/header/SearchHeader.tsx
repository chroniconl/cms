'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@chroniconl/ui/dialog'
import { Input } from '@chroniconl/ui/input'
import { Label } from '@chroniconl/ui/label'
import { ScrollArea } from '@chroniconl/ui/scroll-area'
import { debounce } from '@/utils/debounce'
import { formatDate } from '@/utils/dates'
import { File, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useCallback, useEffect } from 'react'
import { create } from 'zustand'
import { useRouter } from 'next/navigation'
import { Checkbox } from '@chroniconl/ui/checkbox'
import { useForm, Controller } from 'react-hook-form'

interface IDocument {
  id: string
  created_at: string
  content: string
  title: string
  slug: string
  class: string
  tags: string
  category: string
  content_json: string
}

interface SearchResults {
  searchResults: IDocument[]
  searchResultCount: number
}

interface SearchHeaderStore {
  search: string
  setSearch: (search: string) => void
  results: SearchResults
  setResults: (results: SearchResults) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const searchHeaderStore = create<SearchHeaderStore>((set) => ({
  search: '',
  setSearch: (search: string) => set({ search }),
  results: {
    searchResultCount: 0,
    searchResults: [],
  },
  setResults: (results: SearchResults) =>
    set({
      results: {
        searchResults: results.searchResults,
        searchResultCount: results.searchResultCount || 0,
      },
    }),
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}))

const SearchCard = ({ result }: { result: IDocument }) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/dashboard/posts/${result.slug}`)
  }

  return (
    <button
      className="flex items-center space-x-2 overflow-ellipsis bg-secondary p-2 hover:bg-secondary"
      key={result.id}
      onClick={handleClick}
    >
      <div>
        <File className="h-6 w-6 text-secondary-foreground" />
      </div>
      <div>
        <span className="block overflow-ellipsis text-nowrap text-sm font-bold text-secondary-foreground">
          {result.title}
        </span>
        <span className="block text-sm text-secondary-foreground">
          {formatDate(result.created_at)}
        </span>
      </div>
    </button>
  )
}

export function SearchHeader() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      include_titles: true,
      include_content: true,
    },
  })

  const search = searchHeaderStore((state) => state.search)
  const setSearch = searchHeaderStore((state) => state.setSearch)
  const results = searchHeaderStore((state) => state.results)
  const setResults = searchHeaderStore((state) => state.setResults)
  const loading = searchHeaderStore((state) => state.loading)
  const setLoading = searchHeaderStore((state) => state.setLoading)

  const sendSearchRequest = useCallback(
    async (data: any) => {
      if (!search) {
        setResults({
          searchResultCount: 0,
          searchResults: [],
        })
        return
      }

      setLoading(true)

      const searchRequest = await fetch('/api/v0/search', {
        method: 'POST',
        body: JSON.stringify({
          search,
          include_titles: data.include_titles,
          include_content: data.include_content,
        }),
      })

      const searchResponse = await searchRequest.json()

      if (searchResponse?.error) {
        setLoading(false)
        return
      }

      setResults(searchResponse?.data)
      setLoading(false)
    },
    [search, setLoading, setResults],
  )

  const debounceSearch = useCallback(
    debounce(handleSubmit(sendSearchRequest), 500),
    [sendSearchRequest],
  )

  const handleSearchModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    debounceSearch()
  }, [search, debounceSearch])

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative flex flex-1 items-center sm:flex-initial">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-stone-500 dark:text-stone-400" />
            <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-8 text-sm text-muted-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-[300px] md:w-[200px] lg:w-[300px]">
              Search documents...
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="search" className="sr-only">
                Search documents, media and more...
              </Label>
              <Input
                id="search"
                placeholder="Search everything..."
                onChange={handleSearchModal}
              />
            </div>
          </div>

          <form>
            <div>
              <Label htmlFor="search">Include results from</Label>
              <div className="mt-2 flex flex-wrap items-center gap-4 rounded-md border px-2 py-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Titles</span>
                  <Controller
                    name="include_titles"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        onCheckedChange={(value: boolean) => {
                          field.onChange(value)
                        }}
                      />
                    )}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Content</span>
                  <Controller
                    name="include_content"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        onCheckedChange={(value: boolean) => {
                          field.onChange(value)
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </form>

          <ScrollArea className="h-72 rounded-md border">
            <div className="p-2">
              {loading && (
                <p className="text-sm text-muted-foreground">Loading...</p>
              )}

              {!loading && results?.searchResultCount > 0 && (
                <p className="text-sm text-muted-foreground">
                  {results?.searchResultCount} results found for "{search}"
                </p>
              )}

              {!loading && results?.searchResultCount === 0 && (
                <p className="text-sm text-muted-foreground">
                  No results found.
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 p-2">
              {results?.searchResults?.map((result) => (
                <SearchCard result={result} key={result.id} />
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}
