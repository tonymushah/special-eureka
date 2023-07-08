import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

export default function Loading() {
    return (
        <Alert status="loading" variant={"left-accent"}>
            <AlertIcon />
            <AlertTitle>Initializing chapters...</AlertTitle>
        </Alert>
    );
}