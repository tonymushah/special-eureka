import React from "react";
import * as Chakra from "@chakra-ui/react";
import * as ChakraIcons from "@chakra-ui/icons";
import Mangadex_placeHolder from "../../../imgs/cover-placeholder.png";
import Mangadex_cover_not_found from "../../../imgs/cover-not-found.jpg";
import { Manga } from "../../../../api/structures/Manga";
import { useQuery } from "react-query";
import { Alt_title, Lang_and_Data, make_first_UpperCare } from "../../../../api/internal/Utils";
import { Await } from "react-router-dom";
import { ErrorELAsync } from "../../Error_cmp";
import { FaChalkboardTeacher } from "react-icons/fa";

export default function MangaElementDef(props: {
    src: Manga,
    isRefetching? : boolean
}) {
    let title: string = "";
    const cover_key = "mdx-manga_cover-" + props.src.get_id();
    const coverQuery = useQuery(cover_key , () => {
        return props.src.get_cover_art()
    },{
        "staleTime": Infinity
    });
    const CoverElementVertical = React.lazy(() => import("../../covers/v1/CoverElementVertical"));
    const CoverElementVertical2 = React.lazy(() => import("../../covers/v1/CoverElementVertical2"));
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
            backgroundColor={props.isRefetching == undefined? (
                props.src.get_status() == "ongoing" ? "green.100" : (
                    props.src.get_status() == "completed"? "blue.100" : (
                        props.src.get_status() == "hiatus" ? "orange.100" : (
                            props.src.get_status() == "cancelled"? "red.100" : "gray.100"
                        )
                    )
                )
            ) : (props.isRefetching? "yellow.100" : (
                props.src.get_status() == "ongoing" ? "green.100" : (
                    props.src.get_status() == "completed"? "blue.100" : (
                        props.src.get_status() == "hiatus" ? "orange.100" : (
                            props.src.get_status() == "cancelled"? "red.100" : "gray.100"
                        )
                    )
                )
            ))}
            borderRadius={"10px"}
            _hover={{
                backgroundColor : (
                    props.isRefetching == undefined? (
                        props.src.get_status() == "ongoing" ? "green.200" : (
                            props.src.get_status() == "completed"? "blue.200" : (
                                props.src.get_status() == "hiatus" ? "orange.200" : (
                                    props.src.get_status() == "cancelled"? "red.200" : "gray.200"
                                )
                            )
                        )
                    ) : (props.isRefetching? "yellow.200" : (
                        props.src.get_status() == "ongoing" ? "green.200" : (
                            props.src.get_status() == "completed"? "blue.200" : (
                                props.src.get_status() == "hiatus" ? "orange.200" : (
                                    props.src.get_status() == "cancelled"? "red.200" : "gray.200"
                                )
                            )
                        )
                    ))
                )
            }}
        >
            <Chakra.Center>
                <Chakra.Box
                    display={
                        {
                            base: "inline-block",
                            md: "none"
                        }
                    }
                    width={"150px"}
                >
                    {
                        coverQuery.isLoading? (<Chakra.Skeleton
                                borderTopRadius={"10px"}
                                height={"150px"}
                            />) : null
                    }
                    {
                        coverQuery.isError? (<Chakra.Image
                                    src={Mangadex_cover_not_found}
                                    fallbackSrc={Mangadex_placeHolder}
                                    borderTopRadius={"10px"}
                                />) : null
                    }
                    {
                        coverQuery.isSuccess? (
                            <React.Suspense
                                fallback={
                                    <Chakra.Skeleton
                                        borderTopRadius={"10px"}
                                        height={"150px"}
                                    />
                                }
                            >
                                <CoverElementVertical src={coverQuery.data} />
                            </React.Suspense>
                        ) : null
                    }
                    <Chakra.Center>
                        <Chakra.Heading
                            //textAlign={"center"}
                            size={"md"}
                            noOfLines={2}
                            margin={"15px"}
                        > {title} </Chakra.Heading>
                    </Chakra.Center>
                </Chakra.Box>
                <Chakra.Box
                    width={"fit-content"}
                    display={
                        {
                            base: "none",
                            md: "inline-block"
                        }
                    }
                >
                    <Chakra.Grid
                        width={{
                            base: "24em"
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
                                coverQuery.isLoading? (<Chakra.Skeleton
                                        borderTopLeftRadius={"10px"}
                                        borderBottomLeftRadius={"10px"}
                                        height={"full"}
                                    />) : null
                            }
                            {
                                coverQuery.isError? (<Chakra.Image
                                            src={Mangadex_cover_not_found}
                                            fallbackSrc={Mangadex_placeHolder}
                                            borderTopLeftRadius={"10px"}
                                            borderBottomLeftRadius={"10px"}
                                        />) : null
                            }
                            {
                                coverQuery.isSuccess? (
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
                            <Chakra.Heading
                                noOfLines={2}
                                marginTop={"5px"}
                                fontSize={
                                    {
                                        base : "xl"
                                    }
                                }
                                marginBottom={0}
                            > {title} </Chakra.Heading>
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
                                                props.src.get_status() == "completed"? "blue" : (
                                                    props.src.get_status() == "hiatus" ? "orange" : (
                                                        props.src.get_status() == "cancelled"? "red" : "teal"
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
                            <React.Suspense
                                fallback={
                                    <Chakra.Skeleton
                                        height={"full"}
                                        //borderTopLeftRadius={"10px"}
                                        borderBottomRightRadius={"10px"}
                                    />
                                }
                            >
                                <Await
                                    resolve={Lang_and_Data.initializeByDesc(props.src.get_description())}
                                    errorElement={<ErrorELAsync />}
                                    children={(getted: Array<Lang_and_Data>) => {
                                        return (
                                            <Chakra.Text
                                                noOfLines={3}
                                                marginBottom={"1px"}
                                                fontSize={"sm"}
                                            >
                                                {getted[0].get_data()}
                                            </Chakra.Text>
                                        );
                                    }}
                                />
                            </React.Suspense>
                        </Chakra.GridItem>
                    </Chakra.Grid>
                </Chakra.Box>
            </Chakra.Center>
        </Chakra.Box>
    )
}