import Manga from "@mangadex/api/structures/Manga";
import { get_manga_page_cover } from "./get_manga_page_cover";


export function get_cover_art(props: {
    src: Manga;
}) {
    return get_manga_page_cover({
        src: props.src
    });
}
