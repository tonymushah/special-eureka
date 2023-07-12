import { Center, HStack, Tag, TagLabel } from "@chakra-ui/react";
import { make_first_UpperCare } from "@mangadex/api/internal/Utils";
import { useProps } from ".";

export default function Publication() {
    const { src } = useProps();
    return (
        <HStack>
            <Center
                display={"inline"}
            >
                Publication :
                &nbsp;
            </Center>
            <Tag
                fontSize={"xs"}
                colorScheme={
                    src.get_status() == "ongoing" ? "green" : (
                        src.get_status() == "completed" ? "blue" : (
                            src.get_status() == "hiatus" ? "orange" : (
                                src.get_status() == "cancelled" ? "red" : "teal"
                            )
                        )
                    )
                }
                variant={"solid"}
            >
                <TagLabel>{make_first_UpperCare(src.get_status())}</TagLabel>
            </Tag>
        </HStack>
    );
}