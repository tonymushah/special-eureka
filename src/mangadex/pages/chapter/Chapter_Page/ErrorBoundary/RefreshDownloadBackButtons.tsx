import { ArrowBackIcon, RepeatIcon } from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import React from "react";
import { useNavigate, useNavigation } from "react-router";
import { DownloadButton } from "./DownloadButton";


export function RefreshDownloadBackButtons() {
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
            <DownloadButton />
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
