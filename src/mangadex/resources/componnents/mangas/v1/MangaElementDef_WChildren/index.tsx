import { Manga } from "@mangadex/api/structures/Manga";
import ErrorBoundary from "./error";
import Vanilla from "./vanilla";

export default function MangaElementDef_WChildren(props: React.PropsWithChildren<{
    src: Manga,
    isRefetching?: boolean
}>) {
    return (
        <ErrorBoundary>
            <Vanilla {...props}/>
        </ErrorBoundary>
    );
}