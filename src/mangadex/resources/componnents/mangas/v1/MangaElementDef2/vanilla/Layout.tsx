import React from "react";
import * as Chakra from "@chakra-ui/react";

export default function Laoyut({
    children
}: React.PropsWithChildren) {
    const backgroundColor = Chakra.useColorModeValue("gray.200", "gray.900");
    return (
        <Chakra.Card
            maxHeight={{
                base: "11em"
            }}
            backgroundColor={backgroundColor}
            direction={"row"}
            overflowY={"hidden"}
            minWidth={"sm"}
            border={"1px"}
            borderColor={"#cccccc"}
        >
            {children}
        </Chakra.Card>
    );
}