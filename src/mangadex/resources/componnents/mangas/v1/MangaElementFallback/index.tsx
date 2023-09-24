import * as Chakra from "@chakra-ui/react";
import { FallBackImage } from "./FallBackImage";

export default function MangaElementFallback() {
    const backgroundColor = Chakra.useColorModeValue("gray.100", "gray.800");
    return (
        <Chakra.Box
            cursor={"wait"}
            width={"fit-content"}
            backgroundColor={backgroundColor}
            borderRadius={"10px"}
            height={"160px"}
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
                        <Chakra.GridItem
                            rowSpan={3}
                            colSpan={4}
                        >
                            <FallBackImage />
                        </Chakra.GridItem>
                        <Chakra.GridItem
                            rowSpan={1}
                            colSpan={8}
                        >
                            <Chakra.Skeleton height={"30px"} mt={2} />
                        </Chakra.GridItem>
                        <Chakra.GridItem
                            rowSpan={1}
                            colSpan={8}
                        >
                            <Chakra.HStack>
                                <Chakra.Text as={"span"}>Publication : </Chakra.Text>
                                <Chakra.Tag variant={"solid"}>Loading...</Chakra.Tag>
                            </Chakra.HStack>
                        </Chakra.GridItem>
                        <Chakra.GridItem
                            rowSpan={1}
                            colSpan={8}
                        >
                            <Chakra.SkeletonText />
                        </Chakra.GridItem>
                    </Chakra.Grid>
                </Chakra.Box>
            </Chakra.Center >
        </Chakra.Box >
    );
}