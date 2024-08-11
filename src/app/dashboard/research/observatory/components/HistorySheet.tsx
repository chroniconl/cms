'use client'
import { useEffect } from 'react'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { BorderBottom } from '@/components/BorderBottom'
import { ObserverHistory } from './ObserverHistory'
import { useObservatoryStore } from '../store'
import { ScrollArea } from '@/components/ui/scroll-area'

export const HistorySheet = () => {
  const history = useObservatoryStore((state) => state.history)
  const setHistory = useObservatoryStore((state) => state.setHistory)
  const setLoadingHistory = useObservatoryStore(
    (state) => state.setLoadingHistory,
  )

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await fetch('/api/v1/trendy/history', {
        method: 'GET',
      })

      const { data, error } = await response.json()
      if (error) {
        throw new Error('Failed to fetch history')
      }

      setHistory(data)
      setLoadingHistory(false)
    }

    fetchHistory()
  }, [])

  return (
    <div className="mb-4 flex w-full">
      <Sheet>
        <SheetTrigger asChild>
          <button className="text-sm text-blue-400 hover:underline">
            View History
          </button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>History</SheetTitle>
            <SheetDescription>
              View and manage all the URLs you've visited in the Observatory.
            </SheetDescription>
            <div className="mb-4 mt-2">
              <BorderBottom />
            </div>
          </SheetHeader>
          <ScrollArea className="mt-4 h-[500px]">
            <ObserverHistory history={history} />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}
