import * as Chakra from "@chakra-ui/react";
import React from "react";
import * as Fullscreen from "react-full-screen";
import ReactHotkeys from "react-hot-keys";

export default function ChapterFullScreen(props: React.PropsWithChildren) {
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
                    {
                        props.children
                    }
                </Chakra.Box>
            </Fullscreen.FullScreen>
        </ReactHotkeys>
    )
}
