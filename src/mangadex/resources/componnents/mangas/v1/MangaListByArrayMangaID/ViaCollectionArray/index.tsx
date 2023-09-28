import React from "react";
import Collection from "@mangadex/api/structures/Collection";
import { ActualTab } from "./ActualTab";

const context = React.createContext<Collection<string>[] | undefined>(undefined);

export function useMangaListByCollectionArrayMangaIDSrc() {
    const data = React.useContext(context);
    if (data == undefined) {
        throw new Error("The context value is undefined");
    } else {
        return data;
    }
}

function MangaListByCollectionArrayMangaIDSrcProvider({ src, children }: React.PropsWithChildren<{
    src: Collection<string>[]
}>) {
    return (
        <context.Provider value={src}>
            {children}
        </context.Provider>
    );
}

export default function MangaListByCollectionArrayMangaID(props: {
    src: Collection<string>[]
}) {
    return (
        <MangaListByCollectionArrayMangaIDSrcProvider src={props.src}>
            <ActualTab />
        </MangaListByCollectionArrayMangaIDSrcProvider>
    );
}
