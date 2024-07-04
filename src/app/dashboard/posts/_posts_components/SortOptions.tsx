import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

export function SortOptions({
	defaultValue = 'default',
	onValueChange,
}: {
	defaultValue: string
	onValueChange: (value: string) => void
}) {
	return (
		<div className="flex flex-col">
			<Label htmlFor="filter-by" className="sr-only">Filter</Label>
			<Select value={defaultValue} onValueChange={onValueChange}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Sort by" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value="default">Sort by (Default)</SelectItem>
						<SelectItem value="new-published">Newest Published</SelectItem>
						<SelectItem value="old-published">Oldest Published</SelectItem>
						<SelectItem value="new-private">Newest Private</SelectItem>
						<SelectItem value="old-private">Oldest Private</SelectItem>
						<SelectItem value="new-draft">Newest Draft</SelectItem>
						<SelectItem value="old-draft">Oldest Draft</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	)
}
