import Collection from "@mangadex/api/structures/Collection";
import Manga from "@mangadex/api/structures/Manga";
import React from "react";
import ActualTab from "./ActualTab";

const context = React.createContext<Array<Collection<Manga>> | undefined>(undefined);

export function useMangaListWithCollectionArraySrc() {
    const data = React.useContext(context);
    if (data == undefined) {
        throw new Error("The context value is undefined");
    } else {
        return data;
    }
}

function MangaListWithCollectionArraySrcProvider({ src, children }: React.PropsWithChildren<{
    src: Array<Collection<Manga>>
}>) {
    return (
        <context.Provider value={src}>
            {children}
        </context.Provider>
    );
}

export default function MangaListWithCollectionArray({ src } : {
    src : Array<Collection<Manga>>
}){
    return (
        <MangaListWithCollectionArraySrcProvider src={src}>
            <ActualTab />
        </MangaListWithCollectionArraySrcProvider>
    );
}