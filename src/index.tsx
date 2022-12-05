import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, Box, Center, Spinner } from "@chakra-ui/react";

const app = ReactDOM.createRoot(document.getElementById("app")!);
const App = React.lazy(() => import("./App"));

app.render(
    <ChakraProvider>
        <React.Suspense
            fallback={
                <Box width={"100%"} height={"100vh"}>
                    <Center>
                        <Spinner
                            size="xl"
                            color='orange.500'
                            thickness='4px'
                        />
                    </Center>
                </Box>
            }
        >
            <App />
        </React.Suspense>
    </ChakraProvider>
);
