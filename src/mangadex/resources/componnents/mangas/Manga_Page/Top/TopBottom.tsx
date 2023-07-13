import React from "react";
import ButtonGroup__ from "../ButtonGroup__";
import Publication from "./Publication";
import Tags from "./Tags";
import * as Chakra from "@chakra-ui/react";

export default function TopButtom() {
    return (
        <Chakra.Box
            display={{
                base: "inherit",
                lg: "none"
            }}
        >
            <React.Fragment>
                <Chakra.VStack display={"block"}>
                    <Chakra.Text
                        fontWeight={"bold"}
                        padding={0}
                        margin={0}
                    >
                        <Publication />
                    </Chakra.Text>
                    <Chakra.Text
                        noOfLines={0}
                        padding={0}
                        margin={0}
                    >
                        <Tags />
                    </Chakra.Text>
                    <ButtonGroup__ />
                </Chakra.VStack>
            </React.Fragment>
        </Chakra.Box>
    );
}