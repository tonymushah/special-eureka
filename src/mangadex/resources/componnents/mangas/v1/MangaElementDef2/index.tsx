import Manga from "@mangadex/api/structures/Manga";
import ErrorBoundary from "./error";
import MangaElementDef2_ from "./vanilla";
import { motion } from "framer-motion";
import { memo } from "react";

const MangaElementDef2 = memo(function MangaElementDef2(props: {
    src: Manga,
    isRefetching?: boolean,
    refetch?: () => void
}) {
    return (
        <motion.div
            whileHover={{
                scale: 1.006
            }}
        >
            <ErrorBoundary>
                <MangaElementDef2_ {...props} />
            </ErrorBoundary>
        </motion.div>
    );
});


export default MangaElementDef2;
