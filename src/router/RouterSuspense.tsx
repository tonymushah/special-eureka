import React from "react";
import * as Chakra from "@chakra-ui/react";

export default function RouterSuspense(props: React.PropsWithChildren) {
    return (
        <React.Suspense
            fallback={<Chakra.Box
                width={"100%"}
                height={"100vh"}
            >
                <Chakra.AbsoluteCenter>
                    <Chakra.Spinner
                        size="xl"
                        color='orange.500'
                        thickness='4px' />
                </Chakra.AbsoluteCenter>
            </Chakra.Box>}
        >
            {props.children}
        </React.Suspense>
    );
}
