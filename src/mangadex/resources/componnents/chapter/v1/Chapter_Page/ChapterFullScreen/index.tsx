import * as Chakra from "@chakra-ui/react";
import { Chapter } from "@mangadex/api/structures/Chapter";
import React from "react";
import ReactHotkeys from "react-hot-keys";
import FullScreenOptionsProvider from "./FullScreenOptionsProvider";
import FullScreenOptions from "./FullScreenOptions";
import { useChapterFullscreen } from "../../../fullscreen/useChapterFullscreen";
import { appWindow } from "@tauri-apps/api/window";

export default function ChapterFullScreen(props: React.PropsWithChildren<{
    chapter: Chapter
}>) {
    const fullscreen = useChapterFullscreen();
    React.useEffect(() => {
        async function t() {
            if (fullscreen.query.data == true) {
                appWindow.setFullscreen(true);
            } else {
                appWindow.setFullscreen(false);
            }
        }
        t().then();
    }, [fullscreen.query.data]);
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
                overflow={"scroll"}
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