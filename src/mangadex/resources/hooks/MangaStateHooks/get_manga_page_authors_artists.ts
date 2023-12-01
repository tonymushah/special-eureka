import { MangaPageProps } from "@mangadex/resources/componnents/mangas/Manga_Page";
import get_manga_page_authors from "./get_manga_page_authors";
import get_manga_page_artists from "./get_manga_page_artists";
import React from "react";


export function get_manga_page_authors_artists(props: MangaPageProps) {
    const authors = get_manga_page_authors(props);
    const artistists = get_manga_page_artists(props);
    const is_Artists_finished = React.useCallback<(() => boolean)>(function () {
        const all_isSuccess_Artists = artistists.map<boolean>((value) => {
            return value.isSuccess;
        });
        const is_allArtists_Success = !all_isSuccess_Artists.includes(false);
        return is_allArtists_Success;
    }, [artistists]);
    const is_Authors_finished = React.useCallback<(() => boolean)>(function () {
        const all_isSuccess_Authors = authors.map<boolean>((value) => {
            return value.isSuccess;
        });
        const is_allAuthors_Success = !all_isSuccess_Authors.includes(false);
        return is_allAuthors_Success;
    }, [artistists]);
    const is_Author_artists_finished = React.useCallback<(() => boolean)>(function () {
        return (is_Authors_finished() == true && is_Artists_finished() == true);
    }, [is_Artists_finished, is_Authors_finished]);
    return {
        authors,
        artistists,
        is_Artists_finished,
        is_Authors_finished,
        is_Author_artists_finished
    };
}
