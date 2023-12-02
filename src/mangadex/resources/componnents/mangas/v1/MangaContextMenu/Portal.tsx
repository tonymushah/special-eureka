import { VStack, Box, useToken, useColorModeValue } from "@chakra-ui/react";
import get_manga_byId from "@mangadex/resources/hooks/MangaStateHooks/get_manga_byId";
import { Content, Portal as CttxPortal } from "@radix-ui/react-context-menu";
import React, { memo } from "react";
import { MangaContextMenuProps, MangaContextMenuProvider } from ".";
import Delete from "./Delete";
import Download from "./Download";
import Goto from "./Goto";
import Loading from "./Loading";
import OpenToMangadex from "./OpenToMangadex";
import Refresh from "./Refresh";
import Update from "./Update";
import isMangaDonwloaded from "@mangadex/resources/hooks/MangaStateHooks/isMangaDownloaded";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";

const Portal = memo(function Portal(props: MangaContextMenuProps) {
    const client = useHTTPClient();
    const { query } = get_manga_byId({
        mangaID: props.mangaId
    });
    const { data: isOffline } = isMangaDonwloaded({
        variables: {
            client,
            mangaId: props.mangaId
        }
    });
    const { backgroundColor, borderColor } = usePortalColorModeValue();
    return (
        <CttxPortal>
            <MangaContextMenuProvider value={{ ...props, query }}>
                <Box
                    zIndex={"dropdown"}
                    backgroundColor={backgroundColor}
                    boxShadow={"md"}
                    borderRadius={"10px"}
                    as={Content}
                    border={"1px"}
                    overflow={"hidden"}
                    shadow={"0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);"}
                    borderColor={borderColor}
                >
                    <VStack display={"block"} spacing={0} fontSize={"lg"}>
                        <Goto />
                        <OpenToMangadex />
                        <Refresh />
                        {
                            query.isSuccess ? (
                                <React.Fragment>
                                    {
                                        isOffline ? (
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
});

export default Portal;

export function usePortalColorModeValue() {
    const [gray1, gray2] = useToken("colors", ["gray.100", "gray.900"]);
    const backgroundColor = useColorModeValue(gray1, gray2);
    const borderColor = useColorModeValue(gray2, gray1);
    return { backgroundColor, borderColor };
}

export function useMenuItemsColorModeValue() {
    const [gray1, gray2] = useToken("colors", ["gray.300", "gray.700"]);
    const backgroundColor = useColorModeValue(gray1, gray2);
    return { backgroundColor };
}
