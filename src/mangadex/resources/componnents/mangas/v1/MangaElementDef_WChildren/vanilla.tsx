import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { getMangaDexPath } from "@mangadex/index";
import TryCatch from "@commons-res/components/TryCatch";
import { Manga } from "@mangadex/api/structures/Manga";
import MangaContextMenu from "../MangaContextMenu";
import GridLayout from "../MangaElementDef/vanilla/GridLayout";
import Image from "../MangaElementDef/vanilla/Image";
import Laoyut from "../MangaElementDef/vanilla/Layout";
import Title from "../MangaElementDef/vanilla/Title";
import { PropsProvider } from "../MangaElementDef/vanilla";
const MangaDexPath = getMangaDexPath();

export default function MangaElementDef_WChildren(props: React.PropsWithChildren<{
    src: Manga,
    isRefetching?: boolean
}>) {
    const color = Chakra.useColorModeValue("black", "white");
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
                                        <Chakra.Card
                                            overflow={"hidden"}
                                            variant={"outline"}
                                            borderRadius={"10px"}
                                            height={"130px"}
                                        >
                                            <Image />
                                        </Chakra.Card>
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
                                                color={color}
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

