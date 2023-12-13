import { Box } from "@chakra-ui/react";
import React from "react";
import { useLayoutBackGround } from "./useLayoutBackGround";

export default function Laoyut({ children }: React.PropsWithChildren) {
    const { backgroundColor, _hover_background } = useLayoutBackGround();
    return (
        <Box
            marginBottom={2}
            width={"min-content"}
            height={"160px"}
            textAlign={"start"}
            boxSize={"min-content"}
            borderStyle={"solid"}
            border={"1px"}
            borderColor={"#cacaca"}
            backgroundColor={backgroundColor}
            borderRadius={"10px"}
            overflow={"hidden"}
            _hover={{
                backgroundColor: _hover_background,
                transitionProperty: "backgroundColor",
                transitionDuration: "0.3s",
                transitionTimingFunction: "ease-in-out"
            }}
            boxShadow={"md"}
            transitionProperty={"backgroundColor"}
            transitionDuration={"0.3s"}
            transitionTimingFunction={"ease-in-out"}
        >
            {children}
        </Box>
    );
}


