import Manga from "@mangadex/api/structures/Manga";
import ErrorBoundary from "./error";
import Vanilla from "./vanilla";

export default function MangaElementDef2_withChildren(props: React.PropsWithChildren<{
    src: Manga,
    isRefetching?: boolean,
    refetch?: () => void,
    download?: () => void,
    delete?: () => void,
    update?: () => void
}>){
    return (
        <ErrorBoundary>
            <Vanilla {...props}/>
        </ErrorBoundary>
    );
}