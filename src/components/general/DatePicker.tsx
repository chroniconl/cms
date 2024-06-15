"use client";

import { addDays, format } from "date-fns";
// import { CalendarIcon } from "@radix-ui/react-icons"
import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/utils/cn";
import { isValidDate } from "@/utils/dates";

export function DatePickerWithPresets({
	date = new Date(),
	setDate = () => {},
	disabled = false,
	name
}: {
	date?: Date;
	setDate: (date: Date) => void;
	disabled?: boolean;
	name: string;
}) {
	const isValid = isValidDate(date);
	return (
		<Popover>
			<PopoverTrigger asChild disabled={disabled}>
				<Button
					variant={"outline"}
					className={cn(
						"w-[240px] justify-start text-left font-normal",
						!isValid || !date && "text-muted-foreground",
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{isValid && date ? format(date, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				align="start"
				className="flex w-auto flex-col space-y-2 p-2"
			>
				<Select
					name={name}
					onValueChange={(value) =>
						setDate(addDays(new Date(), Number.parseInt(value)))
					}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select" />
					</SelectTrigger>
					<SelectContent position="popper">
						<SelectItem value="0">Today</SelectItem>
						<SelectItem value="1">Tomorrow</SelectItem>
						<SelectItem value="3">In 3 days</SelectItem>
						<SelectItem value="7">In a week</SelectItem>
					</SelectContent>
				</Select>
				<div className="rounded-md border">
					{/* @ts-ignore */}
					<Calendar mode="single" selected={date} onSelect={setDate} />
				</div>
			</PopoverContent>
		</Popover>
	);
}

export function DatePickerSimple({
	date = new Date(),
	setDate = () => {},
	disabled = false,
}: {
	date?: Date;
	setDate: (date: Date) => void;
	disabled?: boolean;
}) {
	const isValid = isValidDate(date);
	return (
		<Popover>
			<PopoverTrigger asChild disabled={disabled}>
				<Button
					variant={"outline"}
					className={cn(
						"w-[240px] justify-start text-left font-normal",
						!isValid || !date && "text-muted-foreground",
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{isValid && date ? format(date, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={date}
					// @ts-ignore
					onSelect={setDate}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
