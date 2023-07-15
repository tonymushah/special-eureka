import React from "react";
import { useReadingDraweContext } from ".";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";

const ChapterNavigationModal = React.lazy(() => import("@mangadex/resources/componnents/chapter/ChapterNavigationModal"));

export default function NavigationModal() {
    const chapter = useReadingDraweContext();
    return (
        <React.Suspense
            fallback={<MangadexSpinner/>}
        >
            <ChapterNavigationModal chapter={chapter} />
        </React.Suspense>
    );
}