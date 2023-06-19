import React from "react";
import { Outlet, RouteObject } from "react-router-dom";
import * as Chakra from "@chakra-ui/react";

const NotFound404 = React.lazy(() => import("./commons-res/404NotFound"));

const Index_Page = React.lazy(() => import("./index_page"));

const Route_Objects = React.lazy(() => import("./router/GetActiveRoutes"));

const NavigatorReactRouter = React.lazy(() => import("./commons-res/components/NavigatorReactRouter"));

function RouterSuspense(props: React.PropsWithChildren) {
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
            {
                props.children
            }
        </React.Suspense>
    );
}

export default function Router() {

    const All_Routes: RouteObject = {
        "path": "/",
        "element": (
            <RouterSuspense>
                <NavigatorReactRouter>
                    <Outlet/>
                </NavigatorReactRouter>
            </RouterSuspense>
        ),
        children: [
            {
                index: true,
                element: (
                    <RouterSuspense>
                        <Index_Page/>
                    </RouterSuspense>
                )
            }
        ]
    };
    const notFoundRoute: RouteObject = {
        path: "*",
        element: (
            <RouterSuspense>
                <NavigatorReactRouter>
                    <Outlet/>
                </NavigatorReactRouter>
            </RouterSuspense>
        ),
        children: [
            {
                index: true,
                element: (
                    <RouterSuspense>
                        <NotFound404/>
                    </RouterSuspense>
                )
            }
        ]
    };
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
    );
}
