import { Button, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Wrap, WrapItem, useDisclosure } from "@chakra-ui/react";
import React from "react";
import ReactHotkeys from "react-hot-keys";

function ActualModal() {
    const { isOpen, onToggle, onClose } = useDisclosure();
    return (
        <React.Fragment>
            <ReactHotkeys
                keyName="ctrl+alt+d"
                onKeyDown={onToggle}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>to devOnly area</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Wrap>
                            <WrapItem>
                                <Link href="/storybook">
                                    <Button colorScheme={"pink"}>Storybook</Button>
                                </Link>
                            </WrapItem>
                        </Wrap>

                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </React.Fragment>
    );
}

export default function ToDevModal() {
    // TODO Add a dev only appearance
    return (
        <ActualModal />
    );
}