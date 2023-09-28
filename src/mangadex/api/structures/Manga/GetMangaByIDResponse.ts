import { Manga } from "./Manga";


export type GetMangaByIDResponse = {
    manga: Manga;
    isOffline: boolean;
};
