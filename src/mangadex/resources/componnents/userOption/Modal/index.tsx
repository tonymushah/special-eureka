import * as Chakra from "@chakra-ui/react";
import useUserOptionModal from "@mangadex/resources/hooks/userOptions/ModalContext";
import React from "react";
import ReactHotkeys from "react-hot-keys";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

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
                    <Header />
                    <Chakra.ModalCloseButton />
                    <Body />
                    <Footer/>
                </Chakra.ModalContent>
            </Chakra.Modal>
        </React.Fragment>
    );
}