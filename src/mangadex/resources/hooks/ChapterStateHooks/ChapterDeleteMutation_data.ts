import { Chapter } from "@mangadex/api/structures/Chapter";
import Manga from "@mangadex/api/structures/Manga";

export type ChapterDeleteMutation_data = {
    chapter: Chapter;
    manga: Manga;
};
