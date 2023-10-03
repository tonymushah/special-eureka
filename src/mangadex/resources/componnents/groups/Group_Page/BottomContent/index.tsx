import * as Chakra from "@chakra-ui/react";
import React from "react";
import ChakraContainer from "../../../layout/Container";
import ButtonLinks from "./ButtonLinks";

export default function BottomContent(props: React.PropsWithChildren) {
    const background = Chakra.useColorModeValue("gray.200", "gray.600");
    return (
        <Chakra.Box
            minH={"100%"}
            background={background}
        >
            <ChakraContainer
                paddingLeft={"5px"}
                paddingRight={"5px"}
            >
                <Chakra.VStack>
                    <ButtonLinks/>
                    <ChakraContainer>
                        {props.children}
                    </ChakraContainer>
                </Chakra.VStack>
            </ChakraContainer>
        </Chakra.Box>
    );
}
