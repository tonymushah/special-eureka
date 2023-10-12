import * as Chakra from "@chakra-ui/react";
import React from "react";
import { isRouteErrorResponse } from "react-router";
import ChakraContainer from "../../layout/Container";
import RefreshAndBackButtons from "./RefreshAndBackButtons";
import ShowUnknownError from "./ShowUnknownError";

export default function ShowErrorResponse({ error }: {
    error: unknown;
}) {
    if (isRouteErrorResponse(error)) {
        return (
            <ChakraContainer width={"100%"} maxHeight={"100vh"} height={"container.md"}>
                <Chakra.Alert
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
                        <React.Fragment>
                            {error.status}
                        </React.Fragment>
                        <React.Fragment>
                            &nbsp;-&nbsp;
                        </React.Fragment>
                        <React.Fragment>
                            {error.statusText}
                        </React.Fragment>
                    </Chakra.AlertTitle>
                    <Chakra.AlertDescription>
                        <Chakra.VStack>
                            <Chakra.Box>
                                <Chakra.Text>
                                    {JSON.stringify(error.data)}
                                </Chakra.Text>
                            </Chakra.Box>
                            <Chakra.Box>
                                <RefreshAndBackButtons />
                            </Chakra.Box>
                        </Chakra.VStack>
                    </Chakra.AlertDescription>
                </Chakra.Alert>
            </ChakraContainer>
        );
    } else {
        return (
            <ShowUnknownError error={error}/>
        );
    }
}
