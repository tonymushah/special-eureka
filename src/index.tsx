import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, Box, Spinner, AbsoluteCenter } from "@chakra-ui/react";

import "@mangadex/resources/Poppins/Poppins.css";

document.querySelectorAll("body")[0].style.fontFamily = "Poppins";

// TODO Add custom window decoration 
// import BoxDecoration from "@commons-res/components/BoxDecoration";

const App = React.lazy(() => import("./App"));

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const app = ReactDOM.createRoot(document.getElementById("app")!);

app.render(
    <React.StrictMode>
        <ChakraProvider>
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