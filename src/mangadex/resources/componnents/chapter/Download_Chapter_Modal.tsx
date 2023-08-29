import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text
} from "@chakra-ui/react";
import Consumer from "@commons-res/components/Consumer";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { useChapterDownloadMutation } from "@mangadex/resources/hooks/ChapterStateHooks/useChapterDownloadMutation";
import IsPingable from "../IsPingable";
import IsPingable_defaultError from "../IsPingable_defaultError";
import { UseQueryResult } from "@tanstack/react-query";
import { ChapterDeleteMutation_data } from "@mangadex/resources/hooks/ChapterStateHooks/ChapterDeleteMutation_data";
export default function Download_Chapter_Modal(props: {
    chap_id: string,
    children: (data : {onOpen: () => void, dowload_query : UseQueryResult<ChapterDeleteMutation_data, Error>}) => React.ReactNode
}) {
    const client = useHTTPClient();
    const download_query = useChapterDownloadMutation({
        chapID: props.chap_id,
        toInvalidate: []
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
                        Download chapter {props.chap_id}
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
                                <ModalBody>
                                    <Text>
                                        Are you sure to download this chapter
                                    </Text>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        isLoading={download_query.isLoading && download_query.fetchStatus == "fetching"}
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
                    dowload_query: download_query
                }}
            >
                {
                    props.children
                }
            </Consumer>
        </>
    );
}