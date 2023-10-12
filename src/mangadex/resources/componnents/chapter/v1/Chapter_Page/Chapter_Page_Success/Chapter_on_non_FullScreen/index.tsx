import * as Chakra from "@chakra-ui/react";
import { GetMangaByIDResponse } from "@mangadex/api/structures/Manga";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import get_manga_byId from "@mangadex/resources/hooks/MangaStateHooks/get_manga_byId";
import { UseQueryOptions } from "@tanstack/react-query";
import React from "react";
import { FaUsers } from "react-icons/fa";
import ChapterMangaTitle from "./ChapterMangaTitle";
import Groups from "./Groups";
import LangIcon from "./LangIcon";
import ReadingState from "./ReadingState";
import Title from "./Title";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";

const ReadingOptions = React.lazy(() => import("../../ReadingOption"));

export function getMangaByID__(props: {
    manga_id: string,
    options?: Omit<UseQueryOptions<GetMangaByIDResponse, Error>, "queryKey" | "queryFn">
}) {
    const { query } = get_manga_byId({
        mangaID: props.manga_id,
        options: props.options
    });
    return query;
}


export default function Chapter_on_non_FullScreen() {
    return (
        <Chakra.Box
            as={ChakraContainer}
        >
            <Chakra.VStack display={"block"}>
                <React.Fragment>
                    <Chakra.Heading
                        size={{
                            base: "sm",
                            md: "md"
                        }}
                        noOfLines={1}
                        fontFamily={"inherit"}
                    >
                        <ChapterMangaTitle />
                    </Chakra.Heading>
                </React.Fragment>
                <React.Fragment>
                    <Chakra.HStack>
                        <FaUsers />
                        <Groups />
                    </Chakra.HStack>
                </React.Fragment>
                <Chakra.Grid templateColumns={"repeat(3, 1fr)"}>
                    <Chakra.GridItem>
                        <Chakra.HStack alignItems={"center"}>
                            <LangIcon />
                            <Title />
                        </Chakra.HStack>
                    </Chakra.GridItem>
                    <Chakra.GridItem>
                        <ReadingState />
                    </Chakra.GridItem>
                    <Chakra.GridItem>
                        <React.Suspense
                            fallback={<MangadexSpinner/>}
                        >
                            <ReadingOptions />
                        </React.Suspense>
                    </Chakra.GridItem>
                </Chakra.Grid>
            </Chakra.VStack>
        </Chakra.Box>
    );
}