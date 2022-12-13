import * as Chakra from "@chakra-ui/react"
import React from "react";

export default function ErrorEL1(props : {
    error : any
}) {
    let error: any = props.error;
    return (
        <Chakra.Alert status="error">
            <Chakra.AlertIcon></Chakra.AlertIcon>
            <Chakra.AlertTitle>We caught some error</Chakra.AlertTitle>
            <Chakra.AlertDescription>{error.message}</Chakra.AlertDescription>
        </Chakra.Alert>
    )
}