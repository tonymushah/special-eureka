import * as Chakra from "@chakra-ui/react";

export default function MangaElementFallback() {
    return (
        <Chakra.Box
            cursor={"wait"}
            width={"fit-content"}
            backgroundColor={"gray.100"}
            borderRadius={"10px"}
        >
            <Chakra.Center>
                <Chakra.Box
                    display={
                        {
                            base: "inline-block",
                            md: "none"
                        }
                    }
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
                <Chakra.Skeleton
                    borderRadius={"10px"}
                >
                    <Chakra.Box
                        width={"fit-content"}
                        display={
                            {
                                base: "none",
                                md: "inline-block"
                            }
                        }
                    >
                        <Chakra.Grid
                            width={{
                                base: "400px"
                            }}
                            templateRows='repeat(3)'
                            templateColumns='repeat(12, 1fr)'
                            columnGap={3}
                            rowGap={1}
                            paddingRight={"10px"}
                        >
                            <Chakra.GridItem
                                rowSpan={2}
                                colSpan={4}
                            >
                                <Chakra.Skeleton
                                    borderTopLeftRadius={"10px"}
                                    borderBottomLeftRadius={"10px"}
                                    height={"full"}
                                />
                            </Chakra.GridItem>
                            <Chakra.GridItem
                                rowSpan={1}
                                colSpan={8}
                            >
                                <Chakra.Heading
                                    noOfLines={2}
                                    marginTop={"5px"}
                                    size={
                                        {
                                            base: "lg",
                                            lg: "lg"
                                        }
                                    }
                                    fontFamily={"inherit"}
                                > Loading </Chakra.Heading>
                            </Chakra.GridItem>
                            <Chakra.GridItem
                                rowSpan={1}
                                colSpan={8}
                            >
                                <Chakra.Text
                                    noOfLines={3}
                                    marginBottom={"5px"}
                                >
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi ipsum molestias fuga officia earum eaque, perspiciatis molestiae illo soluta placeat quisquam? Omnis, quasi necessitatibus dolore eaque incidunt enim doloribus ea.
                                </Chakra.Text>
                            </Chakra.GridItem>
                        </Chakra.Grid>
                    </Chakra.Box>
                </Chakra.Skeleton>
            </Chakra.Center >
        </Chakra.Box >
    );
}