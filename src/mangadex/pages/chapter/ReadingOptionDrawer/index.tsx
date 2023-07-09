import React from "react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import * as Chakra from "@chakra-ui/react";
import useChapterReadingDrawer from "@mangadex/resources/hooks/fullscreenOption";
import useChapterReadingModeOption from "../ChapterReadingMode/useChapterReadingModeOption";
import { ReadingMode } from "@mangadex/api/internal/UserOptions/ReadingMode";

const DirectionSelection = React.lazy(() => import("../DirectionSelection"));




const ReadingDrawerContext = React.createContext<Chapter | undefined>(undefined);

export function useReadingDraweContext(){
    const data = React.useContext(ReadingDrawerContext);
    if(data == undefined){
        throw new Error("The Reading Drawer Context Provider is not implemented");
    }
    return data;
}

export function ReadingDrawerContextProvider({ value , children } : React.PropsWithChildren<{
    value : Chapter
}>){
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
    
    function Direction() {
        const reading_mode = useChapterReadingModeOption();
        if (reading_mode.query.data != ReadingMode.LongStrip) {
            return (
                <Chakra.HStack>
                    <Chakra.Text as={"span"}>Direction : </Chakra.Text>
                    <React.Suspense>
                        <DirectionSelection />
                    </React.Suspense>
                </Chakra.HStack>
            );
        } else {
            return (
                <React.Fragment />
            );
        }
    }
    return (
        <React.Fragment>
            <Chakra.Drawer
                isOpen={query.data ?? false}
                onClose={() => {
                    changeOption(false);
                }}
            >
                {
                    isOverlay == true ? (
                        <Chakra.DrawerOverlay
                            zIndex={"100"}
                        />
                    ) : (
                        <React.Fragment/>
                    )
                }
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
                            <Navigation />
                            <OptionOverlay />
                            <ImageWidthController />
                            <ChapterReadingModeOption />
                            <Direction />
                            <NavigationModal />
                            <PageSelection />
                        </Chakra.VStack>
                    </Chakra.DrawerBody>
                </Chakra.DrawerContent>
            </Chakra.Drawer>
        </React.Fragment>
    );
}