'use client'
import * as React from 'react'
import { Card } from '@/components/ui/card'
import { SafePost } from '@/utils/types'
import { Code, Text } from '@/components/text'
import Image from 'next/image'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { Button, ChButtonSecondary } from '@/components/ui/button'
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { AvatarSm, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { EllipsisIcon, EllipsisVertical } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

interface PostsListProps {
  data: SafePost[]
  count: number
}

// Column Definitions
const columns: ColumnDef<SafePost>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <a
          href={`/dashboard/posts/${row.original.slug.base}/edit`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base font-medium"
        >
          {row.original.title}
        </a>
        <Code>/{row.original.slug.base}</Code>
      </div>
    ),
  },
  {
    accessorKey: 'author.displayName',
    header: 'Author',
    cell: (info) => {
      const author = info.getValue() as string
      if (!author) {
        return <span className="text-gray-500">-</span>
      }
      return (
        <AvatarSm>
          <AvatarImage
            src={info.cell.row.original.author?.avatarUrl}
            alt={info.cell.row.original.author?.displayName}
          />
          <AvatarFallback className="h-full w-full">
            {/* placeholder image */}
            <Image
              src="https://utfs.io/f/d4271cec-49ca-475a-ab84-df354ce7e35a-h5faa7.png"
              alt={info.cell.row.original.author?.displayName}
              width={40}
              height={40}
            />
          </AvatarFallback>
        </AvatarSm>
      )
    },
  },
  {
    accessorKey: 'category.name',
    header: 'Category',
    cell: (info) => {
      const category = info.getValue() as string
      const variant = info?.cell?.row?.original?.category?.color

      if (!category) {
        return <span className="text-green-500">-</span>
      }
      // @ts-ignore
      return <Badge variant={variant}>{category}</Badge>
    },
  },
  {
    accessorKey: 'publishDateDay',
    header: 'Publish Date',
    cell: (info) => {
      const publishDateDay = info.getValue() as string
      console.log(info.cell.row.original.isPublished)
      if (info.cell.row.original.visibility !== 'public') {
        return <span className="text-green-500">-</span>
      }
      return <span className="text-xs text-gray-300">{publishDateDay}</span>
    },
  },
  {
    accessorKey: 'wordCount',
    header: 'Word / Character Count',
    cell: (info) => {
      const wordCount = info.getValue() as number
      if (!wordCount) {
        return <span className="text-green-500">-</span>
      }
      return (
        <span className="text-xs text-gray-300">
          {wordCount.toLocaleString()} words /{' '}
          {info.cell.row.original.characterCount?.toLocaleString()} characters
        </span>
      )
    },
  },
  {
    header: 'Actions',
    cell: (info) => {
      return (
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4"></div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          {/* <a
            href={`/dashboard/posts/${info.cell.row.original.slug.base}/edit`}
            className="text-sm font-medium"
          >
            Edit
          </a>
          <a
            href={`/dashboard/posts/${info.cell.row.original.slug.base}`}
            className="text-sm font-medium"
          >
            View
          </a> */}
        </div>
      )
    },
  },
]

export default function PostsList({ data, count }: PostsListProps) {
  if (!data) {
    throw Error('No data')
  }

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  })

  if (data.length === 0) {
    return (
      <div className="mt-4 flex items-center justify-center">
        <p className="ch-body ch-color-secondary">No posts found</p>
      </div>
    )
  }

  return (
    <section className="grid grid-cols-12 gap-2">
      <div className="col-span-12 gap-4 space-y-4 divide-y divide-stone-200/50 dark:divide-stone-700/50">
        <div className="flex w-full items-center justify-between pt-4">
          <Text>
            Showing{' '}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}{' '}
            -{' '}
            {Math.min(
              table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                table.getState().pagination.pageSize,
              count,
            )}{' '}
            of {count} records
          </Text>
        </div>
        <div>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mb-4 mt-2 flex items-center justify-end space-x-2">
            <ChButtonSecondary
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </ChButtonSecondary>
            <ChButtonSecondary
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </ChButtonSecondary>
          </div>
        </div>
      </div>
    </section>
  )
}
