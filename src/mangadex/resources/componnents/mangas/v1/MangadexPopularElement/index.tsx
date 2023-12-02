import Vanilla from "./vanilla";
import ErrorBoundary from "./error";
import Manga from "@mangadex/api/structures/Manga";
import React from "react";

const MangaPopularElement = React.memo(function MangaPopularElement(props: {
    src: Manga
}) {
    return (
        <ErrorBoundary>
            <Vanilla {...props} />
        </ErrorBoundary>
    );
});

export default MangaPopularElement;