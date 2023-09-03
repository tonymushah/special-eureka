import * as Chakra from "@chakra-ui/react";

export default function MangaVerticalElementFallback() {
    return (
        <Chakra.Box
            cursor={"wait"}
            width={"fit-content"}
            backgroundColor={"gray.100"}
            borderRadius={"10px"}
        >
            <Chakra.Center>
                <Chakra.Box
                    width={"150px"}
                >
                    <Chakra.Skeleton
                        borderTopRadius={"10px"}
                        height={"150px"}
                    />
                    <Chakra.Skeleton
                        borderBottomRadius={"10px"}
                    >
                        <Chakra.Center>
                            <Chakra.Heading
                                //textAlign={"center"}
                                size={"md"}
                                noOfLines={2}
                                margin={"15px"}
                                fontFamily={"inherit"}
                            >
                                Loading...
                            </Chakra.Heading>
                        </Chakra.Center>
                    </Chakra.Skeleton>
                </Chakra.Box>
            </Chakra.Center >
        </Chakra.Box >
    );
}