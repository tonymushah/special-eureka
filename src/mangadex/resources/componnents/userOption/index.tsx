import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import useUserOptionModal from "@mangadex/resources/hooks/userOptions/ModalContext";
import React from "react";
import ReactHotkeys from "react-hot-keys";

const SelectLanguages = React.lazy(() => import("@mangadex/resources/componnents/userOption/SelectLanguages"));

const ServerAutoStart = React.lazy(() => import("@mangadex/resources/componnents/userOption/ServerAutoStart"));

const RtlSidebarOption = React.lazy(() => import("@mangadex/resources/componnents/userOption/RTLSidebar"));


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
            <Chakra.Modal isOpen={state} onClose={() => changeOption(false)}>
                <Chakra.ModalOverlay />
                <Chakra.ModalContent>
                    <Chakra.ModalHeader>
                        Mangadex Options
                    </Chakra.ModalHeader>
                    <Chakra.ModalCloseButton />
                    <Chakra.ModalBody>
                        <Chakra.VStack width={"full"} divider={<Chakra.Divider />}>
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
                            <Chakra.Box width={"full"}>
                                <Chakra.Text as={"span"}>ServerAutoStart : <Chakra.Tooltip
                                    label={"The server will start before the Mangadex Page is loaded. Only works after the page refresh"}
                                >
                                    <ChakraIcons.QuestionIcon />
                                </Chakra.Tooltip></Chakra.Text>
                                <React.Suspense
                                    fallback={<Chakra.Tag>Loading...</Chakra.Tag>}
                                >
                                    <ServerAutoStart />
                                </React.Suspense>
                            </Chakra.Box>
                            <Chakra.Box width={"full"}>
                                <Chakra.Text as={"span"}>RTL Sidebar : <Chakra.Tooltip
                                    label={"The sidebar will be placed on right if checked, left otherwise"}
                                >
                                    <ChakraIcons.QuestionIcon />
                                </Chakra.Tooltip></Chakra.Text>
                                <React.Suspense
                                    fallback={<Chakra.Tag>Loading...</Chakra.Tag>}
                                >
                                    <RtlSidebarOption />
                                </React.Suspense>
                            </Chakra.Box>
                        </Chakra.VStack>
                    </Chakra.ModalBody>
                </Chakra.ModalContent>
            </Chakra.Modal>
        </React.Fragment>
    );
}