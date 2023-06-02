import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { useMangaDownload_Delete } from "../../../hooks/MangaStateHooks";
import React from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";

export default function MangaContextMenu(props: {
    mangaId: string,
    refetch?: () => void,
    children: React.ReactElement
}) {
    const { delete_, download_ } = useMangaDownload_Delete({
        mangaID: props.mangaId
    });
    function Refresh() {
        const { refetch } = props;
        if (refetch != undefined) {
            return (
                <Chakra.Box paddingRight={"2"} paddingLeft={"2"}
                    _hover={{
                        backgroundColor: "gray.100"
                    }}
                    borderTopRadius={"10px"}
                >
                    <Chakra.HStack spacing={"2"}
                        _hover={{
                            backgroundColor: "gray.100"
                        }}
                        onClick={() => {
                            refetch();
                        }}
                    >
                        Refresh
                    </Chakra.HStack>
                </Chakra.Box>
            );
        } else {
            return (
                <React.Fragment />
            );
        }
    }
    function Download() {
        return (
            <Chakra.Box
                _hover={{
                    backgroundColor: "gray.100"
                }}
                borderTopRadius={"10px"}
                paddingRight={"2"} paddingLeft={"2"}>
                <Chakra.HStack
                    spacing={"2"}
                    textColor={download_.isLoading && download_.fetchStatus == "fetching" ? "gray" : "green"}
                    onClick={() => {
                        if (!(download_.isLoading) && download_.fetchStatus != "fetching") {
                            download_.refetch();
                        }
                    }}
                    as={ContextMenu.ContextMenuItem}
                    _hover={{
                        backgroundColor: "gray.100"
                    }}
                >
                    <ChakraIcons.DownloadIcon />
                    <Chakra.Text as="span">
                        Download
                    </Chakra.Text>
                </Chakra.HStack>
            </Chakra.Box>
        );
    }
    function Update() {
        return (
            <Chakra.Box
                _hover={{
                    backgroundColor: "gray.100"
                }}
                paddingRight={"2"} paddingLeft={"2"}>
                <Chakra.HStack
                    spacing={"2"}
                    textColor={download_.isLoading && download_.fetchStatus == "fetching" ? "gray" : "blue"}
                    onClick={() => {
                        if (!(download_.isLoading) && download_.fetchStatus != "fetching") {
                            download_.refetch();
                        }
                    }}
                    as={ContextMenu.ContextMenuItem}
                >
                    <ChakraIcons.ReactIcon />
                    <Chakra.Text as="span">
                        Update
                    </Chakra.Text>
                </Chakra.HStack>
            </Chakra.Box>
        );
    }
    function Delete() {
        return (
            <Chakra.Box paddingRight={"2"} paddingLeft={"2"}
                _hover={{
                    backgroundColor: "gray.100"
                }}>
                <Chakra.HStack
                    spacing={"2"}
                    textColor={delete_.isLoading && delete_.fetchStatus == "fetching" ? "gray" : "red"}
                    onClick={() => {
                        if (!(download_.isLoading) && download_.fetchStatus != "fetching") {
                            delete_.refetch();
                        }
                    }}
                    as={ContextMenu.ContextMenuItem}
                >
                    <ChakraIcons.DeleteIcon />
                    <Chakra.Text as="span">
                        Delete
                    </Chakra.Text>
                </Chakra.HStack>
            </Chakra.Box>
        );
    }
    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger>{
                props.children
            }</ContextMenu.Trigger>
            <ContextMenu.Portal>
                <Chakra.Box
                    zIndex={"dropdown"}
                    backgroundColor={"white"}
                    borderColor={"#cccccc"}
                    boxShadow={"md"}
                    borderRadius={"10px"}
                    as={ContextMenu.Content}
                >
                    <Chakra.VStack spacing={"3"}>
                        <Refresh />
                        <Download />
                        <Update />
                        <Delete />
                    </Chakra.VStack>
                </Chakra.Box>
            </ContextMenu.Portal>
        </ContextMenu.Root>
    );
}

/*
menu={
                <Chakra.Menu
                    isOpen
                >
                    <Chakra.MenuList>
                        <Chakra.MenuItem
                            onClick={() => props.refetch!()}
                        >Refresh</Chakra.MenuItem>
                        <Chakra.MenuItem
                            onClick={() => download_.refetch()}
                            
                            icon={}
                        >
                            Download
                        </Chakra.MenuItem>
                        <Chakra.MenuItem
                            onClick={() => download_.refetch()}
                            textColor={"blue"}
                            icon={<ChakraIcons.RepeatIcon />}
                        >
                            Update
                        </Chakra.MenuItem>
                        <Chakra.MenuItem
                            onClick={() => delete_.refetch()}
                            textColor={"red"}
                            icon={<ChakraIcons.DeleteIcon />}
                        >
                            Delete
                        </Chakra.MenuItem>
                    </Chakra.MenuList>
                </Chakra.Menu>
            }
*/