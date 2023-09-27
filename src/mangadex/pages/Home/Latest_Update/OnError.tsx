import * as Chakra from "@chakra-ui/react";
import React from "react";
import ErrorEL1 from "@mangadex/resources/componnents/error/ErrorEL1";
import { Title } from "./Title";
import { useHomeLatest_Updates } from ".";

export function OnError() {
    const query = useHomeLatest_Updates();
    if (query.isError) {
        return (
            <Chakra.Box>
                <Title />
                <ErrorEL1 error={query.error} />
            </Chakra.Box>
        );
    } else {
        return (
            <React.Fragment />
        );
    }
}
