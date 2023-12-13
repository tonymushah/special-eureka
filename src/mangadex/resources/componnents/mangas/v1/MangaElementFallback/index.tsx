import * as Chakra from "@chakra-ui/react";
import React from "react";
import GridFallBackImage from "./GridFallBackImage";
import GridTitleFallback from "./GridTitleFallback";
import GridTagFallback from "./GridTagFallback";
import GridDescriptionFallback from "./GridDescriptionFallback";

const MangaElementFallback = React.memo(function MangaElementFallback() {
    const backgroundColor = Chakra.useColorModeValue("gray.100", "gray.800");
    return (
        <Chakra.Box
            cursor={"wait"}
            width={"fit-content"}
            backgroundColor={backgroundColor}
            borderRadius={"10px"}
            height={"160px"}
            borderColor={"#cacaca"}
            border={"1px"}
        >
            <Chakra.Center>
                <Chakra.Box
                    width={"fit-content"}
                >
                    <Chakra.Grid
                        width={{
                            base: "19em"
                        }}
                        templateRows='repeat(3)'
                        templateColumns='repeat(12, 1fr)'
                        columnGap={3}
                        rowGap={1}
                        paddingRight={"10px"}
                    >
                        <GridFallBackImage />
                        <GridTitleFallback />
                        <GridTagFallback />
                        <GridDescriptionFallback />
                    </Chakra.Grid>
                </Chakra.Box>
            </Chakra.Center >
        </Chakra.Box >
    );
});

export default MangaElementFallback;