import { VStack, Box } from "@chakra-ui/react";
import { get_manga_byId } from "@mangadex/resources/hooks/MangaStateHooks";
import { Content, Portal as CttxPortal } from "@radix-ui/react-context-menu";
import React from "react";
import { MangaContextMenuProps, MangaContextMenuProvider } from ".";
import Delete from "./Delete";
import Download from "./Download";
import Goto from "./Goto";
import Loading from "./Loading";
import OpenToMangadex from "./OpenToMangadex";
import Refresh from "./Refresh";
import Update from "./Update";

export default function Portal(props: MangaContextMenuProps) {
    const { query } = get_manga_byId({
        mangaID: props.mangaId
    });
    return (
        <CttxPortal>
            <MangaContextMenuProvider value={{ ...props, query }}>
                <Box
                    zIndex={"dropdown"}
                    backgroundColor={"white"}
                    boxShadow={"md"}
                    borderRadius={"10px"}
                    as={Content}
                    border={"1px"}
                    overflow={"hidden"}
                    shadow={"0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);"}
                    borderColor={"#cccccc"}
                >
                    <VStack display={"block"} spacing={0} fontSize={"lg"}>
                        <Goto />
                        <OpenToMangadex />
                        <Refresh />
                        {
                            query.isSuccess ? (
                                <React.Fragment>
                                    {
                                        query.data.isOffline ? (
                                            <React.Fragment>
                                                <Update />
                                                <Delete />
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                <Download />
                                            </React.Fragment>
                                        )
                                    }
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Loading />
                                </React.Fragment>
                            )
                        }
                    </VStack>
                </Box>
            </MangaContextMenuProvider>

        </CttxPortal>
    );
}