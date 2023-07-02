import React from "react";
import { get_manga_byId } from "@mangadex/resources/hooks/MangaStateHooks";
import MangaFallback2 from "@mangadex/resources/componnents/mangas/v1/MangaElement2Fallback";

const MangaPopularElement= React.lazy(() => import("@mangadex/resources/componnents/mangas/v1/MangadexPopularElement"));

export default function MangaPopularElementByMangaId(props: {
    mangaID: string
}) {
    const { query } = get_manga_byId({
        mangaID: props.mangaID
    });
    if (query.isSuccess == true) {
        return (
            <React.Suspense
                fallback={
                    <MangaFallback2/>
                }
            >
                <MangaPopularElement src={query.data.manga} />
            </React.Suspense>
        );
    } else {
        return (
            <MangaFallback2 />
        );
    }
}
