import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Button, HStack, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useChakraToast } from "@commons-res/hooks/useChakraToast";
import { open } from "@tauri-apps/api/shell";
import React from "react";


type ExtLinkProps = {
    href: string;
    a_id?: string;
    children?: React.ReactNode
}
export function ExtLink(props: ExtLinkProps) {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const [isTransition, startTransition] = React.useTransition();
    const toast = useChakraToast({
        "duration": 9000,
        "isClosable": true,
        "position": "bottom-right",
        "status": "error",
        "title": "Error on opening the link"
    });
    const openLink = () => startTransition(() => {
        open(props.href).catch((e) => {
            if (typeof e == "string") {
                toast({
                    description: e
                });
            } else if (typeof e == "object") {
                if (e instanceof Error) {
                    toast({
                        description: e.message,
                        title: e.name
                    });
                }
            }
        }).finally(() => {
            onClose();
        });
    });
    return (
        <React.Fragment>
            <span id={props.a_id} onClick={onOpen}>{props.children}</span>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        You are opening an external link
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Heading size={"md"}>
                            {
                                props.href
                            }
                        </Heading>
                    </ModalBody>
                    <ModalFooter>
                        <HStack>
                            <Button onClick={openLink} isLoading={isTransition} leftIcon={
                                <ExternalLinkIcon />
                            } colorScheme="red" variant={"solid"}>
                                I know what i do
                            </Button>
                            <Button onClick={onClose} variant="outline" colorScheme="gray">
                                I want to go safe
                            </Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </React.Fragment>
    );
}
