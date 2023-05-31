import React from "react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import * as Chakra from "@chakra-ui/react";
import useChapterReadingDrawer from "@mangadex/resources/hooks/fullscreenOption";

const Chapter_Reading_mode = React.lazy(() => import("./ChapterReadingMode"));

const ChapterNavigationModal = React.lazy(() => import("@mangadex/resources/componnents/chapter/ChapterNavigationModal"));

const Chapter_Previous_Next = React.lazy(() => import("./Chapter_Previous_Next"));

const PageSelection = React.lazy(() => import("./PageSelection"));

const ImageWidthSlider = React.lazy(() => import("./ChapterFullScreen/ImageWidthSlider"));

export default function ReadingDrawer(props: {
    chapter: Chapter,
}) {
    const { query, changeOption } = useChapterReadingDrawer();
    const [isOverlay, state] = Chakra.useBoolean(true);
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
                        <Chakra.Box>
                            Navigation :
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
                        <Chakra.Stack
                            mt={3}
                            spacing={"2px"}
                            direction="column"
                        >
                            <React.Suspense>
                                <ImageWidthSlider />
                            </React.Suspense>
                        </Chakra.Stack>
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
                                <Chapter_Reading_mode chapterID={props.chapter.get_id()} />
                            </React.Suspense>
                        </Chakra.Box>
                        <React.Suspense
                            fallback={<Chakra.Spinner></Chakra.Spinner>}
                        >
                            <ChapterNavigationModal chapter={props.chapter} />
                        </React.Suspense>
                        <Chakra.Text mt={3} mb={0}>
                            Select a page
                        </Chakra.Text>
                        <React.Suspense
                            fallback={<Chakra.Spinner></Chakra.Spinner>}
                        >
                            <PageSelection chapter={props.chapter} />
                        </React.Suspense>
                    </Chakra.DrawerBody>
                </Chakra.DrawerContent>
            </Chakra.Drawer>
        </React.Fragment>
    );
}