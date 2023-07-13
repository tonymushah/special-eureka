import { useMangaDexPath } from "@mangadex/index";
import * as Chakra from "@chakra-ui/react";
import { useContextMenuProps } from ".";
import { LinkIcon } from "@chakra-ui/icons";
import { ContextMenuItem } from "@radix-ui/react-context-menu";
import { useNavigate } from "react-router";

export default function Goto() {
    const { id } = useContextMenuProps();
    const mangadex_path = useMangaDexPath();
    const navigate = useNavigate();
    return (
        <Chakra.Box
            onClick={() => {
                navigate(`${mangadex_path}/chapter/${id}`);
            }}
            paddingTop={1}
            paddingBottom={1}
            pl={2}
            pr={2}
            as={ContextMenuItem}
            _hover={{
                backgroundColor: "gray.100"
            }}>
            <Chakra.HStack
                spacing={"2"}
            >
                <Chakra.Icon as={LinkIcon} />
                <Chakra.Text as="span">
                    Open
                </Chakra.Text>
            </Chakra.HStack>
        </Chakra.Box>
    );
}