'use client'
import { Card } from '@chroniconl/ui/card'
import { SafePost } from '@/utils/types'
import { Text } from '@/components/text'
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
} from "@tanstack/react-table";
import * as React from "react";
import { Button } from "@chroniconl/ui/button";
import {
	Table,
	TableHeader,
	TableRow,
	TableCell,
	TableBody,
	TableHead,
} from '@chroniconl/ui/table'

interface PostsListProps {
	data: SafePost[]
	count: number
}

// Column Definitions
const columns: ColumnDef<SafePost>[] = [
	{
		accessorKey: "title",
		header: "Title",
		cell: ({ row }) => (
			<a href={`/dashboard/posts/${row.original.slug.base}/edit`} target="_blank" rel="noopener noreferrer">
				{row.original.title}
			</a>
		),
	},
	{ accessorKey: "author.displayName", header: "Author" },
	{ accessorKey: "category.name", header: "Category" },
	{
		accessorKey: "publishDateDay",
		header: "Publish Date",
	},
];

export default function PostsList({ data, count }: PostsListProps) {
	if (!data) {
		throw Error('No data')
	}

	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);

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
	});

	return (
		<section className="grid grid-cols-12 gap-2">
			<Card className="col-span-12 gap-4 space-y-4 divide-y divide-stone-200/50 px-4 dark:divide-stone-700/50">
				<div className="flex w-full items-center justify-between pt-4">
					<Text>Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} - {Math.min(table.getState().pagination.pageIndex * table.getState().pagination.pageSize + table.getState().pagination.pageSize, count)} of {count} records</Text>
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
													header.getContext()
												)}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => {
										const columnHeader = cell.column.columnDef.header;

										// Custom rendering for "Category"
										if (columnHeader === "Category") {
											return (
												<TableCell key={cell.id}>
													<div className="flex items-center">
														<div
															className="h-2 w-2 rounded-full mr-2"
															style={{ backgroundColor: row.original.category.color }}
														/>
														{flexRender(cell.column.columnDef.cell, cell.getContext())}
													</div>
												</TableCell>
											);
										}

										// Default rendering for other columns
										return (
											<TableCell key={cell.id}>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</TableCell>
										);
									})}
								</TableRow>
							))}
						</TableBody>
					</Table>
					<div className="flex items-center justify-end space-x-2 mt-2 mb-4">
						<Button
							variant="outline"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							Previous
						</Button>
						<Button
							variant="outline"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							Next
						</Button>
					</div>
				</div>
			</Card>
		</section>
	);
}

