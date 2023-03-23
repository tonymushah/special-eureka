import React from "react";
import * as Chakra from "@chakra-ui/react";
import * as ChakraIcons from "@chakra-ui/icons";

const SelectLanguages = React.lazy(() => import("@mangadex/resources/componnents/userOption/SelectLanguages"));

const ServerAutoStart = React.lazy(() => import("@mangadex/resources/componnents/userOption/ServerAutoStart"));


export default function SideBarUserOption(props: React.PropsWithChildren) {
    const { isOpen, onOpen, onClose } = Chakra.useDisclosure();
    return (
        <React.Fragment>
            <Chakra.Box onClick={onOpen}>
                {
                    props.children
                }
            </Chakra.Box>
            <Chakra.Modal isOpen={isOpen} onClose={onClose}>
                <Chakra.ModalOverlay />
                <Chakra.ModalContent>
                    <Chakra.ModalHeader>
                        Mangadex Options
                    </Chakra.ModalHeader>
                    <Chakra.ModalCloseButton />
                    <Chakra.ModalBody>
                        <Chakra.VStack width={"full"} divider={<Chakra.Divider />}>
                            <Chakra.Box width={"full"}>
                                <Chakra.Text as={"span"}>Languages : </Chakra.Text>
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
                                    <ChakraIcons.QuestionIcon/>
                                </Chakra.Tooltip></Chakra.Text>
                                <React.Suspense
                                    fallback={<Chakra.Tag>Loading...</Chakra.Tag>}
                                >
                                    <ServerAutoStart />
                                </React.Suspense>
                            </Chakra.Box>
                        </Chakra.VStack>
                    </Chakra.ModalBody>
                </Chakra.ModalContent>
            </Chakra.Modal>
        </React.Fragment>
    )
}