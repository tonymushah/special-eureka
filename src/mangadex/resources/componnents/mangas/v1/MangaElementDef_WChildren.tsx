import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { getMangaDexPath } from "../../../..";
import TryCatch from "../../../../../commons-res/components/TryCatch";
import { Alt_title } from "../../../../api/internal/Utils";
import { Manga } from "../../../../api/structures/Manga";
import { get_manga_page_cover } from "../../../hooks/MangaStateHooks";
import Mangadex_cover_not_found from "../../../imgs/cover-not-found.jpg";
import Mangadex_placeHolder from "../../../imgs/cover-placeholder.png";
const CoverElementVertical2 = React.lazy(() => import("../../covers/v1/CoverElementVertical2"));

const MangaDexPath = getMangaDexPath();

export default function MangaElementDef_WChildren(props: React.PropsWithChildren<{
    src: Manga,
    isRefetching?: boolean
}>) {
    let title: string = "";
    const { coverQuery } = get_manga_page_cover({
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
            marginBottom={10}
            width={"fit-content"}
            backgroundColor={props.isRefetching == undefined ? "gray.100" : (props.isRefetching ? "orange.100" : "gray.100")}
            borderRadius={"10px"}
        >
            <Chakra.Center>
                <Chakra.Box
                    width={"fit-content"}
                    display={
                        {
                            base: "inline-block"
                        }
                    }
                >
                    <Chakra.Grid
                        width={{
                            base: "400px"
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
                                coverQuery.isLoading ? (<Chakra.Skeleton
                                    borderTopLeftRadius={"10px"}
                                    borderBottomLeftRadius={"10px"}
                                    height={"full"}
                                />) : null
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
                                        <CoverElementVertical2 src={coverQuery.data} />
                                    </React.Suspense>
                                ) : null
                            }
                        </Chakra.GridItem>
                        <Chakra.GridItem
                            rowSpan={1}
                            colSpan={8}
                        >
                            <TryCatch
                                catch={(error) => (
                                    <Chakra.Link
                                        //as={Link}
                                        //to={MangaDexPath + "/manga/" + props.src.get_id()}
                                    >
                                        <Chakra.Heading
                                            noOfLines={2}
                                            marginTop={"5px"}
                                            size={
                                                {
                                                    base: "lg",
                                                    lg: "lg"
                                                }
                                            }
                                        >
                                            {title}
                                        </Chakra.Heading>
                                    </Chakra.Link>
                                )}
                            >
                                <Chakra.Link
                                    as={Link}
                                    to={MangaDexPath + "/manga/" + props.src.get_id()}
                                >
                                    <Chakra.Heading
                                        noOfLines={2}
                                        marginTop={"5px"}
                                        size={
                                            {
                                                base: "lg",
                                                lg: "lg"
                                            }
                                        }
                                    >
                                        {title}
                                    </Chakra.Heading>
                                </Chakra.Link>
                            </TryCatch>
                            
                        </Chakra.GridItem>
                        <Chakra.GridItem
                            rowSpan={1}
                            colSpan={8}
                        >
                            {props.children!}
                        </Chakra.GridItem>
                    </Chakra.Grid>
                </Chakra.Box>
            </Chakra.Center>
        </Chakra.Box>
    )
}
