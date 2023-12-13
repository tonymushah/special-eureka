import * as Chakra from "@chakra-ui/react";
import { FallBackImage } from "./FallBackImage";
import React from "react";

const GridFallBackImage = React.memo(function GridFallBackImage() {
    return (
        <Chakra.GridItem
            rowSpan={3}
            colSpan={4}
        >
            <FallBackImage />
        </Chakra.GridItem>
    );
});

export default GridFallBackImage;