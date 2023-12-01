import { Chapter } from "@mangadex/api/structures/Chapter";
import { is_chapter_downloaded_with_ChapID } from "./is_chapter_downloaded_with_ChapID";


export function is_chapter_downloaded(props: {
    chapter: Chapter;
}) {
    return is_chapter_downloaded_with_ChapID({
        id: props.chapter.get_id()
    });
}
