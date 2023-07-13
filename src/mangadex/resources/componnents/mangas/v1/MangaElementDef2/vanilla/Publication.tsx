import * as Chakra from "@chakra-ui/react";
import { make_first_UpperCare } from "@mangadex/api/internal/Utils";
import { useProps } from "../../MangaElementDef/vanilla";

export default function Publication() {
    const { src } = useProps();
    return (
        <Chakra.Text
            padding={0}
            margin={0}
            fontSize={"xs"}
        >
            <Chakra.Tag
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
                <Chakra.TagLabel>{make_first_UpperCare(src.get_status())}</Chakra.TagLabel>
            </Chakra.Tag>
        </Chakra.Text>
    );
}