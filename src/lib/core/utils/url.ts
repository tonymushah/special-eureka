export function currentLocationWithNewPath(path: string): string {
	const current_location = new URL(location.href);
	current_location.pathname = path;
	return current_location.href;
}