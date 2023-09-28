import Consumer from "@commons-res/components/Consumer";
import { Author_Artists } from "@mangadex/api/internal/Utils";
import { Author } from "@mangadex/api/structures/Author";
import Manga from "@mangadex/api/structures/Manga";
import { get_manga_page_authors_artists } from "@mangadex/resources/hooks/MangaStateHooks/get_manga_page_authors_artists";
import React from "react";

export function Author_Artists_Cmp_via_manga(props : {
    manga : Manga,
    onLoading : React.ReactNode,
    onError?: React.ReactNode,
    children : (author_artist : Author[]) => React.ReactNode
}){
    const {
        authors,
        artistists,
        is_Author_artists_finished
    } = get_manga_page_authors_artists({
        src : props.manga
    });
    if(is_Author_artists_finished()){
        return (
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            <Author_Artists_Cmp src={new Author_Artists(authors.map((value) => value.data!), artistists.map((value) => value.data!))}>
                {props.children}
            </Author_Artists_Cmp>
        );
    }else{
        return (
            <React.Fragment>
                {
                    props.onLoading
                }
            </React.Fragment>
        );
    }
}

export default function Author_Artists_Cmp(props : {
    src : Author_Artists,
    children : (author_artists : Author[]) => React.ReactNode 
}){
    const filtered = React.useMemo<Author[]>(() => {
        props.src.initialise_filtred();
        return props.src.filtred;
    }, [props.src]);
    return (
        <Consumer to_consume={filtered}>
            {
                props.children
            }
        </Consumer>
    );
}