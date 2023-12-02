import Manga from "@mangadex/api/structures/Manga";
import Vanilla from "./vanilla";

import { motion } from "framer-motion";
import MangaContextMenu from "../MangaContextMenu";
import ErrorBoundary from "./error";
import React from "react";

const MangaElementDef = React.memo(function MangaElementDef(props: {
    src: Manga,
    isRefetching?: boolean,
    refetch?: () => void
}) {
    return (
        <motion.div
            whileHover={{
                scale: 1.04
            }}
            style={{
                width: "fit-content"
            }}
        >
            <ErrorBoundary>
                <MangaContextMenu
                    mangaId={props.src.get_id()}
                    refetch={props.refetch}
                >
                    <Vanilla
                        src={props.src}
                        isRefetching={props.isRefetching}
                    />
                </MangaContextMenu>
            </ErrorBoundary>
        </motion.div >
    );
});

export default MangaElementDef;