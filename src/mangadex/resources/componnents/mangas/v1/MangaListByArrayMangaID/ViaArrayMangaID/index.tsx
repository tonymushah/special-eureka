import React from "react";
import ActualTab from "./ActualTab";

const context = React.createContext<Array<string> | undefined>(undefined);

export function useMangaListByArrayMangaIDSrc() {
    const data = React.useContext(context);
    if (data == undefined) {
        throw new Error("The context value is undefined");
    } else {
        return data;
    }
}

function MangaListByArrayMangaIDSrcProvider({ src, children }: React.PropsWithChildren<{
    src: Array<string>
}>) {
    return (
        <context.Provider value={src}>
            {children}
        </context.Provider>
    );
}

export default function MangaListByArrayMangaID(props: {
    src: Array<string>
}) {
    return (
        <MangaListByArrayMangaIDSrcProvider src={props.src}>
            <ActualTab/>
        </MangaListByArrayMangaIDSrcProvider>
    );
}
