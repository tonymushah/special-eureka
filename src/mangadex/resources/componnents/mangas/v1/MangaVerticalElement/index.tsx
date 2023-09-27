import { Manga } from "@mangadex/api/structures/Manga";
import Vanilla from "./vanilla";
import ErrorBoundary from "./error";
import { motion } from "framer-motion";

export default function MangaVerticalElement(props: {
    src: Manga,
    isRefetching?: boolean,
    refetch?: () => void
}) {
    return (
        <motion.div
            whileHover={{
                scale: 1.03
            }}
            style={{
                width: "fit-content"
            }}
        >
            <ErrorBoundary>
                <Vanilla {...props} />
            </ErrorBoundary>
        </motion.div>
    );
}