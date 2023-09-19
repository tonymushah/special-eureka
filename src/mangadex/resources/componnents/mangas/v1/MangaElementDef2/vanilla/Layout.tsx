import React from "react";
import * as Chakra from "@chakra-ui/react";

export default function Laoyut({
    children
}: React.PropsWithChildren) {
    const backgroundColor = Chakra.useColorModeValue("gray.200", "gray.900");
    const card_maxHeight: Chakra.ResponsiveValue<string> = {
        base: "10em"
    };
    return (
        <Chakra.Card maxHeight={card_maxHeight} backgroundColor={backgroundColor} direction={"row"} overflowY={"hidden"} minWidth={"sm"} border={"1px"} borderColor={"#cccccc"}>
            {children}
        </Chakra.Card>
    );
}