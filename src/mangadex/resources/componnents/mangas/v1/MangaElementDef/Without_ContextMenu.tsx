import * as Chakra from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getMangaDexPath } from "@mangadex";
import TryCatch from "@commons-res/components/TryCatch";
import { Alt_title, make_first_UpperCare } from "@mangadex/api/internal/Utils";
import { Manga } from "@mangadex/api/structures/Manga";
import { get_manga_description, get_manga_page_cover_art_image } from "@mangadex/resources/hooks/MangaStateHooks";
import Mangadex_cover_not_found from "@mangadex/resources/imgs/cover-not-found.jpg";
import Mangadex_placeHolder from "@mangadex/resources/imgs/cover-placeholder.png";
import ErrorEL1 from "../../../error/ErrorEL1";
import { useProSidebar } from "react-pro-sidebar";
import React from "react";

const MangaDexPath = getMangaDexPath();

export default function MangaElementDef_without_Context_Menu(props: {
    src: Manga,
    isRefetching?: boolean
}) {
    const { collapsed, broken } = useProSidebar();
    let title = "";
    const coverQuery = get_manga_page_cover_art_image({
        src: props.src,
        isThumbail: true
    }).query;
    const {
        manga_description_query
    } = get_manga_description({
        src: props.src
    });
    //let desc: string = "";
    if (props.src.get_title().en == null) {
        title = new Alt_title(props.src.get_alt_title()).get_quicklang()!;
    } else {
        title = props.src.get_title().en;
    }
    function Laoyut({ children }: React.PropsWithChildren) {
        return (
            <Chakra.Box
                marginBottom={2}
                width={"min-content"}
                height={{
                    base: "min-content",
                    md: "initial"
                }}
                textAlign={"start"}
                boxSize={"min-content"}
                borderStyle={"solid"}
                border={"1px"}
                borderColor={"#cacaca"}
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
                boxShadow={"md"}
            >
                {children}
            </Chakra.Box>
        );
    }
    function Image() {
        return (
            <React.Fragment>
                {
                    coverQuery.isSuccess ? (<Chakra.Image
                        src={coverQuery.data}
                        fallbackSrc={Mangadex_placeHolder}
                        borderTopLeftRadius={"10px"}
                        borderBottomLeftRadius={"10px"}
                    />) : null
                }
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
            </React.Fragment>
        );
    }
    function Description() {
        if (manga_description_query.isLoading) {
            return (
                <Chakra.Skeleton
                    height={"full"}
                    //borderTopLeftRadius={"10px"}
                    borderBottomRightRadius={"10px"}
                />
            );
        } else {
            if (manga_description_query.isSuccess) {
                if (manga_description_query.data.length == 0) {
                    return (
                        <React.Fragment />
                    );
                } else {
                    return (
                        <Chakra.Text
                            noOfLines={3}
                            marginBottom={"1px"}
                            fontSize={collapsed && !broken ? "sm" : "xs"}
                        >
                            {manga_description_query.data[0].get_data()}
                        </Chakra.Text>
                    );
                }
            }
        }
        if (manga_description_query.isError) {
            return (
                <ErrorEL1 error={manga_description_query.error} />
            );
        } else {
            return (<React.Fragment />);
        }
    }
    function Title() {
        return (
            <Chakra.Heading
                noOfLines={2}
                marginTop={"5px"}
                fontSize={
                    {
                        base: collapsed && !broken ? "lg" : "md"
                    }
                }
                marginBottom={0}
                fontFamily={"inherit"}
                color={"black"}
                textDecoration="none"
                _hover={{
                    color: "orange",
                    textDecoration: "none"
                }}
            > {title} </Chakra.Heading>
        );
    }
    function Publication() {
        return (
            <Chakra.HStack>
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
            </Chakra.HStack>
        );
    }
    return (
        <Chakra.Box
            display={"flex"}
            width={"min-content"}
        >
            <>
                <Laoyut>
                    <Chakra.Center
                    >
                        <Chakra.Box
                            width={"fit-content"}
                        >
                            <Chakra.Grid
                                width={{
                                    base: collapsed && !broken ? "22em" : "19em"
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
                                    <Image/>
                                </Chakra.GridItem>
                                <Chakra.GridItem
                                    rowSpan={1}
                                    colSpan={8}
                                >
                                    <TryCatch
                                        catch={() => (
                                            <Chakra.Link
                                            //as={Link}
                                            //to={MangaDexPath + "/manga/" + props.src.get_id()}
                                            >
                                                <Title />
                                            </Chakra.Link>
                                        )}
                                    >
                                        <Chakra.Link
                                            as={Link}
                                            to={MangaDexPath + "/manga/" + props.src.get_id()}
                                            color={"black"}
                                            textDecoration="none"
                                            _hover={{
                                                color: "orange",
                                                textDecoration: "none"
                                            }}
                                            fontFamily={"inherit"}
                                        >
                                            <Title />
                                        </Chakra.Link>
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
                                            <Publication/>
                                        </Chakra.Text>
                                    </Chakra.Box>
                                    <Description />
                                </Chakra.GridItem>
                            </Chakra.Grid>

                        </Chakra.Box>
                    </Chakra.Center>
                </Laoyut>
            </>
        </Chakra.Box>
    );
}
