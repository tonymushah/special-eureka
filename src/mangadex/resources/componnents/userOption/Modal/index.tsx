import * as Chakra from "@chakra-ui/react";
import useUserOptionModal from "@mangadex/resources/hooks/userOptions/ModalContext";
import React from "react";
import ReactHotkeys from "react-hot-keys";
import ActivateKuru from "../../kuru_kuru/ActivateKuru";
import ChapterLanguages, { ChapterLanguagesTab } from "./ChapterLanguages";
import Layout_Interface, { Layout_InterfaceTab } from "./Layout_Interface";
import OfflineServer, { OfflineServerTab } from "./OfflineServer";
import UserFeedBack, { UserFeedBackTab } from "./UserFeedBack";

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
                                <ChapterLanguagesTab/>
                                <OfflineServerTab/>
                                <Layout_InterfaceTab/>
                                <UserFeedBackTab/>
                            </Chakra.TabList>
                            <Chakra.TabPanels>
                                <ChapterLanguages/>
                                <OfflineServer/>
                                <Layout_Interface/>
                                <UserFeedBack/>
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