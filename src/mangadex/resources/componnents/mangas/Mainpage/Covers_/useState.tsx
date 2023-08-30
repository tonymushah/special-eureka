import React from "react";
import { Offset_limits } from "@mangadex/api/internal/Utils";
import { MangaPageProps } from ".";

export function useState(props: MangaPageProps) {
    const offset_limits = React.useMemo(() => {
        const value = new Offset_limits();
        value.set_limits(25);
        return value;
    }, []);
    // [x] Refactor into a function
    const queryKey_ = React.useMemo(() => queryKey(props), []);
    return { offset_limits, queryKey : queryKey_ };
}

export function queryKey(props: MangaPageProps) {
    return ["mdx", "manga", props.src.get_id(), "-covers"];
}

