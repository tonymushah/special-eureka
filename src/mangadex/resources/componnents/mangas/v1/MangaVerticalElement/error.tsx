import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Center } from "@chakra-ui/react";
import TryCatch from "@commons-res/components/TryCatch";
import React from "react";

function Laoyut({ children }: React.PropsWithChildren) {
    return (
        <Box
            marginBottom={10}
            width={"fit-content"}
            borderRadius={"10px"}
            border={"1px"}
            borderColor={"gray.200"}
            shadow={"md"}
        >
            <Center>
                <Box
                    display={
                        {
                            base: "inline-block"
                        }
                    }
                    width={"150px"}
                >
                    {children}
                </Box>
            </Center>
        </Box>
    );
}

export function ErrorBoundaryComp({ error }: {
    error: Error | string
}) {
    if (error instanceof Error) {
        return (
            <Laoyut>
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle noOfLines={1}>
                        {error.name}
                    </AlertTitle>
                    <AlertDescription noOfLines={1}>
                        {error.name}
                    </AlertDescription>
                </Alert>
            </Laoyut>
        );
    } else {
        return (
            <Laoyut>
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>
                        Unexpected error
                    </AlertTitle>
                    <AlertDescription noOfLines={1}>
                        {error}
                    </AlertDescription>
                </Alert>
            </Laoyut>
        );
    }
}

export default function ErrorBoundary({ children }: React.PropsWithChildren) {
    return (
        <TryCatch
            catch={(error) => (
                <ErrorBoundaryComp error={error} />
            )}
        >
            {children}
        </TryCatch>
    );
}