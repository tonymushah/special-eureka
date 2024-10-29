import type { Language } from "@mangadex/gql/graphql";
import type { Chapter } from "..";
import type { Readable } from "svelte/store";

export type ChapterFeedListItem = {
    coverImage: Readable<string | undefined>;
    coverImageAlt: string;
    title: string;
    mangaId: string;
    chapters: Chapter[];
    mangaLang: Language | undefined;
}