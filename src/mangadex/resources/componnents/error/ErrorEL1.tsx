import * as Chakra from "@chakra-ui/react";
import React from "react";

export default function ErrorEL1(props : {
    error : Error
}) {
    return (
        <Chakra.Alert status="error">
            <Chakra.AlertIcon></Chakra.AlertIcon>
            <Chakra.AlertTitle>We caught some error</Chakra.AlertTitle>
            <Chakra.AlertDescription>{props.error.message}</Chakra.AlertDescription>
        </Chakra.Alert>
    );
}