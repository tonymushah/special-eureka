import React from "react";
import { Outlet, RouteObject } from "react-router";
import * as Chakra from "@chakra-ui/react";

const DashboardNavBar = React.lazy(() => import("./DashBoardNavBar"));

export function getDashboardPath() {
    return "/dashboard"
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
                <React.Fragment>
                    <DashboardNavBar/>
                    <Outlet/>
                </React.Fragment>
            </React.Suspense>
        )
    }
    return router;
}

export default DashboardRouter()