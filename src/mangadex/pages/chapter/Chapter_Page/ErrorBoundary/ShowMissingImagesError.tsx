import * as Chakra from "@chakra-ui/react";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import React from "react";
import { isRouteErrorResponse } from "react-router";
import { RefreshDownloadBackButtons } from "./RefreshDownloadBackButtons";


export function ShowMissingImagesError({ error }: {
    error: unknown;
}) {
    if (isRouteErrorResponse(error) && error.status == 403) {
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
                                <RefreshDownloadBackButtons />
                            </Chakra.Box>
                        </Chakra.VStack>
                    </Chakra.AlertDescription>
                </Chakra.Alert>
            </ChakraContainer>
        );
    } else {
        return (
            <React.Fragment />
        );
    }
}
