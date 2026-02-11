import type { Language } from "@mangadex/gql/graphql";
import type { Chapter } from "..";

export type ChapterFeedListItem = {
	coverImageAlt: string;
	title: string;
	mangaId: string;
	chapters: Chapter[];
	mangaLang: Language | undefined;
};
