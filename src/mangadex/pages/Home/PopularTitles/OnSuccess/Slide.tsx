import MangaFallback2 from "@mangadex/resources/componnents/mangas/v1/MangaElement2Fallback";
import Manga, { Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Heading } from "@chakra-ui/react";
import { get_mangaQueryKey_byID } from "@mangadex/resources/hooks/MangaStateHooks";

const MangaPopularElement = React.lazy(() => import("@mangadex/resources/componnents/mangas/v1/MangadexPopularElement"));

export function Slide({
    value, index
}: {
    value: Manga_with_allRelationship;
    index: number;
}) {
    const queryClient = useQueryClient();
    React.useEffect(() => {
        queryClient.setQueryData<Manga>(get_mangaQueryKey_byID({
            mangaID: value.get_id()
        }), value);
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
