import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import TryCatch from "@commons-res/components/TryCatch";
import { Statistics_Manga } from "@mangadex/api/structures/Statistics";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaBookmark } from "react-icons/fa";
import { NumericFormat } from "react-number-format";
import { useProps } from "../../MangaElementDef/vanilla";

const Statis = React.lazy(() => import("../../../Statistics/Statis"));


export default function MangaElementDef2_Stats() {
    const { src } = useProps();
    const client = useHTTPClient();
    const manga_statistic_queryKey = ["mdx", "manga", src.get_id(), "statistics"];
    const manga_statistic_query = useQuery<Statistics_Manga, Error>(manga_statistic_queryKey, () => {
        return Statistics_Manga.get_statsBy_MangaID(src.get_id(), client);
    }, {
        staleTime: Infinity
    });
    if (manga_statistic_query.isSuccess) {
        return (
            <TryCatch
                catch={(error: Error) => (
                    <Chakra.Tag>{error.message}</Chakra.Tag>
                )}
            >
                <React.Suspense>
                    <Statis src={manga_statistic_query.data}>
                        {
                            (getted: Statistics_Manga) => (
                                <Chakra.Box>
                                    <Chakra.HStack display={{
                                        base: "none",
                                        xl: "inherit"
                                    }}>
                                        <Chakra.HStack spacing={"4px"}>
                                            <Chakra.HStack spacing={"4px"}>
                                                <ChakraIcons.StarIcon />
                                                <Chakra.Text as={"span"}>{getted.get_average()}</Chakra.Text>
                                            </Chakra.HStack>
                                            <Chakra.HStack spacing={"4px"}>
                                                <Chakra.Icon as={FaBookmark} />
                                                <NumericFormat valueIsNumericString={true} value={getted.get_follows()} displayType={"text"} />
                                            </Chakra.HStack>
                                            <Chakra.HStack spacing={"4px"}>
                                                <ChakraIcons.ChatIcon />
                                                {
                                                    getted.get_comments() !== undefined && getted.get_comments() !== null ? (
                                                        <Chakra.Text as={"span"}>{
                                                            getted.get_comments()?.repliesCount !== null && getted.get_comments()?.repliesCount !== undefined ? (
                                                                <>{getted.get_comments()?.repliesCount}</>
                                                            ) : (
                                                                <>0</>
                                                            )
                                                        }</Chakra.Text>
                                                    ) :
                                                        <Chakra.Text as={"span"}>0</Chakra.Text>
                                                }
                                            </Chakra.HStack>
                                        </Chakra.HStack>
                                    </Chakra.HStack>
                                    <Chakra.Box display={{
                                        base: "inherit",
                                        xl: "none"
                                    }}>
                                        <Chakra.Tag>Stats</Chakra.Tag>
                                    </Chakra.Box>
                                </Chakra.Box>
                            )
                        }
                    </Statis>
                </React.Suspense>
            </TryCatch>
        );
    } else {
        return (
            <Chakra.Skeleton height={"10px"} width={"20px"} />
        );
    }
}
