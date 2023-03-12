import { Button, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import React from "react";
import ReactHotkeys from "react-hot-keys";

export default function ToDevModal() {
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
                    <ModalHeader>To TestAreas</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    </ModalBody>
                    <ul>
                        <li>
                            <Link href="/test/testArea1/index.html">
                                TesetArea 1
                            </Link>
                        </li>
                        <li>
                            <Link href="/test/testArea2/index.html">
                                TesetArea 2
                            </Link>
                        </li>
                        <li>
                            <Link href="/test/testArea3/index.html">
                                TesetArea 3
                            </Link>
                        </li>
                        <li>
                            <Link href="/test/testArea4/index.html">
                                TesetArea 4
                            </Link>
                        </li>
                        <li>
                            <Link href="/test/testArea5/index.html">
                                TesetArea 5
                            </Link>
                        </li>
                    </ul>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </React.Fragment>
    )
}