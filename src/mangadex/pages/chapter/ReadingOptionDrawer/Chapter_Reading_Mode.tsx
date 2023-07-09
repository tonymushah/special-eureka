import { HStack, Center, Text, Spinner } from "@chakra-ui/react";
import React from "react";

const Chapter_Reading_mode = React.lazy(() => import("../ChapterReadingMode"));


export default function ChapterReadingModeOption() {
        return (
            <HStack>
                <Text as={"span"}>Reading mode</Text>
                <React.Suspense
                    fallback={
                        <Center>
                            <Spinner />
                        </Center>
                    }
                >
                    <Chapter_Reading_mode />
                </React.Suspense>
            </HStack>
        );
    }