import * as Chakra from "@chakra-ui/react";
import React from "react";
import ChakraContainer from "../../layout/Container";
import { RefreshAndBackButtons } from "./RefreshAndBackButtons";


export function ShowStringError({ error }: {
    error: string;
}) {
    return (
        <ChakraContainer width={"100%"} maxHeight={"100vh"} height={"container.md"}>
            <Chakra.Alert
                variant={"top-accent"}
                status="error"
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height={"full"}
                gap={3}
            >
                <Chakra.AlertIcon boxSize={"10"} />
                <Chakra.AlertTitle fontSize={"2xl"}>
                    {error}
                </Chakra.AlertTitle>
                <Chakra.AlertDescription>
                    <RefreshAndBackButtons />
                </Chakra.AlertDescription>
            </Chakra.Alert>
        </ChakraContainer>
    );
}
