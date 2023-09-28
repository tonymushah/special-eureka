import Manga from "./";


export type GetMangaByIDResponse = {
    manga: Manga;
    isOffline: boolean;
};
