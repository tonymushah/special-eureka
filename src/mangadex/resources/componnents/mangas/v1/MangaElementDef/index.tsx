import * as Chakra from "@chakra-ui/react";
import { Manga } from "@mangadex/api/structures/Manga";
import MangaElementDef_without_Context_Menu from "./Without_ContextMenu";

import MangaContextMenu from "../MangaContextMenu";
import ErrorBoundary from "./error";


export default function MangaElementDef(props: {
    src: Manga,
    isRefetching?: boolean,
    refetch?: () => void
}) {
    return (
        <Chakra.Box
            display={"flex"}
            width={"min-content"}
        >
            <ErrorBoundary>
                <MangaContextMenu
                    mangaId={props.src.get_id()}
                    refetch={props.refetch}
                >
                    <MangaElementDef_without_Context_Menu
                        src={props.src}
                        isRefetching={props.isRefetching}
                    />
                </MangaContextMenu>
            </ErrorBoundary>
        </Chakra.Box>
    );
}
