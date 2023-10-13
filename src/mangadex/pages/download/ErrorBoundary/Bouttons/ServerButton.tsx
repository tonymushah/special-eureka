import * as Chakra from "@chakra-ui/react";
import React from "react";
import MangaManagerState from "@mangadex/resources/hooks/MangaManagerState";
import { FiServer } from "react-icons/fi";


export default function ServerButton() {
    const { server_query: query, switch_server_state: state } = MangaManagerState();
    const [isTranstion, startTransition] = React.useTransition();
    return (
        <Chakra.Button
            colorScheme={query.data == true ? "green" : (query.isFetching || state.isLoading || isTranstion ? "blue" : "red")}
            isLoading={query.isFetching || state.isLoading || isTranstion}
            leftIcon={<FiServer />}
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
