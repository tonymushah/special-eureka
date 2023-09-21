import React from "react";
import * as Chakra from "@chakra-ui/react";

export default function Laoyut({ children, isRefetching }: React.PropsWithChildren<{
    isRefetching?: boolean
}>) {
    const backgroundColor = Chakra.useColorModeValue("gray.100", "gray.900");
    const backgroundColorOnRefecthing = Chakra.useColorModeValue("orange.100", "orange.900");
    const backgroundColor_ = React.useMemo(() => isRefetching == undefined ? backgroundColor : (isRefetching ? backgroundColorOnRefecthing : backgroundColor), [isRefetching, backgroundColor, backgroundColorOnRefecthing]);
    return (
        <Chakra.LinkBox
            marginBottom={10}
            width={"fit-content"}
            backgroundColor={backgroundColor_}
            borderRadius={"10px"}
            border={"1px"}
            borderColor={"gray.200"}
            shadow={"md"}
        >
            <Chakra.Center>
                <Chakra.Box
                    display={
                        {
                            base: "inline-block"
                        }
                    }
                    width={"150px"}
                >
                    {children}
                </Chakra.Box>
            </Chakra.Center>
        </Chakra.LinkBox>
    );
}