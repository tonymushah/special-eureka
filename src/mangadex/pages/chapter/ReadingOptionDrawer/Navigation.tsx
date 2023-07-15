import { Center, HStack, Text } from "@chakra-ui/react";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
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
                        <MangadexSpinner />
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