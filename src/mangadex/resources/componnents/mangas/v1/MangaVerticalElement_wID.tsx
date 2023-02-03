import React from "react";
import { get_manga_byId, useMangaDownload_Delete } from "../../../hooks/MangaStateHooks";
import ErrorEL1 from "../../error/ErrorEL1";
import MangaVerticalElementFallback from "./MangaVerticalElementFallback";

const MangaVerticalElement = React.lazy(() => import("./MangaVerticalElement"));

export default function MangaVerticalElement_wID(props: {
    mangaID: string
}) {
    const { query } = get_manga_byId({
        mangaID : props.mangaID
    });
    const { delete_, download_ } = useMangaDownload_Delete(props);
    if (query.isLoading) {
        return (
            <MangaVerticalElementFallback />
        )
    }
    if (query.isError) {
        return (
            <ErrorEL1 error={query.error} />
        )
    }
    return (
        <React.Suspense fallback={
            <MangaVerticalElementFallback />
        }>
            <MangaVerticalElement 
                src={query.data!}
                isRefetching={query.isRefetching}
                refetch={query.refetch}
                download={download_.mutate}
                delete={delete_.mutate}
            />
        </React.Suspense>
    )
}