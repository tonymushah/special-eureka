import { UseQueryResult } from "@tanstack/react-query";
import React from "react";
import Portal from "./Portal";
import { Root, Trigger } from "@radix-ui/react-context-menu";
import Manga from "@mangadex/api/structures/Manga";
export type MangaContextMenuProps = {
    mangaId: string,
    refetch?: () => void,
}

const MangaContextMenu_Context = React.createContext<MangaContextMenuProps & {
    query: UseQueryResult<Manga, Error>
} | undefined>(undefined);

export function useMangaContextMenu_Context(): MangaContextMenuProps & {
    query: UseQueryResult<Manga, Error>
} {
    const data = React.useContext(MangaContextMenu_Context);
    if (data == undefined) {
        throw new Error("The Manga Context Menu Provider is not implemented");
    } else {
        return data;
    }
}

export function MangaContextMenuProvider({ value, children }: React.PropsWithChildren<{
    value: MangaContextMenuProps & {
        query: UseQueryResult<Manga, Error>
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
            <Portal {...props} />
        </Root>
    );
}