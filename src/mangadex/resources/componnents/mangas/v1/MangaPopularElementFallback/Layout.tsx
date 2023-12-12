import * as Chakra from "@chakra-ui/react";
import React from "react";

export default function Layout({ children }: React.PropsWithChildren) {
    const background = Chakra.useColorModeValue("rgba(255, 255,255, 0.5)", "rgba(26, 32, 44, 0.5)");
    const backdropBrightness = Chakra.useColorModeValue("1.1", "0.9");
    return (
        <Chakra.Card
            backgroundRepeat={"no-repeat"}
            backgroundSize={"cover"}
            minW={"md"}
            margin={5}
        >
            <Chakra.Card
                background={background}
                backdropFilter='auto'
                backdropBlur={"20px"}
                backdropBrightness={backdropBrightness}
                direction={"row"}
                variant={"outline"}
            >
                {
                    children
                }
            </Chakra.Card>
        </Chakra.Card>
    );
}