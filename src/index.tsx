import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, Box, Spinner, AbsoluteCenter } from "@chakra-ui/react";

const app = ReactDOM.createRoot(document.getElementById("app")!);
const App = React.lazy(() => import("./App"));

app.render(
    <React.StrictMode>
        
            <ChakraProvider>
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
            </ChakraProvider>
    </React.StrictMode>
);
