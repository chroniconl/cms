import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { formatDateWithTimeToo } from '@/utils/dates'
import { TrashIcon, EyeIcon, EllipsisIcon } from 'lucide-react'
import { HistoryItem, useObservatoryStore } from '../store'

export function ObserverHistory({ history = [] }: { history: HistoryItem[] }) {
  const setHtml = useObservatoryStore((state) => state.setHtml)
  const setUrl = useObservatoryStore((state) => state.setUrl)
  const handleMoveToObserver = async (item: HistoryItem) => {
    setUrl(item.full_url)
    setHtml(item.raw_contents)
  }
  const loadingHistory = useObservatoryStore((state) => state.loadingHistory)
  return (
    <div className="">
      <ul className="grid gap-1">
        {loadingHistory && (
          <li className="h-[100px] animate-pulse bg-card bg-stone-50 px-4 pb-4 pt-2 dark:bg-stone-800">
            <p className="text-sm text-muted-foreground">Loading...</p>
          </li>
        )}
        {!loadingHistory &&
          history &&
          history.length > 0 &&
          history.map((item) => (
            <li key={item.id} className="bg-card px-4 pb-4 pt-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    <a
                      href={item.full_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 underline"
                    >
                      {item.full_url}
                    </a>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDateWithTimeToo(item.created_at)}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="px-4 py-2">
                      <EllipsisIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Open menu</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <TrashIcon className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => handleMoveToObserver(item)}
                    >
                      <EyeIcon className="mr-2 h-4 w-4" />
                      Move to Observer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
