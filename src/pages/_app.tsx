import React from "react";
import RouterSuspense from "@router/RouterSuspense";
import { Outlet } from "react-router";
import theme from "@theme";
import { tauriColorModeManager } from "@commons-res/theme";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

const Close_splashscreen = React.lazy(() => import("@splashscreen/Close_splashscreen"));

const FullscreenF11_ = React.lazy(() => import("@commons-res/components/FullscreenF11"));

const FullscreenF11 = () => (
    <React.Suspense fallback={<React.Fragment />}>
        <FullscreenF11_ />
    </React.Suspense>
);

const NavigatorReactRouter = React.lazy(() => import("@commons-res/components/NavigatorReactRouter"));

export default function AppLayout() {
    return (
        <React.Fragment>
            <ColorModeScript type="localStorage" />
            <ChakraProvider theme={theme} colorModeManager={tauriColorModeManager}>
                <RouterSuspense>
                    <FullscreenF11 />
                    <NavigatorReactRouter>
                        <Outlet />
                    </NavigatorReactRouter>
                    <Close_splashscreen />
                </RouterSuspense>
            </ChakraProvider>
        </React.Fragment>
    );
}