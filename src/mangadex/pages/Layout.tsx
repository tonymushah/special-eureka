import { ProSidebarProvider } from "react-pro-sidebar";
import { Outlet } from "react-router-dom";
import MyErrorBounderies from "@mangadex/resources/componnents/error/MyErrorBounderies";
import React from "react";
import { Mangadex_suspense, trackEvent } from "@mangadex/index";
import ServerAutoStartLoader from "@mangadex/resources/componnents/loaders/ServerAutoStart";
import UserOptionProvider from "../resources/componnents/userOption/UserOptionProvider";
import { QueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";

const Content = React.lazy(() => import("@mangadex/resources/componnents/SideBar"));

const BasicWebsitesRessources = React.lazy(() => import("@commons-res/components/BasicWebsitesRessources"));

const ChapterFullScreenModeIniter = React.lazy(() => import("@mangadex/resources/componnents/chapter/fullscreen/Context"));

const UserOptionModal = React.lazy(() => import("@mangadex/resources/componnents/userOption/index"));

function Loader() {
    return (
        <React.Fragment>
            <ServerAutoStartLoader />
            <ChapterFullScreenModeIniter />
            <UserOptionModal />
        </React.Fragment>
    );
}

function Providers({ children }: React.PropsWithChildren) {
    return (
        <UserOptionProvider>
            <ProSidebarProvider>
                <Mangadex_suspense>
                    <Content>
                        <AnimatePresence>
                            {
                                children
                            }
                        </AnimatePresence>
                    </Content>
                </Mangadex_suspense>
            </ProSidebarProvider>
        </UserOptionProvider>
    );
}

export default function MangadexLayout() {
    const queryClient = new QueryClient({
        "defaultOptions": {
            "queries": {
                retry(failureCount) {
                    if (failureCount >= 3) {
                        return false;
                    } else {
                        return true;
                    }
                },
                staleTime: Infinity,
                onError(e) {
                    if (typeof e == "string") {
                        trackEvent("special-eureka-mangadex-query-error", {
                            error: e
                        });
                    } else if (typeof e == "object") {
                        if (e instanceof Error) {
                            trackEvent("special-eureka-mangadex-query-error", {
                                "error-message": e.message,
                                "error-name": e.name
                            });
                        }
                    }
                },
                "networkMode": "always",
                cacheTime : 1000 * 60 * 3
            },
            "mutations": {
                "networkMode": "always"
            }
        }
    });
    trackEvent("mangadex-page-entrance");
    return (
        <MyErrorBounderies>
            <Mangadex_suspense>
                <BasicWebsitesRessources queryClient={queryClient}>
                    <Loader />
                    <Providers>
                        <Outlet />
                    </Providers>
                </BasicWebsitesRessources>
            </Mangadex_suspense>
        </MyErrorBounderies >
    );
}

