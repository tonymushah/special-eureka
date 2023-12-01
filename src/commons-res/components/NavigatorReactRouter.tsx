import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Kbd,
    Image
} from "@chakra-ui/react";

import websites from "../../websites";
import ReactHotkeys from "react-hot-keys";
import { Link } from "react-router-dom";

export default function NavigatorReactRouter_(props: React.PropsWithChildren) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    function switch_modal_state() {
        if (isOpen == true) {
            onClose();
        } else {
            onOpen();
        }
    }
    return (
        <React.Fragment>
            <ReactHotkeys
                keyName='ctrl+k'
                onKeyDown={switch_modal_state}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Navigator</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {
                            websites.map((value) => (
                                <Button as={Link} colorScheme={value.button_colorScheme} to={value.route} leftIcon={
                                    <Image
                                        src={value.icon}
                                        width={"20px"}
                                    />
                                } key={value.name}>{value.name}</Button>
                            ))
                        }
                    </ModalBody>

                    <ModalFooter>
                        <p>To use the Navigator : </p>
                        <p><Kbd
                            textColor={"black"}
                        >Ctrl</Kbd> + <Kbd
                            textColor={"black"}
                        >K</Kbd></p>

                    </ModalFooter>
                </ModalContent>
            </Modal>
            {
                props.children
            }</React.Fragment>
    );
}