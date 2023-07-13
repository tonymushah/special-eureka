import { Alt_title } from "@mangadex/api/internal/Utils";
import { usePropsChapter } from "@mangadex/resources/componnents/chapter/v1/PropsContext";
import { appWindow } from "@tauri-apps/api/window";
import React from "react";
import { getMangaByID__ } from "./Chapter_on_non_FullScreen";


function setWindowTitle() {
    const { chapter } = usePropsChapter();
    const mangaQuery = getMangaByID__({
        manga_id: chapter.get_manga_id(),
        options: {
            staleTime: Infinity,
            enabled: !!chapter
        }
    });
    React.useEffect(() => {
        if (mangaQuery.isSuccess) {
            const data = mangaQuery.data.manga;
            let title: string;
            if (data.get_title().en == null) {
                title = new Alt_title(data.get_alt_title()).get_quicklang()!;
            } else {
                title = data.get_title().en;
            }
            chapter.get_translated_Lang().then((lang) => {
                appWindow.setTitle(`${lang.get_name()} Chapter ${chapter.get_chapter()} - ${title} | Mangadex`).then();
            }).catch(() => {
                appWindow.setTitle(`Chapter ${chapter.get_chapter()} - ${title} | Mangadex`).then();
            });
        }
    }, [mangaQuery.status]);

}

export default function WindowTitle(){
    setWindowTitle();
    return (
        <React.Fragment/>
    );
}