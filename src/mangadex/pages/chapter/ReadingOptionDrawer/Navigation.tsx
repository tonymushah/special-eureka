import { HStack, Center, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { useReadingDraweContext } from ".";

const Chapter_Previous_Next = React.lazy(() => import("../Chapter_Previous_Next"));

export default function Navigation() {
    const chapter = useReadingDraweContext();
    return (
        <HStack>
            <Text as={"span"}>
                Navigation :
            </Text>
            <React.Suspense
                fallback={
                    <Center>
                        <Spinner />
                    </Center>
                }
            >
                <Chapter_Previous_Next
                    src={chapter}
                />
            </React.Suspense>
        </HStack>
    );
}