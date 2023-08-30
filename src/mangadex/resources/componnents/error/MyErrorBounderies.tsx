import { Alert, AlertDescription, AlertIcon, AlertTitle, Heading, Text } from "@chakra-ui/react";
import TryCatch from "@commons-res/components/TryCatch";
import { Mangadex_suspense } from "@mangadex/index";
import React from "react";

function OnError(e: Error) {
    return (
        <Alert
            status="error"
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
        >
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='lg'>
                {
                    e.name
                }
            </AlertTitle>
            <AlertDescription maxWidth='sm'>
                <Text>
                    {e.message}
                </Text>
                <Heading size={"md"} fontFamily={"inherit"}>Stack trace</Heading>
                <Text>
                    {e.stack}
                </Text>
            </AlertDescription>
        </Alert>
    );
}

export default function MyErrorBounderies(props: React.PropsWithChildren) {
    return (
        <TryCatch
            catch={OnError}
        >
            <Mangadex_suspense>
                {
                    props.children
                }
            </Mangadex_suspense>
        </TryCatch>
    );
}