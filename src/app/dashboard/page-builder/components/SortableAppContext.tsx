'use client'
import { DndContext } from '@dnd-kit/core'

export const SortableAppContext = ({ children }: any) => {
  return <DndContext>{children}</DndContext>
}
