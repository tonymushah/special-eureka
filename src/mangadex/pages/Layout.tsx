import { ProSidebarProvider } from "react-pro-sidebar";
import { Outlet } from "react-router-dom";
import MyErrorBounderies from "@mangadex/resources/componnents/error/MyErrorBounderies";
import React from "react";
import { Mangadex_suspense } from "@mangadex";
import ServerAutoStartLoader from "@mangadex/resources/componnents/loaders/ServerAutoStart";
import UserOptionProvider from "../resources/componnents/userOption/UserOptionProvider";
import { QueryClient } from "react-query";

const Content = React.lazy(() => import("@mangadex/resources/componnents/SideBar"));

const BasicWebsitesRessources = React.lazy(() => import("@commons-res/components/BasicWebsitesRessources"));

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
                staleTime : Infinity
            }
        }
    });
    return (
        <MyErrorBounderies>
            <Mangadex_suspense>
                <BasicWebsitesRessources queryClient={queryClient}>
                    <ServerAutoStartLoader />
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