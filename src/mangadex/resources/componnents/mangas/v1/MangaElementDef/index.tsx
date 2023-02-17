import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Manga } from "../../../../../api/structures/Manga";
import MangaElementDef_without_Context_Menu from "./Without_ContextMenu";

const MangaContextMenu = React.lazy(() => import("../MangaContextMenu"));


export default function MangaElementDef(props: {
    src: Manga,
    isRefetching?: boolean,
    refetch?: Function
}){
    return (
        <Chakra.Box
            display={"flex"}
            width={"min-content"}
        >
            <React.Suspense
                fallback={
                    <MangaElementDef_without_Context_Menu
                        src={props.src}
                        isRefetching={props.isRefetching}
                    />
                }
            >
                <MangaContextMenu
                    mangaId={props.src.get_id()}
                    refetch={props.refetch}
                >
                    <MangaElementDef_without_Context_Menu
                        src={props.src}
                        isRefetching={props.isRefetching}
                    />
                </MangaContextMenu>
            </React.Suspense>
        </Chakra.Box>
    )
}
