import React from "react";
import { get_manga_byId } from "@mangadex/resources/hooks/MangaStateHooks";
import ErrorEL1 from "../../error/ErrorEL1";
import MangaVerticalElementFallback from "./MangaVerticalElementFallback";

const MangaVerticalElement = React.lazy(() => import("./MangaVerticalElement"));

export default function MangaVerticalElement_wID(props: {
    mangaID: string
}) {
    const { query } = get_manga_byId({
        mangaID: props.mangaID
    });
    if (query.isSuccess) {
        return (
            <React.Suspense fallback={
                <MangaVerticalElementFallback />
            }>
                <MangaVerticalElement
                    src={query.data.manga}
                    isRefetching={query.isRefetching}
                    refetch={query.refetch}
                />
            </React.Suspense>
        );
    }
    if (query.isError) {
        return (
            <ErrorEL1 error={query.error} />
        );
    }
    return (
        <MangaVerticalElementFallback />
    );
}