import { Center, HStack, Text } from "@chakra-ui/react";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import React from "react";

const Chapter_Reading_mode = React.lazy(() => import("../ChapterReadingMode"));


export default function ChapterReadingModeOption() {
        return (
            <HStack>
                <Text as={"span"}>Reading mode</Text>
                <React.Suspense
                    fallback={
                        <Center>
                            <MangadexSpinner />
                        </Center>
                    }
                >
                    <Chapter_Reading_mode />
                </React.Suspense>
            </HStack>
        );
    }