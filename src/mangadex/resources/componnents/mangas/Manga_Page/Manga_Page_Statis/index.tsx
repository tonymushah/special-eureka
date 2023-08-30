import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import formatNumber from "@commons-res/functions/formatNumber";
import { Statistics_Manga } from "@mangadex/api/structures/Statistics";
import Statis from "@mangadex/resources/componnents/mangas/Statistics/Statis";
import React from "react";
import * as FontAwesome from "react-icons/fa";
import { MangaPageProps } from "..";
import { useState } from "./useState";

export function Manga_Page_Statis(props: React.PropsWithChildren<MangaPageProps>) {
    const manga_statistics = useState(props);
    return (
        <Chakra.Box>
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
                                            <Chakra.HStack>
                                                <Chakra.HStack >
                                                    <ChakraIcons.StarIcon />
                                                    <Chakra.Text as="span">{getted.get_average()}</Chakra.Text>
                                                </Chakra.HStack>
                                                <Chakra.HStack>
                                                    <Chakra.Icon as={FontAwesome.FaBookmark} />
                                                    <Chakra.Text as={"span"}>
                                                        {
                                                            formatNumber(getted.get_follows())
                                                        }
                                                    </Chakra.Text>
                                                </Chakra.HStack>
                                                <Chakra.HStack>
                                                    <ChakraIcons.ChatIcon />
                                                    <Chakra.Text>
                                                        {getted.comments !== undefined && getted.comments !== null ? (
                                                            <React.Fragment>{getted.comments.repliesCount}</React.Fragment>
                                                        ) : (
                                                            <React.Fragment>0</React.Fragment>
                                                        )}
                                                    </Chakra.Text>
                                                </Chakra.HStack>
                                            </Chakra.HStack>
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
                        <React.Fragment />
                    )
                )
            )}
        </Chakra.Box>
    );
}
