import {
    Button, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure
} from "@chakra-ui/react";
import React from "react";
import { UseQueryResult } from "@tanstack/react-query";
import Consumer from "@commons-res/components/Consumer";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import Manga from "@mangadex/api/structures/Manga";
import { get_manga_byId } from "@mangadex/resources/hooks/MangaStateHooks/get_manga_byId";
import { useMangaDownload } from "@mangadex/resources/hooks/MangaStateHooks/useMangaDownload";
import IsPingable from "../../IsPingable";
import IsPingable_defaultError from "../../IsPingable_defaultError";
import MangaTitle from "../v1/MangaTitle";

export default function Download_Manga_Modal(props: {
    manga_id: string,
    children: (data: { onOpen: () => void, download_query: UseQueryResult<Manga, unknown> }) => React.ReactNode
}) {
    const client = useHTTPClient();
    const download_query = useMangaDownload({
        mangaID: props.manga_id
    });
    const manga_query = get_manga_byId({
        mangaID: props.manga_id
    });
    const { isOpen, onOpen, onClose } = useDisclosure();
    if (manga_query.query.isLoading) {
        return (
            <React.Fragment>
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader fontFamily={"inherit"}>
                            Loading...
                        </ModalHeader>
                        <ModalCloseButton />
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
            </React.Fragment>
        );
    }
    if (manga_query.query.isSuccess) {
        return (
            <React.Fragment>
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader fontFamily={"inherit"}>
                            {manga_query.query.data.isOffline ? "Update" : "Download"} manga <MangaTitle src={manga_query.query.data.manga}/>
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
                            onSuccess={() => (
                                <React.Fragment>
                                    <ModalBody fontFamily={"inherit"}>
                                        <Text>
                                            Are you sure to {manga_query.query.data?.isOffline ? "Update" : "Download"} this manga
                                        </Text>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            isLoading={download_query.fetchStatus == "fetching"}
                                            onClick={() => {
                                                onClose();
                                                download_query.refetch();
                                            }}
                                        >
                                            {manga_query.query.data?.isOffline ? "Update" : "Download"}
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
            </React.Fragment>
        );
    }
    return (<React.Fragment>
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
    </React.Fragment>);
}