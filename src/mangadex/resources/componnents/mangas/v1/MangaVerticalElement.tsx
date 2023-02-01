import React from "react";
import * as Chakra from "@chakra-ui/react"
import { Manga } from "../../../../api/structures/Manga";
import { Alt_title } from "../../../../api/internal/Utils";
import { useQuery } from "react-query";
import Mangadex_placeHolder from "../../../imgs/cover-placeholder.png";
import Mangadex_cover_not_found from "../../../imgs/cover-not-found.jpg";
import CoverElementVertical from "../../covers/v1/CoverElementVertical";
import ReactContextMenu from "react-jsx-context-menu"
import * as ChakraIcons from "@chakra-ui/icons";
import TryCatch from "../../../../../commons-res/components/TryCatch";
import { Link } from "react-router-dom";
import { useHTTPClient } from "../../../../../commons-res/components/HTTPClientProvider";

export default function MangaVerticalElement(props: {
    src: Manga,
    isRefetching?: boolean,
    refetch?: Function,
    download?: Function,
    delete?: Function,
    update?: Function
}) {
    let title: string = "";
    const client = useHTTPClient();
    const cover_key = "mdx-cover-" + props.src.get_cover_art_id();
    const coverQuery = useQuery(cover_key, () => {
        return props.src.get_cover_art(client);
    }, {
        "staleTime": Infinity
    });
    //let desc: string = "";
    if (props.src.get_title().en == null) {
        title = new Alt_title(props.src.get_alt_title()).get_quicklang()!;
    } else {
        title = props.src.get_title().en;
    }
    return (
        <ReactContextMenu
            menu={
                <Chakra.Menu
                    isOpen
                >
                    <Chakra.MenuList>
                        <Chakra.MenuItem
                            onClick={() => props.refetch!()}
                        >Refresh</Chakra.MenuItem>
                        <Chakra.MenuItem
                            onClick={() => props.download!()}
                            textColor={"green"}
                            icon={<ChakraIcons.DownloadIcon />}
                        >
                            Download
                        </Chakra.MenuItem>
                        <Chakra.MenuItem
                            onClick={() => props.update!()}
                            textColor={"blue"}
                            icon={<ChakraIcons.RepeatIcon />}
                        >
                            Update
                        </Chakra.MenuItem>
                        <Chakra.MenuItem
                            onClick={() => props.delete!()}
                            textColor={"red"}
                            icon={<ChakraIcons.DeleteIcon />}
                        >
                            Delete
                        </Chakra.MenuItem>
                    </Chakra.MenuList>
                </Chakra.Menu>
            }
        >
            <Chakra.LinkBox
                marginBottom={10}
                width={"fit-content"}
                backgroundColor={props.isRefetching == undefined ? "gray.100" : (props.isRefetching ? "orange.100" : "gray.100")}
                borderRadius={"10px"}
            >
                <Chakra.Center>
                    <Chakra.Box
                        display={
                            {
                                base: "inline-block"
                            }
                        }
                        width={"150px"}
                    >
                        {
                            coverQuery.isLoading ? (<Chakra.Skeleton
                                borderTopRadius={"10px"}
                                height={"150px"}
                            />) : null
                        }
                        {
                            coverQuery.isError ? (<Chakra.Image
                                src={Mangadex_cover_not_found}
                                fallbackSrc={Mangadex_placeHolder}
                                borderTopRadius={"10px"}
                            />) : null
                        }
                        {
                            coverQuery.isSuccess ? (
                                <CoverElementVertical src={coverQuery.data} isThumbail />
                            ) : null
                        }
                        <Chakra.Center>
                            <Chakra.Heading
                                //textAlign={"center"}
                                size={"md"}
                                noOfLines={2}
                                margin={"15px"}
                            >
                                <TryCatch catch={() => (
                                    <Chakra.LinkOverlay>
                                        {title}
                                    </Chakra.LinkOverlay>
                                )}>
                                    <Chakra.LinkOverlay
                                        as={Link}
                                        to={"/mangadex/manga/" + props.src.get_id()}
                                    >
                                        {title}
                                    </Chakra.LinkOverlay>
                                </TryCatch>
                            </Chakra.Heading>
                        </Chakra.Center>
                    </Chakra.Box>
                </Chakra.Center>
            </Chakra.LinkBox>
        </ReactContextMenu>
    )
}