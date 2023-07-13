import { HStack, Box, Text } from "@chakra-ui/react";
import { ContextMenuItem } from "@radix-ui/react-context-menu";
import { BeatLoader } from "react-spinners";

export default function Loading() {
        return (
            <Box paddingRight={"2"} paddingLeft={"2"}
                as={ContextMenuItem}
                pl={2}
                pr={2}
                paddingTop={2}
                paddingBottom={2}
            >
                <HStack
                    spacing={"2"}
                >
                    <BeatLoader size={7} />
                    <Text as="span">
                        Loading...
                    </Text>
                </HStack>
            </Box>
        );
    }