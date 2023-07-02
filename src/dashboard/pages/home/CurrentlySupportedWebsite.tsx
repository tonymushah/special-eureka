import websites from "@/websites";
import { Box, Heading, Kbd, Text, Wrap, WrapItem } from "@chakra-ui/react";
import Website_Componnent from "@dashboard/resources/components/Website_Componnents";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";

export default function CurrentlySupportedWebsites() {
    return (
        <ChakraContainer>
            <Box>
                <Box textAlign={"center"}>
                    <Heading color={"white"}>Currently Supported Websites</Heading>
                    <Text textColor={"white"}>You can use <Kbd textColor={"black"}>ctrl</Kbd> + <Kbd textColor={"black"}>k</Kbd> to navigate beetween website safely</Text>
                </Box>
            </Box>
            <Wrap spacing={"10px"}>
                {
                    websites.map((value) => (
                        <WrapItem key={value.name}>
                            <Website_Componnent
                                to_use={value}
                            />
                        </WrapItem>
                    ))
                }
            </Wrap>
        </ChakraContainer>
    );
}