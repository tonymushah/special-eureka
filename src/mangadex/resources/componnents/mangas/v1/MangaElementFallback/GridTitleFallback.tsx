import * as Chakra from "@chakra-ui/react";
import React from "react";

const GridTitleFallback = React.memo(function GridTitleFallback() {
    return (
        <Chakra.GridItem
            rowSpan={1}
            colSpan={8}
        >
            <Chakra.Skeleton height={"30px"} mt={2} />
        </Chakra.GridItem>
    );
});

export default GridTitleFallback;
