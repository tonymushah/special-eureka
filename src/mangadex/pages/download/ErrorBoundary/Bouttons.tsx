import * as Chakra from "@chakra-ui/react";
import React from "react";
import { useNavigate, useNavigation } from "react-router";
import { RepeatIcon, ArrowBackIcon } from "@chakra-ui/icons";
import MangaManagerState from "@mangadex/resources/hooks/MangaManagerState";
import { FiServer } from "react-icons/fi";

export function ServerButton(){
    const { server_query : query, switch_server_state : state } = MangaManagerState();
    const [isTranstion, startTransition] = React.useTransition();
    return (
        <Chakra.Button
            colorScheme={query.data == true ? "green" : (query.isFetching || state.isLoading || isTranstion ? "blue" : "red")}
            isLoading={query.isFetching || state.isLoading || isTranstion}
            leftIcon={
                <FiServer/>
            }
            onClick={() => {
                startTransition(() => {
                    state.mutate();
                });
            }}
        >
            {query.data == true ? "Active" : (query.isFetching || state.isLoading ? "Loading" : "Inactive")}
        </Chakra.Button>
    );
}

export function RefreshServerBackButtons() {
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
            <ServerButton/>
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
