import "@commons-res/fonts";
import "@commons-res/sentry/inject";
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, Box, Spinner, AbsoluteCenter, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import { defaultOptions } from "@commons-res/sentry";

window.Sentry.init(
    defaultOptions
);

// TODO Add custom window decoration 
// import BoxDecoration from "@commons-res/components/BoxDecoration";

const App = React.lazy(() => import("./App"));

const appElement = document.getElementById("app");

if (appElement != undefined) {
    const app = ReactDOM.createRoot(appElement);
    app.render(
        <React.StrictMode>
            <ColorModeScript type="localStorage"/>
            <ChakraProvider theme={theme}>
                <Box>
                    <React.Suspense
                        fallback={
                            <Box width={"100%"} height={"100vh"}>
                                <AbsoluteCenter>
                                    <Spinner
                                        size="xl"
                                        color='orange.500'
                                        thickness='4px'
                                    />
                                </AbsoluteCenter>
                            </Box>
                        }
                    >
                        <App />
                    </React.Suspense>
                </Box>
            </ChakraProvider>
        </React.StrictMode>
    );
}