import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { useMangaDownload_Delete } from "../../../hooks/MangaStateHooks";
import React from "react";
import ReactContextMenu from "react-jsx-context-menu";

export default function MangaContextMenu(props: {
    mangaId : string,
    refetch?: Function,
    children: React.ReactElement
}){
    const {delete_, download_} = useMangaDownload_Delete({
        mangaID : props.mangaId
    });
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
                            onClick={() => download_.mutate()}
                            textColor={"green"}
                            icon={<ChakraIcons.DownloadIcon />}
                        >
                            Download
                        </Chakra.MenuItem>
                        <Chakra.MenuItem
                            onClick={() => download_.mutate()}
                            textColor={"blue"}
                            icon={<ChakraIcons.RepeatIcon />}
                        >
                            Update
                        </Chakra.MenuItem>
                        <Chakra.MenuItem
                            onClick={() => delete_.mutate()}
                            textColor={"red"}
                            icon={<ChakraIcons.DeleteIcon />}
                        >
                            Delete
                        </Chakra.MenuItem>
                    </Chakra.MenuList>
                </Chakra.Menu>
            }
        >
            {
                props.children
            }
        </ReactContextMenu>
    )
}