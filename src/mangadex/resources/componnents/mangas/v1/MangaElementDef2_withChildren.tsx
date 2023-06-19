import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import TryCatch from "@commons-res/components/TryCatch";
import { Manga } from "@mangadex/api/structures/Manga";
import CoverImageByCoverID from "../../covers/v1/CoverImageByCoverID";
import MangaTitle from "./MangaTitle";
import { getMangaDexPath } from "@mangadex";
import MangaContextMenu from "./MangaContextMenu";

const MangaDexPath = getMangaDexPath();

export default function MangaElementDef2_withChildren(props: React.PropsWithChildren<{
    src: Manga,
    isRefetching?: boolean,
    refetch?: () => void,
    download?: () => void,
    delete?: () => void,
    update?: () => void
}>) {
    const card_maxHeight: Chakra.ResponsiveValue<any> = {
        base: "15em"
    };
    const card_minHeight: Chakra.ResponsiveValue<any> = {
        base: ""
    };
    return (
        <Chakra.Card maxHeight={card_maxHeight} direction={"row"} overflowY={"hidden"} minWidth={"sm"} boxShadow={"md"}>
            <MangaContextMenu
                mangaId={props.src.get_id()}
                refetch={props.refetch}
            >
                <CoverImageByCoverID coverID={props.src.get_cover_art_id()} isThumbail size={256} image_props={{
                    maxHeight: card_maxHeight,
                    "objectFit": "contain"
                }} />
            </MangaContextMenu>
            <Chakra.Stack spacing={"0px"} width={"full"}>
                <Chakra.CardBody marginTop={"0px"}>
                    <Chakra.Box>
                        <Chakra.HStack spacing={"5px"}>
                            <TryCatch
                                catch={() => (
                                    <Chakra.Heading fontFamily={"inherit"} marginBottom={"0px"} size={"md"} noOfLines={1}><MangaTitle src={props.src} /></Chakra.Heading>
                                )}
                            >
                                <Link to={MangaDexPath + "/manga/" + props.src.get_id()}>
                                    <Chakra.Heading fontFamily={"inherit"} marginBottom={"0px"} size={"md"} noOfLines={1}><MangaTitle src={props.src} /></Chakra.Heading>
                                </Link>
                            </TryCatch>
                        </Chakra.HStack>
                    </Chakra.Box>
                    <Chakra.Box width={"full"} textAlign={"start"} overflowY={"scroll"}>
                        {
                            props.children
                        }
                    </Chakra.Box>
                </Chakra.CardBody>
            </Chakra.Stack>
        </Chakra.Card>
    );
}
