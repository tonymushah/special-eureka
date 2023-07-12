import { UseQueryResult } from "@tanstack/react-query";
import { GetMangaByIDResponse } from "@mangadex/api/structures/Manga";
import React from "react";
import Portal from "./Portal";
import { Root, Trigger } from "@radix-ui/react-context-menu";
export type MangaContextMenuProps = {
    mangaId : string,
    refetch?: () => void,
}

const MangaContextMenu_Context = React.createContext<MangaContextMenuProps & {
    query : UseQueryResult<GetMangaByIDResponse, Error>
} | undefined>(undefined);

export function useMangaContextMenu_Context(): MangaContextMenuProps & {
    query : UseQueryResult<GetMangaByIDResponse, Error>
} {
    const data = React.useContext(MangaContextMenu_Context);
    if (data == undefined) {
        throw new Error("The Manga Context Menu Provider is not implemented");
    } else {
        return data;
    }
}

export function MangaContextMenuProvider({ value, children }: React.PropsWithChildren<{
    value : MangaContextMenuProps & {
    query : UseQueryResult<GetMangaByIDResponse, Error>
}
}>) {
    return (
        <MangaContextMenu_Context.Provider value={value}>
            {children}
        </MangaContextMenu_Context.Provider>
    );
}

export default function MangaContextMenu(props: React.PropsWithChildren<MangaContextMenuProps>) {
    return (
        <Root>
            <Trigger>{
                props.children
            }</Trigger>
            <Portal {...props}/>
        </Root>
    );
}