import * as Chakra from "@chakra-ui/react";
import { Chapter } from "../../../api/structures/Chapter";
import React from "react";
import * as Fullscreen from "react-full-screen";
import ReactHotkeys from "react-hot-keys";
import FullScreenOptionsProvider from "./FullScreenOptionsProvider";
import FullScreenOptions from "./FullScreenOptions";

export default function ChapterFullScreen(props: React.PropsWithChildren<{
    chapter : Chapter
}>) {
    const FullscreenHandle = Fullscreen.useFullScreenHandle();
    return (
        <ReactHotkeys
            keyName="ctrl+f"
            onKeyDown={() => {
                FullscreenHandle.enter()
            }}
        >
            <Fullscreen.FullScreen
                handle={FullscreenHandle}
            >
                <Chakra.Box
                    height={"100vh"}
                    overflow={"scroll"}
                    onDoubleClick={() => {
                        FullscreenHandle.enter()
                    }}
                >
                    <FullScreenOptionsProvider>
                        <FullScreenOptions
                            isShow={FullscreenHandle.active}
                            chapter={props.chapter}
                            onCloseButtonClick={FullscreenHandle.exit}
                        />
                        {
                            props.children
                        }
                    </FullScreenOptionsProvider>
                </Chakra.Box>
            </Fullscreen.FullScreen>
        </ReactHotkeys>
    )
}