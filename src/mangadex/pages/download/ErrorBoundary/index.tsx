import React from "react";
import { RouteErrorBoundary } from "@mangadex/resources/componnents/router/error/Boundary";
import * as Chakra from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import { RefreshServerBackButtons } from "./Bouttons";

export default function ErrorBoundary(){
    const error = useRouteError();
    if (isRouteErrorResponse(error) && error.status == 503) {
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
                                <RefreshServerBackButtons />
                            </Chakra.Box>
                        </Chakra.VStack>
                    </Chakra.AlertDescription>
                </Chakra.Alert>
            </ChakraContainer>
        );
    } else {
        return (
            <RouteErrorBoundary/>
        );
    }
}