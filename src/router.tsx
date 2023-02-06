import React from "react";
import { RouteObject } from "react-router-dom";
import * as Chakra from "@chakra-ui/react";

const NotFound404 = React.lazy(() => import("./commons-res/404NotFound"));

const Index_Page = React.lazy(() => import("./index_page"));

const Route_Objects = React.lazy(() => import("./router/GetActiveRoutes"));

export default function Router() {

    const All_Routes: RouteObject = {
        "path": "/",
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
                <Index_Page />
            </React.Suspense>
        ),
    }
    const notFoundRoute: RouteObject = {
        path: "*",
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
                <NotFound404 />
            </React.Suspense>
        )
    }
    return (
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
            <Route_Objects
                additional_routes={[
                    All_Routes,
                    notFoundRoute
                ]}
            />
        </React.Suspense>
    )
}
