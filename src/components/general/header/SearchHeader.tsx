"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { debounce } from "@/utils/debounce";
import { formatDate } from "@/utils/dates";
import { File, SearchIcon } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect } from "react";
import { create } from "zustand";

interface IDocument {
  id: string;
  created_at: string;
  content: string;
  title: string;
  slug: string;
  class: string;
  tags: string;
  category: string;
  content_json: string;
}

export const searchHeaderStore = create<{
  search: string;
  setSearch: (search: string) => void;
  results: {
    searchResultCount: number;
    searchResults: IDocument[];
  };
  setResults: (results: {
    searchResultCount: number | null;
    searchResults: IDocument[];
  }) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}>((set) => ({
  search: "",
  setSearch: (search: string) => set({ search }),
  results: {
    searchResultCount: 0,
    searchResults: [],
  },
  setResults: (results: {
    searchResultCount: number | null;
    searchResults: IDocument[];
    // @ts-ignore
  }) => set({ results }),
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));

export function SearchHeader() {
  const search = searchHeaderStore((state) => state.search);
  const setSearch = searchHeaderStore((state) => state.setSearch);
  const results = searchHeaderStore((state) => state.results);
  const setResults = searchHeaderStore((state) => state.setResults);
  const loading = searchHeaderStore((state) => state.loading);
  const setLoading = searchHeaderStore((state) => state.setLoading);

  const sendSearchRequest = async () => {
    if (!search) {
      setResults({
        searchResultCount: 0,
        searchResults: [],
      });
      return;
    }

    setLoading(true);

    const searchRequest = await fetch("/api/v0/search", {
      method: "POST",
      body: JSON.stringify({ search }),
    });

    // TODO add error handling here
    const searchResponse = await searchRequest.json();

    if (searchResponse?.error) {
      // gracefully let down the error
      setLoading(false);
      return;
    }

    setResults(searchResponse?.data);
    setLoading(false);
    return;
  };

  const debounceSearch = useCallback(debounce(sendSearchRequest, 500), [
    sendSearchRequest,
  ]);

  const handleSearchModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    debounceSearch();
  }, [search, debounceSearch]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative flex-1 sm:flex-initial flex items-center">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-stone-500 dark:text-stone-400" />
            <div
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              // onClick={handleSearchModal}
            >
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
                defaultValue="Search documents, media and more..."
                onChange={handleSearchModal}
              />
            </div>
          </div>

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
              {Object.values(results.searchResults).length > 0 &&
                Object.values(results.searchResults).map((result) => (
                  // This is only accounting for documents
                  // We haven't built the media aspect yet
                  <Link
                    className="p-2 bg-secondary hover:bg-secondary flex items-center space-x-2 overflow-ellipsis"
                    key={result.id}
                    href={`/dashboard/posts/${result.slug}`}
                  >
                    <div>
                      <File className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-secondary-foreground text-nowrap overflow-ellipsis">
                        {result.title}
                      </span>
                      <span className="block text-sm text-secondary-foreground">
                        {formatDate(result.created_at)}
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
