import * as Chakra from "@chakra-ui/react";
import React from "react";

const MangaVerticalElementFallback = React.memo(function MangaVerticalElementFallback() {
    const backgroundColor = Chakra.useColorModeValue("gray.100", "gray.800");
    return (
        <Chakra.Box
            cursor={"wait"}
            width={"fit-content"}
            backgroundColor={backgroundColor}
            borderRadius={"10px"}
            boxShadow={"md"}
        >
            <Chakra.Center>
                <Chakra.Box
                    width={"150px"}
                >
                    <Chakra.Skeleton
                        borderTopRadius={"10px"}
                        height={"200px"}
                    />
                    <Chakra.SkeletonText
                        p={2}
                    />
                </Chakra.Box>
            </Chakra.Center >
        </Chakra.Box >
    );
});

export default MangaVerticalElementFallback;