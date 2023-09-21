import { HStack, Tag, TagLabel, Text } from "@chakra-ui/react";
import { make_first_UpperCare } from "@mangadex/api/internal/Utils";
import { useProps } from ".";
import React from "react";

export default function Publication() {
    const { src } = useProps();
    const colorScheme = React.useMemo(() => src.get_status() == "ongoing" ? "green" : (
        src.get_status() == "completed" ? "blue" : (
            src.get_status() == "hiatus" ? "orange" : (
                src.get_status() == "cancelled" ? "red" : "teal"
            )
        )
    ), [src]);
    return (
        <HStack
            fontSize={"xs"}
        >
            <Text
                display={"inline"}
            >
                Publication :
            </Text>
            <Tag
                fontSize={"xs"}
                colorScheme={colorScheme}
                variant={"solid"}
            >
                <TagLabel>{make_first_UpperCare(src.get_status())}</TagLabel>
            </Tag>
        </HStack>
    );
}