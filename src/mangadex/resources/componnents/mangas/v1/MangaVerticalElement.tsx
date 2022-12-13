import React from "react";
import * as Chakra from "@chakra-ui/react"
import { Manga } from "../../../../api/structures/Manga";
import { Alt_title } from "../../../../api/internal/Utils";
import { useQuery } from "react-query";
import Mangadex_placeHolder from "../../../imgs/cover-placeholder.png";
import Mangadex_cover_not_found from "../../../imgs/cover-not-found.jpg";
import CoverElementVertical from "../../covers/v1/CoverElementVertical";

export default function MangaVerticalElement(props : {
    src: Manga,
    isRefetching? : boolean
}){
    let title: string = "";
    const cover_key = "mdx-manga_cover-" + props.src.get_id();
    const coverQuery = useQuery(cover_key , () => {
        return props.src.get_cover_art()
    },{
        "staleTime": Infinity
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
            backgroundColor={props.isRefetching == undefined? "gray.100" : (props.isRefetching? "orange.100" : "gray.100")}
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
                            <CoverElementVertical src={coverQuery.data} />
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
            </Chakra.Center>
        </Chakra.Box>
    )
}