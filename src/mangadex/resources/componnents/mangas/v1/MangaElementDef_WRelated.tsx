import Manga from "@mangadex/api/structures/Manga";
import ErrorEL1 from "../../error/ErrorEL1";
import MangaElementDef from "./MangaElementDef";
import MangaElementFallback from "./MangaElementFallback";
import { get_manga_byId } from "@mangadex/resources/hooks/MangaStateHooks/get_manga_byId";
import { InitialDataFunction } from "@tanstack/react-query";

export default function MangaElementDef_wRelated({ mangaID, initialData }: {
    mangaID: string,
    promise: Promise<Manga>,
    initialData?: Manga | (() => Manga)
}) {
    // [x] use the predefine `get_manga_by_id` hooks
    const { query } = get_manga_byId({
        mangaID,
        options: {
            initialData: typeof initialData == "function" ? ({
                isOffline: false,
                manga: initialData()
            }) : ((typeof initialData != "undefined" && typeof initialData == "object") ? {
                isOffline: false,
                manga: initialData
            } : undefined)
        }
    });
    if (query.isSuccess) {
        return (
            <MangaElementDef src={query.data.manga} isRefetching={query.isRefetching} refetch={query.refetch} />
        );
    }
    if (query.isError) {
        return (
            <ErrorEL1 error={query.error} />
        );
    }
    return (
        <MangaElementFallback />
    );
}