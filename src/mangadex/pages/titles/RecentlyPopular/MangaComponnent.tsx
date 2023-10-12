import * as Chakra from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import Collection from "@mangadex/api/structures/Collection";
import Manga from "@mangadex/api/structures/Manga";
import MangaFallback2 from "@mangadex/resources/componnents/mangas/v1/MangaElement2Fallback";
import get_manga_byId from "@mangadex/resources/hooks/MangaStateHooks/get_manga_byId";
import React from "react";
import { MangaPopularElement } from ".";

export function MangaComponnent({ value, data, index }: { value: Manga; data: Collection<Manga>; index: number; }) {
    const { query } = get_manga_byId({
        mangaID: value.get_id(),
        options: {
            initialData: {
                "isOffline": false,
                manga: value
            }
        }
    });
    if (query.data != undefined) {
        return (
            <Chakra.Card key={query.data.manga.get_id()}>
                {data.get_offset() + index == 0 ? (
                    <Heading m={2} fontFamily={"inherit"} color={"orange"} size={"sm"}>No.{data.get_offset() + index + 1}</Heading>
                ) : (
                    <Heading m={2} fontFamily={"inherit"} size={"sm"}>No.{data.get_offset() + index + 1}</Heading>
                )}
                <React.Suspense
                    fallback={<MangaFallback2 />}
                >
                    <MangaPopularElement src={value} />
                </React.Suspense>
            </Chakra.Card>
        );
    } else {
        return (
            <Chakra.Card key={value.get_id()}>
                {data.get_offset() + index == 0 ? (
                    <Heading m={2} fontFamily={"inherit"} color={"orange"} size={"sm"}>No.{data.get_offset() + index + 1}</Heading>
                ) : (
                    <Heading m={2} fontFamily={"inherit"} size={"sm"}>No.{data.get_offset() + index + 1}</Heading>
                )}
                <MangaFallback2 />
            </Chakra.Card>
        );
    }
}

