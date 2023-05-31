import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import React from "react";
import { FaBookmark } from "react-icons/fa";
import { NumericFormat } from "react-number-format";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getMangaDexPath } from "@mangadex";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import TryCatch from "@commons-res/components/TryCatch";
import { ContentRating, make_first_UpperCare } from "@mangadex/api/internal/Utils";
import { Manga } from "@mangadex/api/structures/Manga";
import { Statistics_Manga } from "@mangadex/api/structures/Statistics";
import { get_manga_description } from "@mangadex/resources/hooks/MangaStateHooks";
import CoverImageByCoverID from "../../covers/v1/CoverImageByCoverID";
import ErrorEL1 from "../../error/ErrorEL1";
import IsPingable from "../../IsPingable";
import MangaContextMenu from "./MangaContextMenu";
import MangaTitle from "./MangaTitle";

const Statis = React.lazy(() => import("../Statistics/Statis"));

const MangaDexPath = getMangaDexPath();

function MangaElementDef2_Stats(props: {
    src: Manga
}) {
    const client = useHTTPClient();
    const manga_statistic_queryKey = ["mdx", "manga", props.src.get_id(), "statistics"];
    const manga_statistic_query = useQuery<Statistics_Manga, Error>(manga_statistic_queryKey, () => {
        return Statistics_Manga.get_statsBy_MangaID(props.src.get_id(), client);
    }, {
        staleTime: Infinity
    });
    return (
        <React.Fragment>
            {
                manga_statistic_query.isSuccess ? (
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
                                                <Chakra.HStack spacing={"5px"}>
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
                                                                    getted.get_comments()!.repliesCount !== null && getted.get_comments()!.repliesCount !== undefined ? (
                                                                        <>{getted.get_comments()!.repliesCount}</>
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

                ) : (
                    <Chakra.Skeleton height={"10px"} width={"20px"} />
                )
            }
        </React.Fragment>
    );
}

export default function MangaElementDef2(props: {
    src: Manga,
    isRefetching?: boolean,
    refetch?: () => void
}) {

    const client = useHTTPClient();"mdx-manga:" + props.src.get_id() + "-statistics"
    const {
        manga_description_query
    } = get_manga_description({
        src: props.src
    });
    const card_maxHeight: Chakra.ResponsiveValue<any> = {
        base: "10em"
    };
    const card_minHeight: Chakra.ResponsiveValue<any> = {
        base: ""
    };
    function build_themes_manga(): Array<React.ReactNode> {
        let index = 0;
        const returns: Array<React.ReactNode> = [];
        if (props.src.get_ranting() != undefined && props.src.get_ranting() != ContentRating.safe()) {
            if (props.src.get_ranting() == ContentRating.suggestive()) {
                returns[index] = (<Chakra.Tag colorScheme={"green"}>{make_first_UpperCare(props.src.get_ranting())}</Chakra.Tag>);
            } else {
                returns[index] = (<Chakra.Tag colorScheme={"red"}>{make_first_UpperCare(props.src.get_ranting())}</Chakra.Tag>);
            }
            index = index + 1;
        }
        for (let index1 = 0; index1 < props.src.get_tags().length; index1++) {
            const element = props.src.get_tags()[index1];
            returns[index + index1] = (<Chakra.Tag colorScheme={"gray"}>{element.get_name().en}</Chakra.Tag>);
        }
        return returns;
    }
    return (
        <MangaContextMenu
            mangaId={props.src.get_id()}
            refetch={props.refetch}
        >
            <Chakra.Card maxHeight={card_maxHeight} direction={"row"} overflowY={"hidden"} minWidth={"sm"} border={"1px"} borderColor={"#cccccc"}>
                <CoverImageByCoverID coverID={props.src.get_cover_art_id()} isThumbail size={512} image_props={{
                    maxHeight: card_maxHeight,
                    "objectFit": "contain"
                }} />
                <Chakra.Stack spacing={"0px"}>
                    <Chakra.CardBody marginTop={"0px"}>
                        <Chakra.HStack spacing={"5px"}>
                            <TryCatch
                                catch={() => (
                                    <Chakra.Heading fontFamily={"inherit"} marginBottom={"0px"} size={"md"} noOfLines={1}><MangaTitle src={props.src} /></Chakra.Heading>
                                )}
                            >
                                <Chakra.Link 
                                    as={Link}
                                    to={MangaDexPath + "/manga/" + props.src.get_id()}
                                    color={"black"}
                                    textDecoration={"none"}
                                    _hover={{
                                        color: "orange",
                                        textDecoration: "none"
                                    }}
                                >
                                    <Chakra.Heading fontFamily={"inherit"} marginBottom={"0px"} size={"md"} noOfLines={1}><MangaTitle src={props.src} /></Chakra.Heading>
                                </Chakra.Link>
                            </TryCatch>
                            <IsPingable
                                client={client}
                                onError={() => (
                                    <></>
                                )}
                                onSuccess={() => (
                                    <MangaElementDef2_Stats src={props.src} />
                                )}
                                onLoading={<Chakra.Skeleton height={"10px"} width={"20px"} />}
                            />
                            <Chakra.Text
                                padding={0}
                                margin={0}
                                fontSize={"xs"}
                            >
                                <Chakra.HStack
                                    display={{
                                        base: "none",
                                        xl: "inline"
                                    }}
                                >
                                    Publication :
                                    &nbsp;
                                </Chakra.HStack>
                                <Chakra.Tag
                                    fontSize={"xs"}
                                    colorScheme={
                                        props.src.get_status() == "ongoing" ? "green" : (
                                            props.src.get_status() == "completed" ? "blue" : (
                                                props.src.get_status() == "hiatus" ? "orange" : (
                                                    props.src.get_status() == "cancelled" ? "red" : "teal"
                                                )
                                            )
                                        )
                                    }
                                    variant={"solid"}
                                >
                                    <Chakra.TagLabel>{make_first_UpperCare(props.src.get_status())}</Chakra.TagLabel>
                                </Chakra.Tag>
                            </Chakra.Text>
                        </Chakra.HStack>
                        <Chakra.Box textAlign={"start"}>
                            <Chakra.Box noOfLines={1}>
                                {
                                    build_themes_manga()
                                }
                            </Chakra.Box>

                            {
                                manga_description_query.isLoading ? (
                                    <Chakra.Skeleton
                                        height={"full"}
                                        width={"full"}
                                    />
                                ) : (
                                    manga_description_query.isSuccess ? (
                                        manga_description_query.data.length == 0 ? (
                                            <></>
                                        ) : (
                                            <Chakra.Text
                                                noOfLines={3}
                                                marginBottom={"1px"}
                                                fontSize={"md"}
                                            >
                                                {manga_description_query.data[0].get_data()}
                                            </Chakra.Text>
                                        )
                                    ) : (
                                        manga_description_query.isError ? (
                                            <ErrorEL1 error={manga_description_query.error} />
                                        ) : (
                                            <></>
                                        )
                                    )
                                )
                            }
                        </Chakra.Box>

                    </Chakra.CardBody>
                </Chakra.Stack>
            </Chakra.Card>
        </MangaContextMenu>
    );
}
