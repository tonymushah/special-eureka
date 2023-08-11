import { HStack, Text } from "@chakra-ui/react";
import React from "react";
import { useReadingDraweContext } from ".";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";

const PageSelection_ = React.lazy(() => import("../PageSelection"));

export default function PageSelection() {
    const chapter = useReadingDraweContext();
    return (
        <HStack>
            <Text as={"span"}>
                Select a page :
            </Text>
            <React.Suspense
                fallback={<MangadexSpinner/>}
            >
                <PageSelection_ chapter={chapter} />
            </React.Suspense>
        </HStack>
    );
}