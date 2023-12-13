import * as Chakra from "@chakra-ui/react";
import React from "react";

const GridDescriptionFallback = React.memo(function GridDescriptionFallback() {
    return (
        <Chakra.GridItem
            rowSpan={1}
            colSpan={8}
        >
            <Chakra.SkeletonText />
        </Chakra.GridItem>
    );
});

export default GridDescriptionFallback;
