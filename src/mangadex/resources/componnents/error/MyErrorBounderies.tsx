import { AbsoluteCenter, Alert, AlertDescription, AlertIcon, AlertTitle, Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import TryCatch from "../../../../commons-res/components/TryCatch";

export default function MyErrorBounderies(props: React.PropsWithChildren) {
    return (
        <TryCatch
            catch={(error: Error) => (
                <Box
                    width={"full"}
                    height={"100vh"}
                >
                    <AbsoluteCenter>
                        <Box textAlign={"center"}>
                            <Heading>Error on loading the app</Heading>
                            <Text>Error Details</Text>
                            <Alert status="error">
                                <AlertIcon />
                                <AlertTitle>{error.name}</AlertTitle>
                                <AlertDescription>{error.message}</AlertDescription>
                            </Alert>
                        </Box>
                    </AbsoluteCenter>
                </Box>
            )}
        >
            {
                props.children
            }
        </TryCatch>
    )
}