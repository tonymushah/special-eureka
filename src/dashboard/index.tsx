import React from "react";
import { Outlet, RouteObject } from "react-router";
import * as Chakra from "@chakra-ui/react";
import Dashboard_logo from "@commons-res/common-icon/eureka-logo6.svg";
import { trackEvent as aptabaseTrackEvent } from "@aptabase/tauri";

import "bootstrap/dist/css/bootstrap-grid.min.css";

const DashboardNavBar = React.lazy(() => import("./resources/components/DashBoardNavBar"));

const Home = React.lazy(() => import("./pages/home/index"));

const ToDevModal = React.lazy(() => import("./resources/components/ToDevModal"));

const BasicWebsitesRessources = React.lazy(() => import("@commons-res/components/BasicWebsitesRessources"));

const Updates = React.lazy(() => import("./pages/updates/index"));

export function trackEvent(name : string, payload?: {
    [key : string] : string | number
}){
    aptabaseTrackEvent(name, {
        "website" : "dashboard",
        "location" : window.location.href,
        ...payload
    });
}

export function getDashboardPath() {
    return "/dashboard";
}

export function getLogo() {
    return Dashboard_logo;
}

export function getProjectPath(){
    return getDashboardPath();
}

export function useTrackEvent(name : string, payload?:{
    [key : string] : string | number
}){
    React.useEffect(() => {
        trackEvent(name, payload);
    }, []);
}


function DashboardRouter(): RouteObject {
    const router: RouteObject = {
        "path": getDashboardPath(),
        "element": (
            <React.Suspense
                fallback={
                    <Chakra.Box
                        width={"100%"}
                        height={"100vh"}
                    >
                        <Chakra.AbsoluteCenter>
                            <Chakra.Spinner
                                size="xl"
                                color='orange.500'
                                thickness='4px'
                            />
                        </Chakra.AbsoluteCenter>
                    </Chakra.Box>
                }
            >
                <ToDevModal/>
                <BasicWebsitesRessources>
                    <React.Suspense
                        fallback={
                            <Chakra.Box
                                width={"100%"}
                                height={"100vh"}
                            >
                                <Chakra.AbsoluteCenter>
                                    <Chakra.Spinner
                                        size="xl"
                                        color='orange.500'
                                        thickness='4px'
                                    />
                                </Chakra.AbsoluteCenter>
                            </Chakra.Box>
                        }
                    >
                        <React.Fragment>
                            <DashboardNavBar />
                            <Outlet />
                        </React.Fragment>
                    </React.Suspense>
                </BasicWebsitesRessources>
            </React.Suspense>
        ),
        children: [
            {
                index: true,
                element: (
                    <React.Suspense
                        fallback={
                            <Chakra.Box
                                width={"100%"}
                                height={"100vh"}
                            >
                                <Chakra.AbsoluteCenter>
                                    <Chakra.Spinner
                                        size="xl"
                                        color='orange.500'
                                        thickness='4px'
                                    />
                                </Chakra.AbsoluteCenter>
                            </Chakra.Box>
                        }
                    >
                        <Home />
                    </React.Suspense>
                )
            },
            {
                path: "update-latest",
                element: (
                    <React.Suspense
                        fallback={
                            <Chakra.Box
                                width={"100%"}
                                height={"100vh"}
                            >
                                <Chakra.AbsoluteCenter>
                                    <Chakra.Spinner
                                        size="xl"
                                        color='orange.500'
                                        thickness='4px'
                                    />
                                </Chakra.AbsoluteCenter>
                            </Chakra.Box>
                        }
                    >
                        <Updates />
                    </React.Suspense>)
            }
        ]
    };
    return router;
}

export default DashboardRouter();