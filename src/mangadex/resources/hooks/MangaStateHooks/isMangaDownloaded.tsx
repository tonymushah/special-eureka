import Manga from "@mangadex/api/structures/Manga";
import { Client } from "@tauri-apps/api/http";
import { createQuery } from "react-query-kit";

export type Variables = {
    mangaId: string,
    client?: Client
}

const isMangaDonwloaded = createQuery<boolean, Variables, Error>({
    primaryKey: "mdx-manga-is-downloaded",
    queryFn: async ({ queryKey: [, varialbles] }) => {
        try {
            await Manga.getOfflineMangaByID(varialbles.mangaId, varialbles.client);
            return true;
        } catch (error) {
            return false;
        }
    },
});

export default isMangaDonwloaded;