import * as Chakra from "@chakra-ui/react";
import { usePropsChapter } from "@mangadex/resources/componnents/chapter/v1/PropsContext";
import React from "react";
import Images from "./Images";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";

const ChapterFullScreen_ = React.lazy(() => import("../ChapterFullScreen"));


export default function ChapterFullScreen() {
    const { chapter } = usePropsChapter();
    return (
        <React.Suspense
            fallback={
                <Chakra.AbsoluteCenter>
                    <MangadexSpinner />
                </Chakra.AbsoluteCenter>
            }
        >
            <ChapterFullScreen_ chapter={chapter}>
                <Images />
            </ChapterFullScreen_>
        </React.Suspense>
    );
}