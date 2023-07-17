import { Alert, AlertDescription, AlertIcon, AlertTitle, Box } from "@chakra-ui/react";
import TryCatch from "@commons-res/components/TryCatch";
import React from "react";

function Laoyut({ children }: React.PropsWithChildren) {
    return (
        <Box
            marginBottom={2}
            width={"min-content"}
            height={{
                base: "min-content",
                md: "initial"
            }}
            textAlign={"start"}
            boxSize={"min-content"}
            borderStyle={"solid"}
            border={"1px"}
            borderColor={"#cacaca"}
            boxShadow={"md"}
        >
            {children}
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
                        {error.message}
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