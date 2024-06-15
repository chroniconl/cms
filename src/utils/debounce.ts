// i hate reading this

/**
 * debounce
 */
export function debounce<F extends (...args: any[]) => void>(
	func: F,
	wait: number,
): (...args: Parameters<F>) => void {
	let timeout: ReturnType<typeof setTimeout> | undefined;

	return function executedFunction(...args: Parameters<F>) {
		const later = () => {
			clearTimeout(timeout as NodeJS.Timeout);
			func(...args);
		};

		clearTimeout(timeout as NodeJS.Timeout);
		timeout = setTimeout(later, wait);
	};
}
