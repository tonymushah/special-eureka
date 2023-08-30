import React from "react";
import * as Chakra from "@chakra-ui/react";
import MangadexSpinner from "../../kuru_kuru/MangadexSpinner";


export function Group_Page_Suspense(props: React.PropsWithChildren) {
    return (
        <React.Suspense
            fallback={<Chakra.Box>
                <Chakra.Center>
                    <MangadexSpinner />
                </Chakra.Center>
            </Chakra.Box>}
        >
            {props.children}
        </React.Suspense>
    );
}
