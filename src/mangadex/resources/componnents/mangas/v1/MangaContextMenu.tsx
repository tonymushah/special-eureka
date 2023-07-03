import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { get_manga_byId, useMangaDownload_Delete } from "../../../hooks/MangaStateHooks";
import React from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { FiSave, FiRefreshCcw } from "react-icons/fi";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router";
import { getMangaDexPath } from "@mangadex/index";
import { ExtLink } from "@commons-res/components/ExtLink";
import { open } from "@tauri-apps/api/shell";
import { useChakraToast } from "@commons-res/hooks/useChakraToast";

export default function MangaContextMenu(props: React.PropsWithChildren<{
    mangaId: string,
    refetch?: () => void,
}>) {
    const { query } = get_manga_byId({
        mangaID: props.mangaId
    });
    const { delete_, download_ } = useMangaDownload_Delete({
        mangaID: props.mangaId
    });
    function Goto() {
        const mangadex_path = getMangaDexPath();
        const navigate = useNavigate();
        return (
            <Chakra.Box
                onClick={() => {
                    navigate(`${mangadex_path}/manga/${props.mangaId}`);
                }}
                paddingTop={1}
                paddingBottom={1}
                pl={2}
                pr={2}
                as={ContextMenu.ContextMenuItem}
                _hover={{
                    backgroundColor: "gray.100"
                }}>
                <Chakra.HStack
                    spacing={"2"}
                >
                    <Chakra.Icon as={ChakraIcons.LinkIcon} />
                    <Chakra.Text as="span">
                        Open
                    </Chakra.Text>
                </Chakra.HStack>
            </Chakra.Box>
        );
    }
    function OpenToMangadex() {
        const [isTransition, startTransition] = React.useTransition();
        const toast = useChakraToast({
            "duration": 9000,
            "isClosable": true,
            "position": "bottom-right",
            "status": "error",
            "title": "Error on opening the link"
        });
        const openLink = () => startTransition(() => {
            open(`https://mangadex.org/title/${props.mangaId}`).catch((e) => {
                if (typeof e == "string") {
                    toast({
                        description: e
                    });
                } else if (typeof e == "object") {
                    if (e instanceof Error) {
                        toast({
                            description: e.message,
                            title: e.name
                        });
                    }
                }
            });
        });
        return (
            <ExtLink href={`https://mangadex.org/title/${props.mangaId}`}>
                <Chakra.Box
                    onClick={() => openLink()}
                    paddingTop={1}
                    paddingBottom={1}
                    pl={2}
                    pr={2}
                    as={ContextMenu.ContextMenuItem}
                    _hover={{
                        backgroundColor: "gray.100"
                    }}
                    color={isTransition ? "gray" : "orange.500"}
                >
                    <Chakra.HStack
                        spacing={"2"}
                    >
                        {
                            isTransition ? <BeatLoader/> : <Chakra.Icon as={ChakraIcons.ExternalLinkIcon} /> 
                        }
                        <Chakra.Text as="span">
                            Open to Mangadex
                        </Chakra.Text>
                    </Chakra.HStack>
                </Chakra.Box>
            </ExtLink>

        );
    }
    function Refresh() {
        const [isRefreshing, startRefresh] = React.useTransition();
        const { refetch } = props;
        if (refetch != undefined) {
            return (
                <Chakra.Box paddingRight={"2"} paddingLeft={"2"}
                    _hover={{
                        backgroundColor: "gray.100"
                    }}
                    as={ContextMenu.ContextMenuItem}
                    onClick={() => {
                        if (isRefreshing == false) {
                            startRefresh(() => {
                                refetch();
                            });
                        }
                    }}
                    paddingTop={1}
                    paddingBottom={1}
                    pl={2}
                    pr={2}
                >
                    <Chakra.HStack
                        spacing={"2"}
                    >
                        <Chakra.Icon as={FiRefreshCcw} />
                        <Chakra.Text as="span">
                            Refresh
                        </Chakra.Text>
                    </Chakra.HStack>
                </Chakra.Box>
            );
        } else {
            return (
                <Chakra.Box paddingRight={"2"} paddingLeft={"2"}
                    _hover={{
                        backgroundColor: "gray.100"
                    }}
                    as={ContextMenu.ContextMenuItem}
                    onClick={() => {
                        if (!query.isFetching) {
                            query.refetch();
                        }
                    }}
                    paddingTop={1}
                    paddingBottom={1}
                    pl={2}
                    pr={2}
                >
                    <Chakra.HStack
                        spacing={"2"}
                    >
                        <Chakra.Icon as={FiRefreshCcw} />
                        <Chakra.Text as="span">
                            Refresh
                        </Chakra.Text>
                    </Chakra.HStack>
                </Chakra.Box>
            );
        }
    }
    function Download() {
        return (
            <Chakra.Box
                textColor={download_.fetchStatus == "fetching" || delete_.fetchStatus == "fetching" ? "gray" : "green"}
                onClick={() => {
                    if (download_.fetchStatus == "fetching" && delete_.fetchStatus == "fetching") {
                        download_.refetch();
                    }
                }}
                paddingTop={1}
                paddingBottom={1}
                pl={2}
                pr={2}
                as={ContextMenu.ContextMenuItem}
                _hover={{
                    backgroundColor: "gray.100"
                }}>
                <Chakra.HStack
                    spacing={"2"}
                >
                    {
                        download_.fetchStatus == "fetching" || delete_.fetchStatus == "fetching" ? <BeatLoader /> : <Chakra.Icon as={FiSave} />
                    }
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
                textColor={download_.fetchStatus == "fetching" || delete_.fetchStatus == "fetching" ? "gray" : "blue"}
                onClick={() => {
                    if (download_.fetchStatus != "fetching" && delete_.fetchStatus != "fetching") {
                        download_.refetch();
                    }
                }}
                paddingTop={1}
                paddingBottom={1}
                pl={2}
                pr={2}
                as={ContextMenu.ContextMenuItem}
            >
                <Chakra.HStack
                    spacing={"2"}
                >
                    {
                        download_.fetchStatus == "fetching" || delete_.fetchStatus == "fetching" ? <BeatLoader /> : <ChakraIcons.ReactIcon />
                    }
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
                }}
                as={ContextMenu.ContextMenuItem}
                textColor={download_.fetchStatus == "fetching" || delete_.fetchStatus == "fetching" ? "gray" : "red"}
                onClick={() => {
                    if (download_.fetchStatus != "fetching" && delete_.fetchStatus != "fetching") {
                        delete_.refetch();
                    }
                }}
                pl={2}
                pr={2}
                paddingTop={1}
                paddingBottom={1}
            >
                <Chakra.HStack
                    spacing={"2"}
                >
                    {
                        download_.fetchStatus == "fetching" || delete_.fetchStatus == "fetching" ? <BeatLoader /> : <ChakraIcons.DeleteIcon />
                    }
                    <Chakra.Text as="span">
                        Delete
                    </Chakra.Text>
                </Chakra.HStack>
            </Chakra.Box>
        );
    }
    function Loading() {
        return (
            <Chakra.Box paddingRight={"2"} paddingLeft={"2"}
                as={ContextMenu.ContextMenuItem}
                pl={2}
                pr={2}
                paddingTop={2}
                paddingBottom={2}
            >
                <Chakra.HStack
                    spacing={"2"}
                >
                    <BeatLoader />
                    <Chakra.Text as="span">
                        Loading...
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
                    boxShadow={"md"}
                    borderRadius={"10px"}
                    as={ContextMenu.Content}
                    border={"1px"}
                    overflow={"hidden"}
                    shadow={"0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);"}
                    borderColor={"#cccccc"}
                >
                    <Chakra.VStack display={"block"} spacing={0} fontSize={"lg"}>
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