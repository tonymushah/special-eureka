import * as Chakra from "@chakra-ui/react";
import React from "react";

export default function Header() {
    return (
        <Chakra.ModalHeader>
            <Chakra.Tooltip
                hasArrow
                label={
                    <Chakra.HStack>
                        <Chakra.Text>
                            you can open this with
                        </Chakra.Text>
                        <React.Fragment>
                            <Chakra.Kbd color="slateblue">ctrl</Chakra.Kbd> +
                            <Chakra.Kbd color="slateblue">O</Chakra.Kbd>
                        </React.Fragment>
                    </Chakra.HStack>
                }
            >
                Mangadex Options
            </Chakra.Tooltip>
        </Chakra.ModalHeader>
    );
}
