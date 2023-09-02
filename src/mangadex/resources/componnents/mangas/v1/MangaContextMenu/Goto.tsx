import { LinkIcon } from "@chakra-ui/icons";
import { HStack, Icon, Box, Text } from "@chakra-ui/react";
import { getMangaDexPath } from "@mangadex/index";
import { ContextMenuItem } from "@radix-ui/react-context-menu";
import React from "react";
import { useNavigate } from "react-router";
import { useMangaContextMenu_Context } from ".";
import { useMenuItemsColorModeValue } from "./Portal";

export default function Goto() {
    const mangadex_path = React.useMemo(() => getMangaDexPath(), []);
    const { mangaId } = useMangaContextMenu_Context();
    const { backgroundColor } = useMenuItemsColorModeValue();
    const navigate = useNavigate();
    return (
        <Box
            onClick={() => {
                navigate(`${mangadex_path}/manga/${mangaId}`);
            }}
            paddingTop={1}
            paddingBottom={1}
            pl={2}
            pr={2}
            as={ContextMenuItem}
            _hover={{
                backgroundColor
            }}>
            <HStack
                spacing={"2"}
            >
                <Icon as={LinkIcon} />
                <Text as="span">
                    Open
                </Text>
            </HStack>
        </Box>
    );
}