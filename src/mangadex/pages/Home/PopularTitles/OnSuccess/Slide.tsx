import MangaFallback2 from "@mangadex/resources/componnents/mangas/v1/MangaElement2Fallback";
import { GetMangaByIDResponse, Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Heading } from "@chakra-ui/react";

const MangaPopularElement = React.lazy(() => import("@mangadex/resources/componnents/mangas/v1/MangadexPopularElement"));

export function Slide({
    value, index
}: {
    value: Manga_with_allRelationship;
    index: number;
}) {
    const queryClient = useQueryClient();
    React.useEffect(() => {
        queryClient.setQueryData<GetMangaByIDResponse>(["mdx", "manga", value.get_id()], {
            isOffline: false,
            manga: value
        });
    }, []);
    return (
        <React.Fragment>
            {index == 0 ? (
                <Heading m={2} fontFamily={"inherit"} color={"orange"} size={"sm"}>No.{index + 1}</Heading>
            ) : (
                <Heading m={2} fontFamily={"inherit"} size={"sm"}>No.{index + 1}</Heading>
            )}
            <React.Suspense
                fallback={<MangaFallback2 />}
            >
                <MangaPopularElement src={value} />
            </React.Suspense>
        </React.Fragment>
    );
}
