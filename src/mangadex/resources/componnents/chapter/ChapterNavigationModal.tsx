import * as Chakra from "@chakra-ui/react";
import Hotkeys from "react-hot-keys";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { get_aggregate_query } from "../../hooks/AgreggateStateHooks";
import ErrorEL1 from "../error/ErrorEL1";
import Chapter_Element1_byChapID from "./v1/Chapter_Element1_byChapID";
import React from "react";

function ChapterNavigationModal_Online_Chapters(props: {
    chapter: Chapter
}) {
    const client = useHTTPClient();
    const { query } = get_aggregate_query({
        aggregate_options: props.chapter.getAggregateList_options(client),
        queryOption: {
            staleTime: 1000 * 60 * 30
        }
    });
    if (query.isRefetching == true) {
        return (
            <Chakra.Center>
                <Chakra.Spinner
                    color={"orange"}
                    size={"xl"}
                    thickness={"10px"}
                />
            </Chakra.Center>
        );
    }
    if (query.isLoading == true) {
        return (
            <Chakra.Center>
                <Chakra.Spinner
                    color={"orange"}
                    size={"xl"}
                    thickness={"10px"}
                />
            </Chakra.Center>
        );
    }
    if (query.isError) {
        return (
            <ErrorEL1
                error={query.error}
            />
        );
    }
    if (query.isSuccess) {
        return (
            <React.Fragment>
                <Chakra.VStack divider={<Chakra.StackDivider />} width={"full"}>
                    {
                        query.data.get_volumes().map((volume) => (
                            <React.Fragment key={volume.get_name()}>
                                <Chakra.VStack divider={<Chakra.StackDivider />} width={"full"}>
                                    {
                                        volume.get_chapters().map((chapters) => (
                                            <React.Fragment key={`${volume.get_name()}-${chapters.get_name()}`}>
                                                {
                                                    chapters.get_ids().map((chapter) => (
                                                        <Chakra.Box width={"full"} key={chapter}>
                                                            <Chapter_Element1_byChapID id={chapter} />
                                                        </Chakra.Box>
                                                    ))
                                                }
                                            </React.Fragment>
                                        ))
                                    }
                                </Chakra.VStack>
                            </React.Fragment>
                        ))
                    }
                </Chakra.VStack>
            </React.Fragment>
        );
    }
    return (
        <Chakra.Center>
            <Chakra.Spinner
                color={"orange"}
                size={"xl"}
                thickness={"10px"}
            />
        </Chakra.Center>
    );
}

export default function ChapterNavigationModal(props: {
    chapter: Chapter
}) {
    const { isOpen, onOpen, onClose } = Chakra.useDisclosure();
    return (
        <Hotkeys
            keyName="ctrl+m"
            onKeyDown={() => {
                if (isOpen) {
                    onClose();
                } else {
                    onOpen();
                }
            }}
        >
            <Chakra.Tooltip
                label={
                    <>
                        Open with
                        &nbsp;
                        <Chakra.Kbd
                            background={"inherit"}
                        >ctrl</Chakra.Kbd>
                        &nbsp;
                        +
                        &nbsp;
                        <Chakra.Kbd
                            background={"inherit"}
                        >m</Chakra.Kbd>
                    </>
                }
            >
                <Chakra.Button
                    colorScheme={"orange"}
                    onClick={
                        onOpen
                    }
                >
                    Related Chapters
                </Chakra.Button>
            </Chakra.Tooltip>
            <Chakra.Modal
                isOpen={isOpen}
                onClose={onClose}
                size={"xl"}
            >
                <Chakra.ModalOverlay />
                <Chakra.ModalContent>
                    <Chakra.ModalHeader>Relative Chapters</Chakra.ModalHeader>
                    <Chakra.ModalCloseButton />
                    <Chakra.ModalBody>
                        <Chakra.Container
                            height={"md"}
                            overflow={"scroll"}
                        >
                            <ChapterNavigationModal_Online_Chapters
                                chapter={props.chapter}
                            />
                        </Chakra.Container>
                    </Chakra.ModalBody>
                    <Chakra.ModalFooter>
                        <Chakra.Text>To open this modal, use <Chakra.Kbd
                            //background={"inherit"}
                            color={"InfoText"}
                        >ctrl</Chakra.Kbd>
                            &nbsp;
                            +
                            &nbsp;
                            <Chakra.Kbd
                                color={"InfoText"}
                            //background={"inherit"}
                            >m</Chakra.Kbd>
                        </Chakra.Text>
                    </Chakra.ModalFooter>
                </Chakra.ModalContent>
            </Chakra.Modal>
        </Hotkeys>
    );
}