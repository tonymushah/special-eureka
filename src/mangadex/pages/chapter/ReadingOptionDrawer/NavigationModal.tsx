import { Spinner } from "@chakra-ui/react";
import React from "react";
import { useReadingDraweContext } from ".";

const ChapterNavigationModal = React.lazy(() => import("@mangadex/resources/componnents/chapter/ChapterNavigationModal"));

export default function NavigationModal() {
    const chapter = useReadingDraweContext();
    return (
        <React.Suspense
            fallback={<Spinner></Spinner>}
        >
            <ChapterNavigationModal chapter={chapter} />
        </React.Suspense>
    );
}