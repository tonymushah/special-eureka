import * as Chakra from "@chakra-ui/react";
import React from "react";
import BasicTwoElement from "../Base";

const ColorMode = React.lazy(() => import("@mangadex/resources/componnents/userOption/utils/ColorMode"));

export function ColorModeOption() {
    return (
        <BasicTwoElement title="Color Mode">
            <React.Suspense
                fallback={<Chakra.Tag>Loading...</Chakra.Tag>}
            >
                <ColorMode />
            </React.Suspense>
        </BasicTwoElement>
    );
}
