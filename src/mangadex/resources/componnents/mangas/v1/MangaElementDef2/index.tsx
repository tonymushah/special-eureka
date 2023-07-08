import { Manga } from "@mangadex/api/structures/Manga";
import ErrorBoundary from "./error";
import MangaElementDef2_ from "./vanilla";

export default function MangaElementDef2(props: {
    src: Manga,
    isRefetching?: boolean,
    refetch?: () => void
}) {

    return (
        <ErrorBoundary>
            <MangaElementDef2_ {...props}/>
        </ErrorBoundary>
    );
}
