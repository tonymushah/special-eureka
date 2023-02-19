import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { getMangaDexPath } from "../../../../..";
import TryCatch from "../../../../../../commons-res/components/TryCatch";
import { Alt_title, make_first_UpperCare } from "../../../../../api/internal/Utils";
import { Manga } from "../../../../../api/structures/Manga";
import { get_manga_description, get_manga_page_cover } from "../../../../hooks/MangaStateHooks";
import Mangadex_cover_not_found from "../../../../imgs/cover-not-found.jpg";
import Mangadex_placeHolder from "../../../../imgs/cover-placeholder.png";
import ErrorEL1 from "../../../error/ErrorEL1";

const CoverElementVertical2 = React.lazy(() => import("../../../covers/v1/CoverElementVertical2"));

const MangaDexPath = getMangaDexPath();

export default function MangaElementDef_without_Context_Menu(props: {
    src: Manga,
    isRefetching?: boolean
}){
    let title: string = "";
    const {
        coverQuery,
    } = get_manga_page_cover({
        src : props.src
    });
    const {
        manga_description_query
    } = get_manga_description({
        src : props.src
    });
    //let desc: string = "";
    if (props.src.get_title().en == null) {
        title = new Alt_title(props.src.get_alt_title()).get_quicklang()!;
    } else {
        title = props.src.get_title().en;
    }
    return (
        <Chakra.Box
            display={"flex"}
            width={"min-content"}
        >
        <>
            <Chakra.LinkBox
                as={Chakra.Box}
                marginBottom={10}
                width={"min-content"}
                height={{
                    base: "min-content",
                    md: "initial"
                }}
                textAlign={"start"}
                boxSize={"min-content"}
                backgroundColor={props.isRefetching == undefined ? (
                    props.src.get_status() == "ongoing" ? "green.100" : (
                        props.src.get_status() == "completed" ? "blue.100" : (
                            props.src.get_status() == "hiatus" ? "orange.100" : (
                                props.src.get_status() == "cancelled" ? "red.100" : "gray.100"
                            )
                        )
                    )
                ) : (props.isRefetching ? "yellow.100" : (
                    props.src.get_status() == "ongoing" ? "green.100" : (
                        props.src.get_status() == "completed" ? "blue.100" : (
                            props.src.get_status() == "hiatus" ? "orange.100" : (
                                props.src.get_status() == "cancelled" ? "red.100" : "gray.100"
                            )
                        )
                    )
                ))}
                borderRadius={"10px"}
                _hover={{
                    backgroundColor: (
                        props.isRefetching == undefined ? (
                            props.src.get_status() == "ongoing" ? "green.200" : (
                                props.src.get_status() == "completed" ? "blue.200" : (
                                    props.src.get_status() == "hiatus" ? "orange.200" : (
                                        props.src.get_status() == "cancelled" ? "red.200" : "gray.200"
                                    )
                                )
                            )
                        ) : (props.isRefetching ? "yellow.200" : (
                            props.src.get_status() == "ongoing" ? "green.200" : (
                                props.src.get_status() == "completed" ? "blue.200" : (
                                    props.src.get_status() == "hiatus" ? "orange.200" : (
                                        props.src.get_status() == "cancelled" ? "red.200" : "gray.200"
                                    )
                                )
                            )
                        ))
                    )
                }}
            >
                <Chakra.Center
                >
                    <Chakra.Box
                        width={"fit-content"}
                    >
                        <Chakra.Grid
                            width={{
                                base: "23em"
                            }}
                            templateRows='repeat(3)'
                            templateColumns='repeat(12, 1fr)'
                            columnGap={3}
                            rowGap={1}
                            paddingRight={"10px"}
                        >
                            <Chakra.GridItem
                                rowSpan={2}
                                colSpan={4}
                            >
                                {
                                    coverQuery.isFetching ? (
                                        <Chakra.Image
                                            src={Mangadex_placeHolder}
                                            fallbackSrc={Mangadex_placeHolder}
                                            borderTopLeftRadius={"10px"}
                                            borderBottomLeftRadius={"10px"}
                                        />
                                    ) : (
                                        coverQuery.isLoading ? (<Chakra.Skeleton
                                            borderTopLeftRadius={"10px"}
                                            borderBottomLeftRadius={"10px"}
                                            height={"full"}
                                        />) : null
                                    )
                                }
                                {
                                    coverQuery.isError ? (<Chakra.Image
                                        src={Mangadex_cover_not_found}
                                        fallbackSrc={Mangadex_placeHolder}
                                        borderTopLeftRadius={"10px"}
                                        borderBottomLeftRadius={"10px"}
                                    />) : null
                                }
                                {
                                    coverQuery.isSuccess ? (
                                        <React.Suspense
                                            fallback={
                                                <Chakra.Skeleton
                                                    borderTopRadius={"10px"}
                                                    height={"150px"}
                                                />
                                            }
                                        >
                                            <CoverElementVertical2 src={coverQuery.data} isThumbail />
                                        </React.Suspense>
                                    ) : null
                                }
                            </Chakra.GridItem>
                            <Chakra.GridItem
                                rowSpan={1}
                                colSpan={8}
                            >
                                <TryCatch
                                    catch={() => (
                                        <Chakra.LinkOverlay
                                        //as={Link}
                                        //to={MangaDexPath + "/manga/" + props.src.get_id()}
                                        >
                                            <Chakra.Heading
                                                noOfLines={2}
                                                marginTop={"5px"}
                                                fontSize={
                                                    {
                                                        base: "xl"
                                                    }
                                                }
                                                marginBottom={0}
                                            > {title} </Chakra.Heading>
                                        </Chakra.LinkOverlay>
                                    )}
                                >
                                    <Chakra.LinkOverlay
                                        as={Link}
                                        to={MangaDexPath + "/manga/" + props.src.get_id()}
                                    >
                                        <Chakra.Heading
                                            noOfLines={2}
                                            marginTop={"5px"}
                                            fontSize={
                                                {
                                                    base: "xl"
                                                }
                                            }
                                            marginBottom={0}
                                        > {title} </Chakra.Heading>
                                    </Chakra.LinkOverlay>
                                </TryCatch>

                            </Chakra.GridItem>
                            <Chakra.GridItem
                                rowSpan={1}
                                colSpan={8}
                            >
                                <Chakra.Box>
                                    <Chakra.Text
                                        padding={0}
                                        margin={0}
                                        fontSize={"xs"}
                                    >
                                        <Chakra.Center
                                            display={"inline"}
                                        >
                                            Publication :
                                            &nbsp;
                                        </Chakra.Center>
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
                                </Chakra.Box>
                                {
                                    manga_description_query.isLoading || manga_description_query.isIdle ? (
                                        <Chakra.Skeleton
                                            height={"full"}
                                            //borderTopLeftRadius={"10px"}
                                            borderBottomRightRadius={"10px"}
                                        />
                                    ) : (
                                        manga_description_query.isSuccess ? (
                                            manga_description_query.data.length == 0 ? (
                                                <></>
                                            ) : (
                                                <Chakra.Text
                                                    noOfLines={3}
                                                    marginBottom={"1px"}
                                                    fontSize={"sm"}
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
                            </Chakra.GridItem>
                        </Chakra.Grid>

                    </Chakra.Box>
                </Chakra.Center>

            </Chakra.LinkBox>
        </>
        </Chakra.Box>
    )
}
