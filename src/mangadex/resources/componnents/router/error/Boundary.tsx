import * as Chakra from "@chakra-ui/react";
import React from "react";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";
import ChakraContainer from "../../layout/Container";

export function RouteErrorBoundary() {
    const error = useRouteError();
    const navigate = useNavigate();
    const [isTranstion, startTransition] = React.useTransition();
    if (isRouteErrorResponse(error)) {
        if (error.error != undefined) {
            return (
                <ChakraContainer maxHeight={"100vh"} width={"100%"} height={"container.md"}>
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
                            {error.error.message}
                        </Chakra.AlertTitle>
                        <Chakra.AlertDescription>
                            <Chakra.Button
                                onClick={() => {
                                    startTransition(() => {
                                        navigate(".");
                                    });
                                }}
                                isLoading={isTranstion}
                            >
                                Refresh
                            </Chakra.Button>
                        </Chakra.AlertDescription>
                    </Chakra.Alert>
                </ChakraContainer>
            );
        } else {
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
                            <Chakra.HStack>
                                <Chakra.Text>
                                    {JSON.stringify(error.data)}
                                </Chakra.Text>
                                <Chakra.Button
                                    colorScheme="orange"
                                    onClick={() => {
                                        startTransition(() => {
                                            navigate(".");
                                        });
                                    }}
                                    isLoading={isTranstion}
                                >
                                    Refresh
                                </Chakra.Button>
                            </Chakra.HStack>
                        </Chakra.AlertDescription>
                    </Chakra.Alert>
                </ChakraContainer>

            );
        }
    } else {
        if (error instanceof Error) {
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
                            {error.message}
                        </Chakra.AlertTitle>
                        <Chakra.AlertDescription>
                            <Chakra.Button
                                onClick={() => {
                                    startTransition(() => {
                                        navigate(".");
                                    });
                                }}
                                isLoading={isTranstion}
                            >
                                Refresh
                            </Chakra.Button>
                        </Chakra.AlertDescription>
                    </Chakra.Alert>
                </ChakraContainer>

            );
        } else if (typeof error == "string") {
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
                            <Chakra.Button
                                onClick={() => {
                                    startTransition(() => {
                                        navigate(".");
                                    });
                                }}
                                isLoading={isTranstion}
                            >
                                Refresh
                            </Chakra.Button>
                        </Chakra.AlertDescription>
                    </Chakra.Alert>
                </ChakraContainer>

            );
        } else {
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
                        <Chakra.AlertTitle
                            fontSize={"2xl"}
                        >
                            {JSON.stringify(error)}
                        </Chakra.AlertTitle>
                        <Chakra.AlertDescription>
                            <Chakra.Button
                                onClick={() => {
                                    startTransition(() => {
                                        navigate(".");
                                    });
                                }}
                                isLoading={isTranstion}
                            >
                                Refresh
                            </Chakra.Button>
                        </Chakra.AlertDescription>
                    </Chakra.Alert>
                </ChakraContainer>

            );
        }
    }
}