import * as Chakra from "@chakra-ui/react";
import React from "react";

export function OnError(error: Error) {
    return (
        <Chakra.Alert status="error">
            <Chakra.AlertIcon />
            <Chakra.AlertTitle>
                {error.name}
            </Chakra.AlertTitle>
            <Chakra.AlertDescription>
                {error.message}
            </Chakra.AlertDescription>
        </Chakra.Alert>
    );
}
