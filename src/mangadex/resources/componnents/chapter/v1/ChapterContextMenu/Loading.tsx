import * as Chakra from "@chakra-ui/react";
import { ContextMenuItem } from "@radix-ui/react-context-menu";
import { BeatLoader } from "react-spinners";

export default function Loading() {
    return (
        <Chakra.Box paddingRight={"2"} paddingLeft={"2"}
            as={ContextMenuItem}
            pl={2}
            pr={2}
            paddingTop={2}
            paddingBottom={2}
        >
            <Chakra.HStack
                spacing={"2"}
            >
                <BeatLoader size={7} />
                <Chakra.Text as="span">
                    Loading...
                </Chakra.Text>
            </Chakra.HStack>
        </Chakra.Box>
    );
}