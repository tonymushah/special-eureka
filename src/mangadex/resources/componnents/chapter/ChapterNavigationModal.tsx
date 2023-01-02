import React from "react";
import { Chapter, Chapters } from "../../../api/structures/Chapter";
import * as Chakra from "@chakra-ui/react";
import Hotkeys from "react-hot-keys"
import { Await } from "react-router-dom";
import { ErrorELAsync1 } from "../Error_cmp";
import { Aggregate } from "../../../api/structures/Aggregate";
import Chapter_Element1_byChapID from "./v1/Chapter_Element1_byChapID";
import { Manga } from "../../../api/structures/Manga";

export default function ChapterNavigationModal(props: {
    chapter: Chapter
}) {
    const { isOpen, onOpen, onClose } = Chakra.useDisclosure();
    return (
        <Hotkeys
            keyName="ctrl+m"
            onKeyDown={() => {
                if(isOpen){
                    onClose();
                }else{
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
                <Chakra.ModalOverlay/>
                <Chakra.ModalContent 
                    
                >
                    <Chakra.ModalHeader>Relative Chapters</Chakra.ModalHeader>
                    <Chakra.ModalCloseButton/>
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
                                        <Await
                                            resolve={props.chapter.getAggregateList()}
                                            errorElement={
                                                <ErrorELAsync1/>
                                            }
                                        >
                                            {
                                                (getted: Aggregate) => (
                                                    <Chakra.VStack width={"full"}>
                                                        {
                                                            getted.get_volumes().map((volume) => (
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
                                                                                                <br/>
                                                                                                <Chapter_Element1_byChapID id={chapter}/>
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
                                                )
                                            }
                                        </Await>
                                    </React.Suspense>
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
                                        <Await
                                            resolve={Manga.getAllDownloadedChapters_ofAManga(props.chapter.get_manga_id())}
                                            errorElement={<ErrorELAsync1/>}
                                        >
                                            {(getted : Array<string>) => (
                                                <Chakra.VStack>
                                                    {
                                                        getted.map((value) => (
                                                            <Chakra.Box
                                                                width={"full"}
                                                            >
                                                                <Chapter_Element1_byChapID id={value}/>
                                                            </Chakra.Box>
                                                        ))
                                                    }
                                                </Chakra.VStack>
                                            )}
                                        </Await>
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