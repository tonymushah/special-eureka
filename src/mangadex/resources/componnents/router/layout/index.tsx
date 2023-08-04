import { Mangadex_suspense, trackEvent } from "@mangadex/index";
import MyErrorBounderies from "@mangadex/resources/componnents/error/MyErrorBounderies";
import { queryClient } from "@mangadex/resources/query.client";
import React from "react";

const BasicWebsitesRessources = React.lazy(() => import("@commons-res/components/BasicWebsitesRessources"));

const Loader = React.lazy(() => import("./Loader"));

const Providers = React.lazy(() => import("./Providers"));

const AnimationLayout = React.lazy(() => import("./Animation"));

export default function MangadexLayout() {
    trackEvent("mangadex-page-entrance");
    return (
        <MyErrorBounderies>
            <Mangadex_suspense>
                <BasicWebsitesRessources queryClient={queryClient}>
                    <Loader />
                    <Providers>
                        <AnimationLayout/>
                    </Providers>
                </BasicWebsitesRessources>
            </Mangadex_suspense>
        </MyErrorBounderies >
    );
}

