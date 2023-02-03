import React from "react";
import * as Chakra from "@chakra-ui/react";
import "/commons-res/bootstrap.css";
import "/commons-res/fontawesome-free-6.1.2-web/css/all.css"
import TryCatch from "./commons-res/components/TryCatch";
    const Navigator = React.lazy(() => import("./commons-res/components/Navigator_Default"));
    const Router = React.lazy(() => import("./router"));
export default function App(){
    return (
        <Chakra.Box
            fontFamily={"Poppins"}
        >
            <TryCatch
                catch={(error : Error) => (
                    <Chakra.Box
                        width={"full"}
                        height={"100vh"}
                    >
                        <Chakra.AbsoluteCenter>
                            <Chakra.Box textAlign={"center"}>
                                <Chakra.Heading>Error on loading the app</Chakra.Heading>
                                <Chakra.Text>Error Details</Chakra.Text>
                                <Chakra.Alert status="error">
                                    <Chakra.AlertIcon/>
                                    <Chakra.AlertTitle>{error.name}</Chakra.AlertTitle>
                                    <Chakra.AlertDescription>{error.message}</Chakra.AlertDescription>
                                </Chakra.Alert>
                            </Chakra.Box>
                        </Chakra.AbsoluteCenter>
                    </Chakra.Box>
                )}
            >
            <React.Suspense
                fallback={
                    <Chakra.Box width={"100%"} height={"100vh"}>
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
                <Navigator/>
                <Router/>
            </React.Suspense>
            </TryCatch>
        </Chakra.Box>
    );
}