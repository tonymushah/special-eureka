import React from "react";
import Manga from "@mangadex/api/structures/Manga";
import ActualTab from "./ActualTab";

const context = React.createContext<Array<Manga> | undefined>(undefined);

export function useMangaListSrc() {
    const data = React.useContext(context);
    if (data == undefined) {
        throw new Error("The context value is undefined");
    } else {
        return data;
    }
}

function MangaListSrcProvider({ src, children }: React.PropsWithChildren<{
    src: Array<Manga>
}>) {
    return (
        <context.Provider value={src}>
            {children}
        </context.Provider>
    );
}

export default function MangaList(props: {
    src: Array<Manga>
}) {
    return (
        <MangaListSrcProvider
            src={props.src}
        >
            <ActualTab/>
        </MangaListSrcProvider>
    );
}