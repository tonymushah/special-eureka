import Manga, { Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Heading } from "@chakra-ui/react";
import { get_mangaQueryKey_byID } from "@mangadex/resources/hooks/MangaStateHooks";
import MangaPopularElementFallback from "@mangadex/resources/componnents/mangas/v1/MangaPopularElementFallback";

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
                <Heading m={2} fontFamily={"inherit"} color={"orange"} size={"md"}>No.{index + 1}</Heading>
            ) : (
                <Heading m={2} fontFamily={"inherit"} size={"md"}>No.{index + 1}</Heading>
            )}
            <React.Suspense
                fallback={<MangaPopularElementFallback />}
            >
                <MangaPopularElement src={value} />
            </React.Suspense>
        </React.Fragment>
    );
}
