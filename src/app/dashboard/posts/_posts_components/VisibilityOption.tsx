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

export function VisibilityOption() {
	return (
		<div className="flex flex-col">
			<Label htmlFor="visibility">Visibility</Label>
			<Select>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Select a publish status" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value="public">{'Public'}</SelectItem>
						<SelectItem value="private">{'Private'}</SelectItem>
						<SelectItem value="draft">{'Draft'}</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	)
}
