import * as Chakra from "@chakra-ui/react";
import React from "react";
import { FiMessageSquare } from "react-icons/fi";
import UserFeedBackModal from "../../../user/feedback/modal";

export function ReportButton({ error }: {
    error: Error;
}) {
    const { isOpen, onClose, onOpen } = Chakra.useDisclosure();
    return (
        <React.Fragment>
            <Chakra.Button colorScheme="green" leftIcon={<FiMessageSquare />} isDisabled={isOpen} onClick={onOpen}>
                Send feedback
            </Chakra.Button>
            <UserFeedBackModal error={error} disclosureProps={{
                isOpen,
                onClose,
                onOpen,
            }} />
        </React.Fragment>
    );
}
