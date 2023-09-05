import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import useUserOptionModal from "@mangadex/resources/hooks/userOptions/ModalContext";
import React from "react";
import ReactHotkeys from "react-hot-keys";
import ActivateKuru from "../kuru_kuru/ActivateKuru";
import { FiBook, FiLayout, FiMessageSquare, FiServer } from "react-icons/fi";

const SelectLanguages = React.lazy(() => import("@mangadex/resources/componnents/userOption/SelectLanguages"));

const ServerAutoStart = React.lazy(() => import("@mangadex/resources/componnents/userOption/ServerAutoStart"));

const RtlSidebarOption = React.lazy(() => import("@mangadex/resources/componnents/userOption/RTLSidebar"));

const ColorMode = React.lazy(() => import("@mangadex/resources/componnents/userOption/ColorMode"));

const UserFeedBackBox = React.lazy(() => import("@mangadex/resources/componnents/user/feedback/box"));

export default function UserOptionModal() {
    const { state, changeOption, toggle } = useUserOptionModal();
    return (
        <React.Fragment>
            <ReactHotkeys
                keyName="ctrl+o"
                onKeyDown={() => {
                    toggle();
                }}
            />
            <Chakra.Modal isOpen={state} size={"3xl"} onClose={() => changeOption(false)}>
                <Chakra.ModalOverlay />
                <Chakra.ModalContent>
                    <Chakra.ModalHeader>
                        <Chakra.Tooltip
                            hasArrow
                            label={
                                <Chakra.HStack>
                                    <Chakra.Text>
                                        you can open this with
                                    </Chakra.Text>
                                    <React.Fragment>
                                        <Chakra.Kbd color="slateblue">ctrl</Chakra.Kbd> +
                                        <Chakra.Kbd color="slateblue">O</Chakra.Kbd>
                                    </React.Fragment>
                                </Chakra.HStack>
                            }
                        >
                            Mangadex Options
                        </Chakra.Tooltip>
                    </Chakra.ModalHeader>
                    <Chakra.ModalCloseButton />
                    <Chakra.ModalBody>
                        <Chakra.Tabs orientation="vertical">
                            <Chakra.TabList>
                                <Chakra.Tab>
                                    <Chakra.HStack>
                                        <Chakra.Icon as={FiBook} />
                                        <Chakra.Text>
                                            Chapter Languages
                                        </Chakra.Text>
                                    </Chakra.HStack>
                                </Chakra.Tab>
                                <Chakra.Tab>
                                    <Chakra.HStack>
                                        <Chakra.Icon as={FiServer} />
                                        <Chakra.Text as={"span"}>
                                            Offline Server
                                        </Chakra.Text>
                                    </Chakra.HStack>
                                </Chakra.Tab>
                                <Chakra.Tab>
                                    <Chakra.HStack>
                                        <Chakra.Icon as={FiLayout} />
                                        <Chakra.Text as={"span"}>
                                            Layout and interface
                                        </Chakra.Text>
                                    </Chakra.HStack>
                                </Chakra.Tab>
                                <Chakra.Tab>
                                    <Chakra.HStack>
                                        <Chakra.Icon as={FiMessageSquare} />
                                        <Chakra.Text as={"span"}>
                                            User FeedBack
                                        </Chakra.Text>
                                    </Chakra.HStack>
                                </Chakra.Tab>
                            </Chakra.TabList>
                            <Chakra.TabPanels>
                                <Chakra.TabPanel>
                                    <Chakra.Box width={"full"}>
                                        <Chakra.Text as={"span"}>Translated Languages : <Chakra.Tooltip
                                            label={"It's applies for chapters"}
                                        >
                                            <ChakraIcons.QuestionIcon />
                                        </Chakra.Tooltip></Chakra.Text>
                                        <React.Suspense
                                            fallback={<Chakra.Tag>Loading...</Chakra.Tag>}
                                        >
                                            <SelectLanguages />
                                        </React.Suspense>
                                    </Chakra.Box>
                                </Chakra.TabPanel>
                                <Chakra.TabPanel>
                                    <Chakra.HStack>
                                        <Chakra.Text as={"span"}>Server Auto Start : <Chakra.Tooltip
                                            label={"The server will start before the Mangadex Page is loaded. Only works after the page refresh"}
                                        >
                                            <ChakraIcons.QuestionIcon />
                                        </Chakra.Tooltip></Chakra.Text>
                                        <React.Suspense
                                            fallback={<Chakra.Tag>Loading...</Chakra.Tag>}
                                        >
                                            <ServerAutoStart />
                                        </React.Suspense>
                                    </Chakra.HStack>
                                </Chakra.TabPanel>
                                <Chakra.TabPanel>
                                    <Chakra.VStack alignItems={"start"}>
                                        <Chakra.HStack>
                                            <Chakra.Text as={"span"}>Sidebar Position : </Chakra.Text>
                                            <React.Suspense
                                                fallback={<Chakra.Tag>Loading...</Chakra.Tag>}
                                            >
                                                <RtlSidebarOption />
                                            </React.Suspense>
                                        </Chakra.HStack>
                                        <Chakra.HStack>
                                            <Chakra.Text as={"span"}>Color Mode : </Chakra.Text>
                                            <React.Suspense
                                                fallback={<Chakra.Tag>Loading...</Chakra.Tag>}
                                            >
                                                <ColorMode />
                                            </React.Suspense>
                                        </Chakra.HStack>
                                    </Chakra.VStack>
                                </Chakra.TabPanel>
                                <Chakra.TabPanel>
                                    <React.Suspense
                                        fallback={<Chakra.Tag>Loading...</Chakra.Tag>}
                                    >
                                        <UserFeedBackBox />
                                    </React.Suspense>
                                </Chakra.TabPanel>
                            </Chakra.TabPanels>
                        </Chakra.Tabs>
                    </Chakra.ModalBody>
                    <Chakra.ModalFooter>
                        <ActivateKuru />
                    </Chakra.ModalFooter>
                </Chakra.ModalContent>
            </Chakra.Modal>
        </React.Fragment>
    );
}