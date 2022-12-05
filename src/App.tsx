import React from "react";
import * as Chakra from "@chakra-ui/react";

export default function App(){
    const Navigator = React.lazy(() => import("./commons-res/components/Navigator_Default"));
    const Router = React.lazy(() => import("./router"));

    return (
        <Chakra.Box
            fontFamily={"Poppins"}
        >
            <React.Suspense
                fallback={
                    <Chakra.Box width={"100%"} height={"100vh"}>
                        <Chakra.Center>
                            <Chakra.Spinner 
                                size="xl"
                                color='orange.500'
                                thickness='4px'
                            />
                        </Chakra.Center>
                    </Chakra.Box>
                }
            >
                <Navigator/>
                <Router/>
            </React.Suspense>
        </Chakra.Box>
    );
}