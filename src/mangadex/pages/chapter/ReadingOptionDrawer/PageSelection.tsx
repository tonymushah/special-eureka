import { HStack, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { useReadingDraweContext } from ".";

const PageSelection_ = React.lazy(() => import("../PageSelection"));

export default function PageSelection() {
    const chapter = useReadingDraweContext();
    return (
        <HStack>
            <Text as={"span"}>
                Select a page :
            </Text>
            <React.Suspense
                fallback={<Spinner></Spinner>}
            >
                <PageSelection_ chapter={chapter} />
            </React.Suspense>
        </HStack>
    );
}