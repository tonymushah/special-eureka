import Manga from "@mangadex/api/structures/Manga";
import get_manga_description from "@mangadex/resources/hooks/MangaStateHooks/get_manga_description";
import get_manga_page_cover_art_image from "@mangadex/resources/hooks/MangaStateHooks/get_manga_page_cover_art_image";
import React from "react";
import { useMangaTitle } from "../../MangaTitle";


export type Props = {
    src: Manga;
    isRefetching?: boolean;
};
const Context = React.createContext<Props | undefined>(undefined);

export function PropsProvider({ value, children }: React.PropsWithChildren<{
    value: Props;
}>) {
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}

export function useProps(): Props {
    const data = React.useContext(Context);
    if (data == undefined) {
        throw new Error("The Props provied is not implemented");
    } else {
        return data;
    }
}

export function useProps_MangaTitle() {
    const props = useProps();
    return useMangaTitle({
        src: props.src
    });
}

export function useProps_manga_page_cover_art_image() {
    const props = useProps();
    return get_manga_page_cover_art_image({
        src: props.src,
        isThumbail: true
    }).query;
}

export function useProps_manga_description() {
    const props = useProps();
    return get_manga_description({
        src: props.src
    });
}
