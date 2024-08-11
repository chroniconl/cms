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
import TypedComponent from '@/components/Typed'
import BorderBottom from '@/components/BorderBottom'

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
      <ul className="divide-y divide-stone-200/50 dark:divide-stone-700/50">
        {loadingHistory && (
          <li className="">
            <p className="text-sm text-muted-foreground">
              <TypedComponent strings={['Loading...']} />
            </p>
          </li>
        )}
        {!loadingHistory &&
          history &&
          history.length > 0 &&
          history.map((item) => (
            <li key={item.id} className="pb-4 pt-2">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-9">
                  <p className="overflow-hidden text-ellipsis text-nowrap text-sm text-muted-foreground">
                    <a
                      href={item.full_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 underline"
                    >
                      {item.full_url}
                    </a>
                  </p>
                  <p className="overflow-hidden text-ellipsis text-nowrap text-xs text-muted-foreground">
                    {formatDateWithTimeToo(item.created_at)}
                  </p>
                </div>
                <div className="col-span-3 flex items-center justify-end">
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
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
