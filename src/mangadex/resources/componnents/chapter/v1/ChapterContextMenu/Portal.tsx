import { Portal as ContextMenuPortal, Content } from "@radix-ui/react-context-menu";
import * as Chakra from "@chakra-ui/react";
import { get_ChapterbyId } from "@mangadex/resources/hooks/ChapterStateHooks/get_ChapterbyId";
import React from "react";
import { useContextMenuProps } from ".";
import Delete from "./Delete";
import Download from "./Download";
import Goto from "./Goto";
import Loading from "./Loading";
import OpenToMangadex from "./OpenToMangadex";
import Update from "./Update";

export default function Portal() {
    const { id } = useContextMenuProps();
    const { query } = get_ChapterbyId({
        id
    });
    return (
        <ContextMenuPortal>
            <Chakra.Box
                fontFamily={"Poppins"}
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
                <Chakra.VStack display={"block"} spacing={0} fontSize={"lg"}>
                    <Goto />
                    <OpenToMangadex />
                    {
                        query.isSuccess ? (
                            <React.Fragment>
                                {
                                    query.data.isDownloaded ? (
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
                </Chakra.VStack>
            </Chakra.Box>
        </ContextMenuPortal>
    );
}