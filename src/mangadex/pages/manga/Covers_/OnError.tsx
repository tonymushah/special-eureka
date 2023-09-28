import React from "react";
import * as Chakra from "@chakra-ui/react";
import { UseQueryResult } from "@tanstack/react-query";
import { InnertOnError } from "./InnertOnError";

export function OnError(query: UseQueryResult<boolean, Error>) {
    return (
        <React.Fragment>
            <Chakra.Alert status={"error"}>
                <Chakra.AlertIcon />
                <Chakra.AlertTitle>Can&apos;t find Mangadex Website</Chakra.AlertTitle>
                <Chakra.AlertDescription>
                    <Chakra.Button
                        colorScheme={"green"}
                        onClick={() => query.refetch()}
                    >
                        Refresh
                    </Chakra.Button>
                </Chakra.AlertDescription>
            </Chakra.Alert>
            <InnertOnError/>
        </React.Fragment>
    );
}

