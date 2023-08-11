import { usePropsChapter } from "@mangadex/resources/componnents/chapter/v1/PropsContext";
import React from "react";

const Download_Chapter_withHotkeys = React.lazy(() => import("../Download_Chapter_withHotkeys"));

const ReadingDrawer = React.lazy(() => import("../ReadingOptionDrawer"));

export function Drawer_P_Hotkeys() {
    const { chapter } = usePropsChapter();
    return (
        <React.Suspense>
            <ReadingDrawer chapter={chapter} />
            <Download_Chapter_withHotkeys
                chap_id={chapter.get_id()}
            />
        </React.Suspense>
    );
}