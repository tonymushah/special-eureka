import { ProSidebarProvider } from "react-pro-sidebar";
import { Outlet } from "react-router-dom";
import MyErrorBounderies from "@mangadex/resources/componnents/error/MyErrorBounderies";
import React from "react";
import { Mangadex_suspense, trackEvent } from "@mangadex";
import ServerAutoStartLoader from "@mangadex/resources/componnents/loaders/ServerAutoStart";
import UserOptionProvider from "../resources/componnents/userOption/UserOptionProvider";
import { QueryClient } from "@tanstack/react-query";

const Content = React.lazy(() => import("@mangadex/resources/componnents/SideBar"));

const BasicWebsitesRessources = React.lazy(() => import("@commons-res/components/BasicWebsitesRessources"));

const ChapterFullScreenModeIniter = React.lazy(() => import("@mangadex/resources/componnents/chapter/fullscreen/Context"));

const UserOptionModal = React.lazy(() => import("@mangadex/resources/componnents/userOption/index"));

export default function MangadexLayout() {
    const queryClient = new QueryClient({
        "defaultOptions" : {
            "queries" : {
                retry(failureCount) {
                    if (failureCount >= 3) {
                        return false;
                    } else {
                        return true;
                    }
                },
                staleTime : Infinity,
                onError(e){
                    if(typeof e == "string"){
                        trackEvent("special-eureka-mangadex-query-error", {
                            error : e
                        });
                    }else if(typeof e == "object"){
                        if(e instanceof Error){
                            trackEvent("special-eureka-mangadex-query-error", {
                                "error-message" : e.message,
                                "error-name" : e.name
                            });
                        }
                    }
                },
                "networkMode": "always"
            },
            "mutations" : {
                "networkMode": "always"
            }
        }
    });
    trackEvent("mangadex-page-entrance");
    return (
        <MyErrorBounderies>
            <Mangadex_suspense>
                <BasicWebsitesRessources queryClient={queryClient}>
                    <ServerAutoStartLoader />
                    <ChapterFullScreenModeIniter/>
                    <UserOptionModal/>
                    <UserOptionProvider>
                        <ProSidebarProvider>
                            <Mangadex_suspense>
                                <Content>
                                    <Outlet />
                                </Content>
                            </Mangadex_suspense>
                        </ProSidebarProvider>
                    </UserOptionProvider>
                </BasicWebsitesRessources>
            </Mangadex_suspense>
        </MyErrorBounderies>
    );
}