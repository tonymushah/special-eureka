import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Statistics_Manga } from "@mangadex/api/structures/Statistics";
import Statis from "@mangadex/resources/componnents/mangas/Statistics/Statis";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import * as FontAwesome from "react-icons/fa";
import { NumericFormat } from "react-number-format";
import { MangaPageProps } from ".";

export function Manga_Page_Statis(props: React.PropsWithChildren<MangaPageProps>) {
    const client = useHTTPClient();
    const manga_statistics = useQuery<Statistics_Manga, Error>(["mdx", "manga", props.src.get_id(), "statistics"], () => {
        return Statistics_Manga.get_statsBy_MangaID(props.src.get_id(), client);
    }, {
        staleTime: Infinity
    });
    return (
        <Chakra.Box
            display={{
                base: "inherit",
                lg: "none"
            }}
        >
            {manga_statistics.isLoading ? (
                <Chakra.Skeleton
                    height={"20px"}
                    width={"md"} />
            ) : (
                manga_statistics.isError ? (
                    <Chakra.Alert status={"error"}>
                        <Chakra.AlertIcon />
                        <Chakra.AlertTitle>Error on loading Stats</Chakra.AlertTitle>
                        <Chakra.AlertDescription>{manga_statistics.error.message}</Chakra.AlertDescription>
                    </Chakra.Alert>
                ) : (
                    manga_statistics.isSuccess == true ? (
                        <React.Fragment>
                            <Statis src={manga_statistics.data}>
                                {(getted: Statistics_Manga) => (
                                    <Chakra.Box>
                                        <Chakra.Box display={{
                                            base: "none",
                                            xl: "block"
                                        }}>
                                            <Chakra.Box display={"flex"} width={"fit-content"}>
                                                <Chakra.Text textAlign={"center"}>
                                                    <ChakraIcons.StarIcon />
                                                    &nbsp;
                                                    {getted.get_average()}
                                                </Chakra.Text>
                                                &nbsp;
                                                &nbsp;
                                                <Chakra.Text textAlign={"center"}>
                                                    <Chakra.Icon as={FontAwesome.FaBookmark} />
                                                    &nbsp;
                                                    <NumericFormat valueIsNumericString={true} value={getted.get_follows()} displayType={"text"} />
                                                </Chakra.Text>
                                                &nbsp;
                                                &nbsp;
                                                <Chakra.Text textAlign={"center"}>
                                                    <ChakraIcons.ChatIcon />
                                                    &nbsp;
                                                    {getted.comments !== undefined && getted.comments !== null ? (
                                                        <>{getted.comments.repliesCount}</>
                                                    ) : (
                                                        <>0</>
                                                    )}
                                                </Chakra.Text>
                                            </Chakra.Box>
                                        </Chakra.Box>
                                        <Chakra.Box display={{
                                            base: "block",
                                            xl: "none"
                                        }}>
                                            <Chakra.Tag>Stats</Chakra.Tag>
                                        </Chakra.Box>
                                    </Chakra.Box>
                                )}
                            </Statis>
                        </React.Fragment>
                    ) : (
                        <React.Fragment/>
                    )
                )
            )}
        </Chakra.Box>
    );
}
