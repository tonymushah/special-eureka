import React from "react";
import get_manga_byId from "@mangadex/resources/hooks/MangaStateHooks/get_manga_byId";
import MangaFallback2 from "@mangadex/resources/componnents/mangas/v1/MangaElement2Fallback";

const MangaPopularElement = React.lazy(() => import("@mangadex/resources/componnents/mangas/v1/MangadexPopularElement"));

const MangaPopularElementByMangaId = React.memo(function MangaPopularElementByMangaId(props: {
    mangaID: string
}) {
    const { query } = get_manga_byId({
        mangaID: props.mangaID
    });
    if (query.isSuccess == true) {
        return (
            <React.Suspense
                fallback={
                    <MangaFallback2 />
                }
            >
                <MangaPopularElement src={query.data} />
            </React.Suspense>
        );
    } else {
        return (
            <MangaFallback2 />
        );
    }
});

export default MangaPopularElementByMangaId;
