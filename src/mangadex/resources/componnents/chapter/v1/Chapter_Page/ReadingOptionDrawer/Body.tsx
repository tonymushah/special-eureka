import React from "react";
import * as Chakra from "@chakra-ui/react";
import ChapterInfo from "./ChapterInfo";
import TryCatch from "@commons-res/components/TryCatch";

const PageSelection = React.lazy(() => import("./PageSelection"));
const ChapterReadingModeOption = React.lazy(() => import("./Chapter_Reading_Mode"));
const Direction = React.lazy(() => import("./Direction"));
const ImageWidthController = React.lazy(() => import("./ImageWidthController"));
const NavigationModal = React.lazy(() => import("./NavigationModal"));
const OptionOverlay = React.lazy(() => import("./OptionOverlay"));
const Navigation = React.lazy(() => import("./Navigation"));

function OnError(error: Error) {
    return (
        <Chakra.Alert variant={"left-accent"} status="error">
            <Chakra.AlertIcon />
            <Chakra.AlertTitle>{error.name}</Chakra.AlertTitle>
            <Chakra.AlertDescription>{error.message}</Chakra.AlertDescription>
        </Chakra.Alert>
    );
}

export function Body() {
    return (
        <Chakra.DrawerBody>
            <Chakra.VStack alignItems={"intial"} spacing={"10px"}>
                <TryCatch catch={OnError}>
                    <React.Suspense
                        fallback={
                            <Chakra.Alert variant={"left-accent"} status="loading">
                                <Chakra.AlertIcon />
                                <Chakra.AlertTitle>Loading componnents...</Chakra.AlertTitle>
                                <Chakra.AlertDescription>Yes, everything is lazy loaded now</Chakra.AlertDescription>
                            </Chakra.Alert>
                        }
                    >
                        <ChapterInfo />
                        <Navigation />
                        <OptionOverlay />
                        <ImageWidthController />
                        <ChapterReadingModeOption />
                        <Direction />
                        <NavigationModal />
                        <PageSelection />
                    </React.Suspense>
                </TryCatch>
            </Chakra.VStack>
        </Chakra.DrawerBody>
    );
}
