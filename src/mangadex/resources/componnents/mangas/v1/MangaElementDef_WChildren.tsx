import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { getMangaDexPath } from "@mangadex/index";
import TryCatch from "@commons-res/components/TryCatch";
import { Manga } from "@mangadex/api/structures/Manga";
import { get_manga_page_cover_art_image } from "@mangadex/resources/hooks/MangaStateHooks";
import Mangadex_cover_not_found from "@mangadex/resources/imgs/cover-not-found.jpg";
import Mangadex_placeHolder from "@mangadex/resources/imgs/cover-placeholder.png";
import { useProSidebar } from "react-pro-sidebar";
import { useMangaTitle } from "./MangaTitle";
import MangaContextMenu from "./MangaContextMenu";

const MangaDexPath = getMangaDexPath();

export default function MangaElementDef_WChildren(props: React.PropsWithChildren<{
    src: Manga,
    isRefetching?: boolean
}>) {
    const { collapsed, broken } = useProSidebar();
    const title = useMangaTitle({
        src : props.src
    });
    const coverQuery = get_manga_page_cover_art_image({
        src: props.src,
        isThumbail: true
    }).query;
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
    return (
        <Chakra.Box
            boxShadow={"sm"}
            marginBottom={1}
            width={"fit-content"}
            backgroundColor={props.isRefetching == undefined ? "gray.100" : (props.isRefetching ? "orange.100" : "gray.100")}
            borderRadius={"10px"}
        >
            <MangaContextMenu mangaId={props.src.get_id()}>
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
                                    {props.children}
                                </Chakra.GridItem>
                            </Chakra.Grid>

                        </Chakra.Box>
                    </Chakra.Center>
                </Laoyut>
            </MangaContextMenu>
        </Chakra.Box>
    );
}
