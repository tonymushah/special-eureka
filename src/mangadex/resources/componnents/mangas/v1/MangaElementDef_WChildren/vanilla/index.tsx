import * as Chakra from "@chakra-ui/react";
import Manga from "@mangadex/api/structures/Manga";
import React from "react";
import MangaContextMenu from "../../MangaContextMenu";
import { PropsProvider } from "../../MangaElementDef/vanilla";
import GridLayout from "../../MangaElementDef/vanilla/GridLayout";
import Image from "../../MangaElementDef/vanilla/Image";
import Laoyut from "../../MangaElementDef/vanilla/Layout";
import Title from "./Title";

export default function MangaElementDef_WChildren(props: React.PropsWithChildren<{
    src: Manga,
    isRefetching?: boolean
}>) {
    return (
        <MangaContextMenu mangaId={props.src.get_id()}>
            <Chakra.Box
                display={"flex"}
                width={"min-content"}
            >
                <PropsProvider value={props}>
                    <Laoyut>
                        <Chakra.Center
                        >
                            <Chakra.Box
                                width={"fit-content"}
                            >
                                <GridLayout>
                                    <Chakra.GridItem
                                        rowSpan={2}
                                        colSpan={4}
                                    >
                                        <Image />
                                    </Chakra.GridItem>
                                    <Chakra.GridItem
                                        rowSpan={1}
                                        colSpan={8}
                                    >
                                        <Title/>
                                    </Chakra.GridItem>
                                    <Chakra.GridItem
                                        rowSpan={1}
                                        colSpan={8}
                                    >
                                        {
                                            props.children
                                        }
                                    </Chakra.GridItem>
                                </GridLayout>
                            </Chakra.Box>
                        </Chakra.Center>
                    </Laoyut>
                </PropsProvider>
            </Chakra.Box>
        </MangaContextMenu>
    );
}

