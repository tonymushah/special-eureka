import React from "react";
import { get_manga_byId } from "@mangadex/resources/hooks/MangaStateHooks";
import ErrorEL1 from "../../error/ErrorEL1";
import MangaFallback2 from "./MangaElement2Fallback";
const MangaElementDef2 = React.lazy(() => import("./MangaElementDef2"));

export default function MangaElementDef2_withID(props: {
    mangaID: string
}) {
    const { query } = get_manga_byId({
        mangaID: props.mangaID
    });
    if (query.isSuccess) {
        return (
            <React.Suspense fallback={
                <MangaFallback2 />
            }>
                <MangaElementDef2
                    src={query.data.manga}
                    isRefetching={query.isRefetching}
                    refetch={query.refetch}
                />
            </React.Suspense>
        );
    } else if (query.isError) {
        return (
            <ErrorEL1 error={query.error} />
        );
    } else {
        return (
            <MangaFallback2 />
        );
    }
}