import { dev } from "$app/environment";

export default function chapterTitle({
	chapter,
	title
}: {
	chapter: string | null | undefined;
	title: string | null | undefined;
}): string | undefined {
	if (dev)
		console.debug(`${chapter} - ${title}`);
	if (typeof chapter == "string" && typeof title == "string") {
		if (title.length == 0 || title == null) {
			return `Chap. ${chapter}`;
		} else {
			return `Chap. ${chapter} - ${title}`;
		}
	} else if (typeof chapter == "string") {
		return `Chap. ${chapter}`;
	} else if (typeof title == "string") {
		return title;
	} else {
		return undefined;
	}
}
