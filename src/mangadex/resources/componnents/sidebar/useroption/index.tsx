import React from "react";
import * as Chakra from "@chakra-ui/react";

const SelectLanguages = React.lazy(() => import("@mangadex/resources/componnents/userOption/SelectLanguages"));

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
                        <Chakra.VStack width={"full"} divider={<Chakra.Divider/>}>
                            <Chakra.Box>
                                <Chakra.Text as={"span"}>Languages : </Chakra.Text>
                                <React.Suspense
                                    fallback={<Chakra.Tag>Loading...</Chakra.Tag>}
                                >
                                    <SelectLanguages />
                                </React.Suspense>
                            </Chakra.Box>
                        </Chakra.VStack>
                    </Chakra.ModalBody>
                </Chakra.ModalContent>
            </Chakra.Modal>
        </React.Fragment>
    )
}