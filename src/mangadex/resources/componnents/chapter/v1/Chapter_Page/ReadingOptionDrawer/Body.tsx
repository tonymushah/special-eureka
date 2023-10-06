import React from "react";
import * as Chakra from "@chakra-ui/react";
import ChapterInfo from "./ChapterInfo";

const PageSelection = React.lazy(() => import("./PageSelection"));
const ChapterReadingModeOption = React.lazy(() => import("./Chapter_Reading_Mode"));
const Direction = React.lazy(() => import("./Direction"));
const ImageWidthController = React.lazy(() => import("./ImageWidthController"));
const NavigationModal = React.lazy(() => import("./NavigationModal"));
const OptionOverlay = React.lazy(() => import("./OptionOverlay"));
const Navigation = React.lazy(() => import("./Navigation"));

export function Body() {
    return (
        <Chakra.DrawerBody>
            <Chakra.VStack alignItems={"intial"} spacing={"10px"}>
                <React.Suspense
                    fallback={<Chakra.Alert variant={"left-accent"} status="loading">
                        <Chakra.AlertIcon />
                        <Chakra.AlertTitle>Loading componnents...</Chakra.AlertTitle>
                        <Chakra.AlertDescription>Yes, everything is lazy loaded now</Chakra.AlertDescription>
                    </Chakra.Alert>}
                >
                    <ChapterInfo/>
                    <Navigation />
                    <OptionOverlay />
                    <ImageWidthController />
                    <ChapterReadingModeOption />
                    <Direction />
                    <NavigationModal />
                    <PageSelection />
                </React.Suspense>
            </Chakra.VStack>
        </Chakra.DrawerBody>
    );
}
