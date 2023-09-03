import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Manga } from "@mangadex/api/structures/Manga";
import React from "react";
import MangaContextMenu from "../../MangaContextMenu";
import { PropsProvider } from "../../MangaElementDef/vanilla";
import Description from "./Description";
import MangaElementDef2_Stats from "./MangaElementDef2_Stats";
import Publication from "./Publication";
import Tags from "./Tags";
import Title from "./Title";
import IsPingable from "@mangadex/resources/componnents/IsPingable";
import CoverImageByCoverID from "@mangadex/resources/componnents/covers/v1/CoverImageByCoverID";

export default function MangaElementDef2(props: {
    src: Manga,
    isRefetching?: boolean,
    refetch?: () => void
}) {
    const backgroundColor = Chakra.useColorModeValue("gray.200", "gray.900");
    const client = useHTTPClient();
    const card_maxHeight: Chakra.ResponsiveValue<any> = {
        base: "10em"
    };
    const card_minHeight: Chakra.ResponsiveValue<any> = {
        base: ""
    };
    return (
        <MangaContextMenu
            mangaId={props.src.get_id()}
            refetch={props.refetch}
        >
            <PropsProvider
                value={{
                    src: props.src
                }}
            >
                <Chakra.Card maxHeight={card_maxHeight} backgroundColor={backgroundColor} direction={"row"} overflowY={"hidden"} minWidth={"sm"} border={"1px"} borderColor={"#cccccc"}>
                    <CoverImageByCoverID coverID={props.src.get_cover_art_id()} isThumbail size={512} image_props={{
                        maxHeight: card_maxHeight,
                        "objectFit": "contain"
                    }} />
                    <Chakra.CardBody marginTop={"0px"}>
                        <Chakra.HStack spacing={"5px"}>
                            <Title/>
                            <IsPingable
                                client={client}
                                onError={() => (
                                    <React.Fragment />
                                )}
                                onSuccess={() => (
                                    <MangaElementDef2_Stats />
                                )}
                                onLoading={<Chakra.Skeleton height={"10px"} width={"20px"} />}
                            />
                            <Publication/>
                        </Chakra.HStack>
                        <Chakra.Box textAlign={"start"}>
                            <Tags/>
                            <Description/>
                        </Chakra.Box>
                    </Chakra.CardBody>
                </Chakra.Card>
            </PropsProvider>

        </MangaContextMenu>
    );
}
