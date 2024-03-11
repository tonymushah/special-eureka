import React from "react";
import { Outlet } from "react-router";
import RouterSuspense from "@router/RouterSuspense";
import AnimationLayout from "@mangadex/resources/componnents/router/layout/Animation";

const DashboardNavBar = React.lazy(() => import("@dashboard/resources/components/DashBoardNavBar"));

const ToDevModal = React.lazy(() => import("@dashboard/resources/components/ToDevModal"));

const BasicWebsitesRessources = React.lazy(() => import("@commons-res/components/BasicWebsitesRessources"));

export default function DashboardLayout() {
    return (
        <RouterSuspense>
            <AnimationLayout>
                <ToDevModal />
                <BasicWebsitesRessources>
                    <RouterSuspense>
                        <React.Fragment>
                            <DashboardNavBar />
                            <Outlet />
                        </React.Fragment>
                    </RouterSuspense>
                </BasicWebsitesRessources>
            </AnimationLayout>
        </RouterSuspense>
    );
}