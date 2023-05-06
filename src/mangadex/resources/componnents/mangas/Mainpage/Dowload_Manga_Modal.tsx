import {
    Button, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure
} from "@chakra-ui/react";
import React from "react";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import Consumer from "@commons-res/components/Consumer";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Manga } from "@mangadex/api/structures/Manga";
import { useMangaDownload } from "../../../hooks/MangaStateHooks";
import IsPingable from "../../IsPingable";
import IsPingable_defaultError from "../../IsPingable_defaultError";

export default function Download_Manga_Modal(props: {
    manga_id: string,
    children: (data : {onOpen: () => void, download_query: UseQueryResult<Manga, unknown>}) => React.ReactNode
}) {
    const client = useHTTPClient();
    const download_query = useMangaDownload({
        mangaID : props.manga_id
    });
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Download manga {props.manga_id}
                    </ModalHeader>
                    <ModalCloseButton />
                    <IsPingable
                        client={client}
                        onError={(query) => (
                            <React.Fragment>
                                <ModalBody>
                                    <IsPingable_defaultError
                                        query={query}
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        variant={"outline"}
                                        onClick={onClose}
                                    >
                                        Close
                                    </Button>
                                </ModalFooter>
                            </React.Fragment>
                        )}
                        onSuccess={(query) => (
                            <React.Fragment>
                                <ModalBody>
                                    <Text>
                                        Are you sure to download this manga
                                    </Text>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        isLoading={download_query.isLoading}
                                        onClick={() => {
                                            onClose();
                                            download_query.refetch();
                                        }}
                                    >
                                        Download
                                    </Button>
                                    <Button
                                        variant={"outline"}
                                        onClick={onClose}
                                    >
                                        Close
                                    </Button>
                                </ModalFooter>
                            </React.Fragment>
                        )}
                        onLoading={
                            <React.Fragment>
                                <ModalBody>
                                    <Text>
                                        Pinging the Mangadex API...
                                    </Text>
                                    <Text>
                                        This might take a while if you have a slow connection
                                    </Text>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        variant={"outline"}
                                        onClick={onClose}
                                    >
                                        Close
                                    </Button>
                                </ModalFooter>
                            </React.Fragment>
                        }
                    />
                </ModalContent>
            </Modal>
            <Consumer
                to_consume={{
                    onOpen: onOpen,
                    download_query: download_query
                }}
            >
                {
                    props.children
                }
            </Consumer>
        </>
    );
}