import { addDays, format, isBefore, parse, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

const PST_TIMEZONE = "America/Los_Angeles";

export function isValidDate(dateString: string | Date): boolean {
	if (!dateString) return false;

	if (dateString instanceof Date) {
		return !Number.isNaN(dateString.getTime());
	}

	const date = new Date(dateString);
	return !Number.isNaN(date.getTime());
}

export function formatDate(dateString: string) {
	return new Date(dateString).toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
}

/**
 * @description Checks if a publication time is in the past
 */
export function isPublished(publicationTime: string): boolean {
	// Parse the publication time
	const pubTime = parseISO(publicationTime);

	// Get the current time
	const currentTime = new Date();

	// Compare the publication time with the current time
	if (isBefore(pubTime, currentTime)) {
		return true;
	}
	return false;
}
/**
 * @deprecated
 * Converts a date to PST timezone
 * @param {string | Date} date - The date to convert
 * @returns {Date} - The converted date in PST
 */
export function toPST(date: string | Date | null): Date {
	let dateObj: Date;

	if (!date) {
		dateObj = new Date();
	}

	if (typeof date === "string") {
		// Assuming the string is in ISO format (YYYY-MM-DD)
		dateObj = parseISO(date);
	} else if (date instanceof Date) {
		dateObj = date;
	} else {
		console.log(date);
		throw new Error("Invalid date format");
	}

	// Convert the date to PST
	const zonedDate = utcToZonedTime(dateObj, PST_TIMEZONE);
	return zonedDate;
}

/**
 * Converts a time string in the format "HH:mm:ss" to "h:mm a"
 * @param timeString - The time string to convert
 * @returns The formatted time string
 */
export function convertTimeString(timeString: string): string {
	// Parse the time string to a Date object
	const date = parse(timeString, "HH:mm:ss", new Date());

	// Format the Date object to the desired format
	const formattedTime = format(date, "h:mm a");

	return formattedTime;
}

export function getPSTDate(date = new Date()) {
	const now = date;
	const timeZone = "America/Los_Angeles";
	const zonedDate = utcToZonedTime(now, timeZone);
	return zonedDate;
}

export function getPSTDaySevenDaysFromNow() {
	const now = new Date();
	const timeZone = "America/Los_Angeles";
	const zonedDate = utcToZonedTime(now, timeZone);
	const sevenDaysFromNow = addDays(zonedDate, 7);
	return sevenDaysFromNow;
}