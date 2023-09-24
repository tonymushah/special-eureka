import * as Chakra from "@chakra-ui/react";

export default function MangaVerticalElementFallback() {
    return (
        <Chakra.Box
            cursor={"wait"}
            width={"fit-content"}
            backgroundColor={"gray.100"}
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
}