import * as Chakra from "@chakra-ui/react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import React from "react";
import ReactHotkeys from "react-hot-keys";
import FullScreenOptionsProvider from "./FullScreenOptionsProvider";
import FullScreenOptions from "./FullScreenOptions";
import { useChapterFullscreen } from "../../../fullscreen/useChapterFullscreen";
import useChapterReadingModeOption from "../ChapterReadingMode/useChapterReadingModeOption";
import { ReadingMode } from "@mangadex/api/internal/UserOptions/ReadingMode";

export default function ChapterFullScreen(props: React.PropsWithChildren<{
    chapter: Chapter
}>) {
    const fullscreen = useChapterFullscreen();
    const { query : mode } = useChapterReadingModeOption();
    return (
        <React.Fragment>
            <ReactHotkeys
                keyName="ctrl+f"
                onKeyDown={() => {
                    fullscreen.toggle();
                }}
            />
            <ReactHotkeys
                keyName="esc"
                onKeyDown={() => {
                    fullscreen.update(false);
                }}
            />
            <Chakra.Box
                height={"100vh"}
                overflow={mode.data == ReadingMode.DoublePage || mode.data == ReadingMode.SinglePage ? "overflow" : "auto"}
                onDoubleClick={() => {
                    fullscreen.toggle();
                }}
            >
                <FullScreenOptionsProvider>
                    <FullScreenOptions
                        isShow={fullscreen.query.data}
                        chapter={props.chapter}
                        onCloseButtonClick={() => {
                            fullscreen.update(false);
                        }}
                    />
                    {
                        props.children
                    }
                </FullScreenOptionsProvider>
            </Chakra.Box>
        </React.Fragment>
    );
}