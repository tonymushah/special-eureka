import { open } from "@tauri-apps/api/shell";
import * as Chakra from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useChakraToast } from "@commons-res/hooks/useChakraToast";
import { ContextMenuItem } from "@radix-ui/react-context-menu";
import React from "react";
import { BeatLoader } from "react-spinners";
import { useContextMenuProps } from ".";
import { useMenuItemsColorModeValue } from "@mangadex/resources/componnents/mangas/v1/MangaContextMenu/Portal";

export default function OpenToMangadex() {
    const { id } = useContextMenuProps();
    const [isTransition, startTransition] = React.useTransition();
    const toast = useChakraToast({
        "duration": 9000,
        "isClosable": true,
        "position": "bottom-right",
        "status": "error",
        "title": "Error on opening the link"
    });
    const { backgroundColor } = useMenuItemsColorModeValue();
    const openLink = () => startTransition(() => {
        open(`https://managadex.org/chapter/${id}`).catch((e) => {
            if (typeof e == "string") {
                toast({
                    description: e
                });
            } else if (typeof e == "object") {
                if (e instanceof Error) {
                    toast({
                        description: e.message,
                        title: e.name
                    });
                }
            }
        });
    });
    return (
        <Chakra.Box
            onClick={() => openLink()}
            paddingTop={1}
            paddingBottom={1}
            pl={2}
            pr={2}
            as={ContextMenuItem}
            _hover={{
                backgroundColor
            }}
            color={isTransition ? "gray" : "orange.500"}
        >
            <Chakra.HStack
                spacing={"2"}
            >
                {
                    isTransition ? <BeatLoader size={7} /> : <Chakra.Icon as={ExternalLinkIcon} />
                }
                <Chakra.Text as="span">
                    Open to Mangadex
                </Chakra.Text>
            </Chakra.HStack>
        </Chakra.Box>
    );
}