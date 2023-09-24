import { Manga } from "@mangadex/api/structures/Manga";
import ErrorBoundary from "./error";
import MangaElementDef2_ from "./vanilla";
import { motion } from "framer-motion";

export default function MangaElementDef2(props: {
    src: Manga,
    isRefetching?: boolean,
    refetch?: () => void
}) {
    return (
        <motion.div
            whileHover={{
                scale: 1.006
            }}
            style={{
                width: "fit-content"
            }}
        >
            <ErrorBoundary>
                <MangaElementDef2_ {...props} />
            </ErrorBoundary>
        </motion.div>
    );
}
