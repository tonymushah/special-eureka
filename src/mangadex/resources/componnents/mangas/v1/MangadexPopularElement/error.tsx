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
    React.useEffect(() => {
        console.error(error);
    },[]);
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
function ErrorComp__(error : Error){
    return (
        <ErrorBoundaryComp error={error} />
    );
}

export default function ErrorBoundary({ children }: React.PropsWithChildren) {
    return (
        <TryCatch
            catch={ErrorComp__}
        >
            {children}
        </TryCatch>
    );
}