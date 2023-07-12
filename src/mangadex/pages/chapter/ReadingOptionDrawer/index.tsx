import React from "react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import * as Chakra from "@chakra-ui/react";
import useChapterReadingDrawer from "@mangadex/resources/hooks/fullscreenOption";

const PageSelection = React.lazy(() => import("./PageSelection"));
const ChapterReadingModeOption = React.lazy(() => import("./Chapter_Reading_Mode"));
const Direction = React.lazy(() => import("./Direction"));
const ImageWidthController = React.lazy(() => import("./ImageWidthController"));
const NavigationModal = React.lazy(() => import("./NavigationModal"));
const OptionOverlay = React.lazy(() => import("./OptionOverlay"));
const Navigation = React.lazy(() => import("./Navigation"));

const ReadingDrawerContext = React.createContext<Chapter | undefined>(undefined);

export function useReadingDraweContext() {
    const data = React.useContext(ReadingDrawerContext);
    if (data == undefined) {
        throw new Error("The Reading Drawer Context Provider is not implemented");
    }
    return data;
}

export function ReadingDrawerContextProvider({ value, children }: React.PropsWithChildren<{
    value: Chapter
}>) {
    return (
        <ReadingDrawerContext.Provider value={value}>
            {children}
        </ReadingDrawerContext.Provider>
    );
}

export default function ReadingDrawer(props: {
    chapter: Chapter,
}) {
    const { query, changeOption } = useChapterReadingDrawer();


    return (
        <ReadingDrawerContextProvider value={props.chapter}>
            <Chakra.Drawer
                isOpen={query.data ?? false}
                onClose={() => {
                    changeOption(false);
                }}
            >
                <Chakra.DrawerContent
                    zIndex={"100"}
                    fontFamily={"inherit"}
                >
                    <Chakra.DrawerCloseButton />
                    <Chakra.DrawerHeader>
                        Reading Option
                    </Chakra.DrawerHeader>
                    <Chakra.DrawerBody>
                        <Chakra.VStack alignItems={"intial"} spacing={"10px"}>
                            <React.Suspense
                                fallback={
                                    <Chakra.Alert variant={"left-accent"} status="loading">
                                        <Chakra.AlertIcon />
                                        <Chakra.AlertTitle>Loading componnents...</Chakra.AlertTitle>
                                        <Chakra.AlertDescription>Yes, everything is lazy loaded now</Chakra.AlertDescription>
                                    </Chakra.Alert>
                                }
                            >
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
                </Chakra.DrawerContent>
            </Chakra.Drawer>
        </ReadingDrawerContextProvider>
    );
}