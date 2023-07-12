import { usePropsChapter } from "@mangadex/resources/componnents/chapter/v1/PropsContext";
import * as Chakra from "@chakra-ui/react";
import Images from "./Images";
import React from "react";

const ChapterFullScreen_ = React.lazy(() => import("../ChapterFullScreen"));


export default function ChapterFullScreen() {
    const { chapter } = usePropsChapter();
    return (
        <React.Suspense
            fallback={
                <Chakra.AbsoluteCenter>
                    <Chakra.Spinner />
                </Chakra.AbsoluteCenter>
            }
        >
            <ChapterFullScreen_ chapter={chapter}>
                <Images />
            </ChapterFullScreen_>
        </React.Suspense>
    );
}