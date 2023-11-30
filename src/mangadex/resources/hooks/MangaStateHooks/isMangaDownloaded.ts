import Manga from "@mangadex/api/structures/Manga";
import { Client } from "@tauri-apps/api/http";
import { createQuery } from "react-query-kit";

import { effect } from "@preact/signals-react";
import isServerActive from "@mangadex/resources/signals/isServerActive";
import { queryClient } from "@mangadex/resources/query.client";

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

effect(() => {
    isServerActive;
    queryClient.refetchQueries({
        "predicate": (query) => query.queryKey.includes("mdx-manga-is-downloaded")
    });
});

export default isMangaDonwloaded;