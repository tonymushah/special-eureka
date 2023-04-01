import * as Chakra from "@chakra-ui/react";
import React from "react";
import TryCatch from "./commons-res/components/TryCatch";

const Close_splashscreen = React.lazy(() => import("./splashscreen/Close_splashscreen"));
//const Navigator = React.lazy(() => import("./commons-res/components/Navigator_Default"));
const Router = React.lazy(() => import("./router"));

export default function App() {
    return (
        <Chakra.Box
            fontFamily="Poppins"
        >
            <TryCatch
                catch={(error: Error) => (
                    <Chakra.Box
                        height="100vh"
                        width="full"
                    >
                        <Chakra.AbsoluteCenter>
                            <Chakra.Box textAlign="center">
                                <Chakra.Heading>
                                    Error on loading the app
                                </Chakra.Heading>

                                <Chakra.Text>
                                    Error Details
                                </Chakra.Text>

                                <Chakra.Alert status="error">
                                    <Chakra.AlertIcon />

                                    <Chakra.AlertTitle>
                                        {error.name}
                                    </Chakra.AlertTitle>

                                    <Chakra.AlertDescription>
                                        {error.message}
                                    </Chakra.AlertDescription>
                                </Chakra.Alert>
                            </Chakra.Box>
                        </Chakra.AbsoluteCenter>
                    </Chakra.Box>
                )}
            >

                <React.Suspense
                    fallback={
                        <Chakra.Box
                            height="100vh"
                            width="100%"
                        >
                            <Chakra.AbsoluteCenter>
                                <Chakra.Spinner
                                    color='orange.500'
                                    size="xl"
                                    thickness='4px'
                                />
                            </Chakra.AbsoluteCenter>
                        </Chakra.Box>
                    }
                >
                    <Router />
                </React.Suspense>

            </TryCatch>

            <React.Suspense>
                <Close_splashscreen />
            </React.Suspense>
        </Chakra.Box>
    );
}