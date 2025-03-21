import type { RelatedChapter, RelatedChapters } from "../../../contexts/relatedChapters";
import { volumes } from "./aggregate.json";

function agg(): RelatedChapters {
	const agg = Object.entries(volumes).flatMap(([volume, { chapters }]) => {
		return Object.entries(chapters).map(([, { chapter, id }]) => {
			return {
				volume,
				chapter: chapter,
				id
			} satisfies RelatedChapter;
		});
	}) satisfies RelatedChapters;
	return agg;
}

const aggregate = agg();

export default aggregate;
