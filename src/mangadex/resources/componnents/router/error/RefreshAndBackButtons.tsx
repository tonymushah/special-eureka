import * as Chakra from "@chakra-ui/react";
import React from "react";
import { useNavigate, useNavigation } from "react-router";
import { RepeatIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { FiMessageSquare } from "react-icons/fi";
import UserFeedBackModal from "../../user/feedback/modal";

export function RefreshAndBackButtons() {
    const [isTranstion, startTransition] = React.useTransition();
    const navigation = useNavigation();
    const navigate = useNavigate();
    return (
        <Chakra.ButtonGroup>
            <Chakra.Button onClick={() => {
                startTransition(() => {
                    history.back();
                });
            }}
                leftIcon={<ArrowBackIcon />}
                isLoading={isTranstion}
            >
                Go back
            </Chakra.Button>
            <Chakra.Button
                onClick={() => {
                    startTransition(() => {
                        navigate(".");
                    });
                }}
                leftIcon={<RepeatIcon />}
                colorScheme={"orange"}
                isLoading={isTranstion || navigation.state == "loading"}
            >
                Refresh
            </Chakra.Button>
        </Chakra.ButtonGroup>
    );
}

function ReportButton({ error } : {
    error : Error
}){
    const { isOpen, onClose, onOpen } = Chakra.useDisclosure();
    return(
        <React.Fragment>
            <Chakra.Button colorScheme="green" leftIcon={<FiMessageSquare/>} isDisabled={isOpen} onClick={onOpen}>
                Send feedback
            </Chakra.Button>
            <UserFeedBackModal error={error} disclosureProps={{
                isOpen,
                onClose,
                onOpen,
            }}/>
        </React.Fragment>
    );
}

export function RefreshReportAndBackButtons({error} : {
    error : Error
}) {
    const [isTranstion, startTransition] = React.useTransition();
    const navigation = useNavigation();
    const navigate = useNavigate();
    return (
        <Chakra.ButtonGroup>
            <Chakra.Button onClick={() => {
                startTransition(() => {
                    history.back();
                });
            }}
                leftIcon={<ArrowBackIcon />}
                isLoading={isTranstion}
            >
                Go back
            </Chakra.Button>
            <ReportButton error={error}/>
            <Chakra.Button
                onClick={() => {
                    startTransition(() => {
                        navigate(".");
                    });
                }}
                leftIcon={<RepeatIcon />}
                colorScheme={"orange"}
                isLoading={isTranstion || navigation.state == "loading"}
            >
                Refresh
            </Chakra.Button>
        </Chakra.ButtonGroup>
    );
}
