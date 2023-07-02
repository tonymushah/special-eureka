import React from "react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import * as Chakra from "@chakra-ui/react";
import useChapterReadingDrawer from "@mangadex/resources/hooks/fullscreenOption";
import useChapterReadingModeOption from "./ChapterReadingMode/useChapterReadingModeOption";
import { ReadingMode } from "@mangadex/api/internal/UserOptions/ReadingMode";

const DirectionSelection = React.lazy(() => import("./DirectionSelection"));

const Chapter_Reading_mode = React.lazy(() => import("./ChapterReadingMode"));

const ChapterNavigationModal = React.lazy(() => import("@mangadex/resources/componnents/chapter/ChapterNavigationModal"));

const Chapter_Previous_Next = React.lazy(() => import("./Chapter_Previous_Next"));

const PageSelection_ = React.lazy(() => import("./PageSelection"));

const ImageWidthSlider = React.lazy(() => import("./ChapterFullScreen/ImageWidthSlider"));

export default function ReadingDrawer(props: {
    chapter: Chapter,
}) {
    const { query, changeOption } = useChapterReadingDrawer();
    const [isOverlay, state] = Chakra.useBoolean(true);
    function Navigation() {
        return (
            <Chakra.HStack>
                <Chakra.Text as={"span"}>
                    Navigation (Online) :
                </Chakra.Text>
                <React.Suspense
                    fallback={
                        <Chakra.Center>
                            <Chakra.Spinner />
                        </Chakra.Center>
                    }
                >
                    <Chapter_Previous_Next
                        src={props.chapter}
                    />
                </React.Suspense>
            </Chakra.HStack>
        );
    }
    function OptionOverlay() {
        return (
            <Chakra.HStack>
                <Chakra.Text p={0} m={0}>
                    Option Overlay :
                </Chakra.Text>
                <Chakra.Switch isChecked={isOverlay} onChange={() => {
                    state.toggle();
                }} />
            </Chakra.HStack>
        );
    }
    function ImageWidthController() {
        const reading_mode = useChapterReadingModeOption();
        if (reading_mode.query.data == ReadingMode.LongStrip || reading_mode.query.data == ReadingMode.WideStrip || reading_mode.query.data == ReadingMode.SinglePage) {
            return (
                <Chakra.HStack
                    mt={3}
                    spacing={"2px"}
                >
                    <React.Suspense>
                        <ImageWidthSlider />
                    </React.Suspense>
                </Chakra.HStack>
            );
        } else {
            return (<React.Fragment />);
        }
    }
    function ChapterReadingModeOption() {
        return (
            <Chakra.HStack>
                <Chakra.Text as={"span"}>Reading mode</Chakra.Text>
                <React.Suspense
                    fallback={
                        <Chakra.Center>
                            <Chakra.Spinner />
                        </Chakra.Center>
                    }
                >
                    <Chapter_Reading_mode />
                </React.Suspense>
            </Chakra.HStack>
        );
    }
    function NavigationModal() {
        return (
            <React.Suspense
                fallback={<Chakra.Spinner></Chakra.Spinner>}
            >
                <ChapterNavigationModal chapter={props.chapter} />
            </React.Suspense>
        );
    }
    function PageSelection() {
        return (
            <Chakra.HStack>
                <Chakra.Text as={"span"}>
                    Select a page : 
                </Chakra.Text>
                <React.Suspense
                    fallback={<Chakra.Spinner></Chakra.Spinner>}
                >
                    <PageSelection_ chapter={props.chapter} />
                </React.Suspense>
            </Chakra.HStack>
        );
    }
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