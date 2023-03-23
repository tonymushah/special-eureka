import * as Chakra from "@chakra-ui/react";
import React from "react";
import Hotkeys from "react-hot-keys";
import { useHTTPClient } from "../../../../commons-res/components/HTTPClientProvider";
import { Chapter } from "../../../api/structures/Chapter";
import { get_aggregate_query } from "../../hooks/AgreggateStateHooks";
import ErrorEL1 from "../error/ErrorEL1";
import IsPingable from "../IsPingable";
import Chapter_Element1_byChapID from "./v1/Chapter_Element1_byChapID";

const All_downloaded_Chapter_manga = React.lazy(() => import("../download/All_downloaded_Chapter_manga"));

function ChapterNavigationModal_Online_Chapters(props: {
    chapter: Chapter
}) {
    const client = useHTTPClient();
    const { query } = get_aggregate_query({
        aggregate_options : props.chapter.getAggregateList_options(client),
        queryOption : {
            staleTime : 1000 * 60 * 30
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
        )
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
        )
    }
    if (query.isError) {
        return (
            <ErrorEL1
                error={query.error}
            />
        )
    }
    if (query.isSuccess) {
        return (
            <>

                <Chakra.VStack width={"full"}>
                    {
                        query.data.get_volumes().map((volume) => (
                            <>
                                {
                                    volume.get_chapters().map((chapters) => (
                                        <>
                                            {
                                                chapters.get_ids().map((chapter) => (
                                                    <Chakra.Box width={"full"}>
                                                        <Chakra.Text>
                                                            Volume {
                                                                volume.get_name()
                                                            } Chapter {
                                                                chapters.get_name()
                                                            }
                                                            <br />
                                                            <Chapter_Element1_byChapID id={chapter} />
                                                        </Chakra.Text>
                                                    </Chakra.Box>
                                                ))
                                            }
                                        </>
                                    ))
                                }
                            </>
                        ))
                    }
                </Chakra.VStack>
            </>
        )
    }
    return (
        <Chakra.Center>
            <Chakra.Spinner
                color={"orange"}
                size={"xl"}
                thickness={"10px"}
            />
        </Chakra.Center>
    )
}

export default function ChapterNavigationModal(props: {
    chapter: Chapter
}) {
    const client = useHTTPClient();
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
                <Chakra.ModalContent

                >
                    <Chakra.ModalHeader>Relative Chapters</Chakra.ModalHeader>
                    <Chakra.ModalCloseButton />
                    <Chakra.ModalBody

                    >
                        <Chakra.Tabs isLazy>
                            <Chakra.TabList>
                                <Chakra.Tab>
                                    Online
                                </Chakra.Tab>
                                <Chakra.Tab>
                                    Offline
                                </Chakra.Tab>
                            </Chakra.TabList>
                            <Chakra.TabPanels
                                height={"sm"}
                                overflow={"scroll"}
                            >
                                <Chakra.TabPanel>
                                    <IsPingable
                                        client={client}
                                        onLoading={
                                            <Chakra.Center>
                                                <Chakra.Spinner
                                                    color={"orange"}
                                                    size={"xl"}
                                                    thickness={"10px"}
                                                />
                                            </Chakra.Center>
                                        }
                                        onError={(query) => (
                                            <Chakra.Alert
                                                status="error"
                                            >
                                                <Chakra.AlertIcon />
                                                <Chakra.AlertTitle>Can't ping the Mangadex API</Chakra.AlertTitle>
                                                <Chakra.AlertDescription>
                                                    <Chakra.Button
                                                        colorScheme={"orange"}
                                                        onClick={() => query.refetch()}
                                                    >
                                                        Refresh
                                                    </Chakra.Button>
                                                </Chakra.AlertDescription>
                                            </Chakra.Alert>
                                        )}
                                        onSuccess={() => (
                                            <ChapterNavigationModal_Online_Chapters
                                                chapter={props.chapter}
                                            />
                                        )}
                                    />

                                </Chakra.TabPanel>
                                <Chakra.TabPanel
                                >
                                    <React.Suspense
                                        fallback={
                                            <Chakra.Center>
                                                <Chakra.Spinner
                                                    color={"orange"}
                                                    size={"xl"}
                                                    thickness={"10px"}
                                                />
                                            </Chakra.Center>
                                        }
                                    >
                                        <All_downloaded_Chapter_manga
                                            mangaID={props.chapter.get_manga_id()}
                                        >
                                            {(getted: Array<string>) => (
                                                <Chakra.VStack>
                                                    {
                                                        getted.map((value) => (
                                                            <Chakra.Box
                                                                width={"full"}
                                                            >
                                                                <Chapter_Element1_byChapID id={value} />
                                                            </Chakra.Box>
                                                        ))
                                                    }
                                                </Chakra.VStack>
                                            )}
                                        </All_downloaded_Chapter_manga>
                                    </React.Suspense>
                                </Chakra.TabPanel>
                            </Chakra.TabPanels>
                        </Chakra.Tabs>
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
                            >m</Chakra.Kbd></Chakra.Text>
                    </Chakra.ModalFooter>
                </Chakra.ModalContent>
            </Chakra.Modal>
        </Hotkeys>
    )
}
/*
<>
<>

</>


</>
*/