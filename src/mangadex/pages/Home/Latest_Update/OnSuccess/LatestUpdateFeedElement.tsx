import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import MangaElementFallback from "@mangadex/resources/componnents/mangas/v1/MangaElementFallback";

const MangaFeedElement = React.lazy(() => import("@mangadex/resources/componnents/chapter/v1/MangaFeedElement"));

export function LatestUpdateFeedElement({ value }: {
    value: Chapter;
}) {
    return (
        <Chakra.WrapItem>
            <React.Suspense
                fallback={<MangaElementFallback />}
            >
                <MangaFeedElement src={value} />
            </React.Suspense>
        </Chakra.WrapItem>
    );
}
