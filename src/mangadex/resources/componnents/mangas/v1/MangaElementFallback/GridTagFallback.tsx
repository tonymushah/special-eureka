import * as Chakra from "@chakra-ui/react";
import React from "react";

const GridTagFallback = React.memo(function GridTagFallback() {
    return (
        <Chakra.GridItem
            rowSpan={1}
            colSpan={8}
        >
            <Chakra.HStack>
                <Chakra.Text as={"span"}>Publication : </Chakra.Text>
                <Chakra.Tag variant={"solid"}>Loading...</Chakra.Tag>
            </Chakra.HStack>
        </Chakra.GridItem>
    );
});

export default GridTagFallback;
