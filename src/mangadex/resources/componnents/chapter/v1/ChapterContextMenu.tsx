import { get_ChapterbyId, useChapterDeleteMutation, useChapterDownloadMutation } from "@mangadex/resources/hooks/ChapterStateHooks";
import React from "react";
import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { FiSave } from "react-icons/fi";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router";
import { getMangaDexPath } from "@mangadex/index";
import { open } from "@tauri-apps/api/shell";
import { useChakraToast } from "@commons-res/hooks/useChakraToast";
import {FiFile} from "react-icons/fi";
const mangadex_path = getMangaDexPath();

export default function ChapterContextMenu({ id, children }: React.PropsWithChildren<{
    id: string,
}>) {
    const { query } = get_ChapterbyId({
        id
    });
    const download_ = useChapterDownloadMutation({
        chapID: id,
        onSuccess() {
            query.refetch();
        }
    });
    const delete_ = useChapterDeleteMutation({
        chapID: id,
        onSuccess() {
            query.refetch();
        }
    });
    function Goto() {

        const navigate = useNavigate();
        return (
            <Chakra.Box
                onClick={() => {
                    navigate(`${mangadex_path}/chapter/${id}`);
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
            open(`${mangadex_path}/chapter/${id}`).catch((e) => {
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
                        isTransition ? <BeatLoader size={7} /> : <Chakra.Icon as={ChakraIcons.ExternalLinkIcon} />
                    }
                    <Chakra.Text as="span">
                        Open to Mangadex
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
                    <BeatLoader size={7} />
                    <Chakra.Text as="span">
                        Loading...
                    </Chakra.Text>
                </Chakra.HStack>
            </Chakra.Box>
        );
    }
    function Download() {
        return (
            <Chakra.Box
                textColor={download_.fetchStatus == "fetching" || delete_.fetchStatus == "fetching" ? "gray" : "green"}
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
                _hover={{
                    backgroundColor: "gray.100"
                }}>
                <Chakra.HStack
                    spacing={"2"}
                >
                    {
                        download_.fetchStatus == "fetching" || delete_.fetchStatus == "fetching" ? <BeatLoader size={7} /> : <Chakra.Icon as={FiSave} />
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
                        download_.fetchStatus == "fetching" || delete_.fetchStatus == "fetching" ? <BeatLoader size={7} /> : <ChakraIcons.ReactIcon />
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
                        download_.fetchStatus == "fetching" || delete_.fetchStatus == "fetching" ? <BeatLoader size={7} /> : <ChakraIcons.DeleteIcon />
                    }
                    <Chakra.Text as="span">
                        Delete
                    </Chakra.Text>
                </Chakra.HStack>
            </Chakra.Box>
        );
    }
    function Details() {
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
                    <Chakra.Icon as={FiFile} />
                    <Chakra.Text as="span">
                        Chapter {id}
                    </Chakra.Text>
                </Chakra.HStack>
            </Chakra.Box>
        );
    }
    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger>{
                children
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
                        <Details/>
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
            </ContextMenu.Portal>
        </ContextMenu.Root>
    );
}