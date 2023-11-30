import RouterSuspense from "@router/RouterSuspense";
import React from "react";

const NotFound404 = React.lazy(() => import("@commons-res/404NotFound"));

export default function Its404() {
    return (
        <RouterSuspense>
            <NotFound404 />
        </RouterSuspense>
    );
}