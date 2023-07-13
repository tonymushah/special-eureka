import { Alert, AlertDescription, AlertIcon, AlertTitle, Card } from "@chakra-ui/react";
import TryCatch from "@commons-res/components/TryCatch";
import React from "react";

function Laoyut({ children }: React.PropsWithChildren) {
    return (
        <Card
            minW={"md"}
            margin={5}
        >
            {children}
        </Card>
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