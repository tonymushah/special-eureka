import React from "react";
import { get_manga_byId, useMangaDownload_Delete } from "../../../hooks/MangaStateHooks";
import ErrorEL1 from "../../error/ErrorEL1";
import MangaFallback2 from "./MangaElement2Fallback";
const MangaElementDef2 = React.lazy(() => import("./MangaElementDef2"));

export default function MangaElementDef2_withID(props: {
    mangaID: string
}) {
    const { query } = get_manga_byId({
        mangaID : props.mangaID
    });
    const { delete_, download_ } = useMangaDownload_Delete(props);
    if (query.isLoading) {
        return (
            <MangaFallback2 />
        )
    }
    if (query.isError) {
        return (
            <ErrorEL1 error={query.error} />
        )
    }
    return (
        <React.Suspense fallback={
            <MangaFallback2 />
        }>
            <MangaElementDef2
                src={query.data!}
                isRefetching={query.isRefetching}
                refetch={query.refetch}
                download={download_.mutate}
                delete={delete_.mutate}
            />
        </React.Suspense>

    )
}