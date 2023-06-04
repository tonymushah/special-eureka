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
            <Chakra.Box>
                Navigation (Online) :
                &nbsp;
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
            </Chakra.Box>
        );
    }
    function OptionOverlay() {
        return (
            <Chakra.Stack
                mt={3}
                spacing={"2px"}
                direction="column"
            >
                <Chakra.Text p={0} m={0}>
                    Option Overlay :
                </Chakra.Text>
                <Chakra.Switch isChecked={isOverlay} onChange={() => {
                    state.toggle();
                }} />
            </Chakra.Stack>
        );
    }
    function ImageWidthController() {
        return (
            <Chakra.Stack
                mt={3}
                spacing={"2px"}
                direction="column"
            >
                <React.Suspense>
                    <ImageWidthSlider />
                </React.Suspense>
            </Chakra.Stack>
        );
    }
    function ChapterReadingModeOption() {
        return (
            <Chakra.Box
                marginTop={10}
            >
                <Chakra.Text p={0} m={0}>Chapter Reading mode</Chakra.Text>
                <React.Suspense
                    fallback={
                        <Chakra.Center>
                            <Chakra.Spinner />
                        </Chakra.Center>
                    }
                >
                    <Chapter_Reading_mode />
                </React.Suspense>
            </Chakra.Box>
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
            <React.Fragment>
                <Chakra.Text mt={3} mb={0}>
                    Select a page
                </Chakra.Text>
                <React.Suspense
                    fallback={<Chakra.Spinner></Chakra.Spinner>}
                >
                    <PageSelection_ chapter={props.chapter} />
                </React.Suspense>
            </React.Fragment>
        );
    }
    function Direction() {
        const reading_mode = useChapterReadingModeOption();
        if (reading_mode.query.data != ReadingMode.LongStrip) {
            return (
                <Chakra.HStack>
                    <Chakra.Text>Direction : </Chakra.Text>
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
                        <>
                        </>
                    )
                }
                <Chakra.DrawerContent zIndex={"100"}>
                    <Chakra.DrawerCloseButton />
                    <Chakra.DrawerHeader>
                        Reading Option
                    </Chakra.DrawerHeader>
                    <Chakra.DrawerBody>
                        <Navigation />
                        <OptionOverlay />
                        <ImageWidthController />
                        <ChapterReadingModeOption />
                        <Direction />
                        <NavigationModal />
                        <PageSelection />
                    </Chakra.DrawerBody>
                </Chakra.DrawerContent>
            </Chakra.Drawer>
        </React.Fragment>
    );
}