import Manga from "@mangadex/api/structures/Manga";
import { Client } from "@tauri-apps/api/http";
import { createQuery } from "react-query-kit";
import { queryClient } from "@mangadex/resources/query.client";
import { event } from "@tauri-apps/api";
import { appWindow } from "@tauri-apps/api/window";

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
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    "networkMode": "always"
});

const unlisten = event.listen("mdx-server-state", () => {
    queryClient.refetchQueries({
        predicate(query) {
            return query.queryKey.includes(isMangaDonwloaded.getPrimaryKey());
        },
    });
});

appWindow.onCloseRequested(() => {
    unlisten.then((e) => e());
});

export default isMangaDonwloaded;