import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Icon, Stack, Text } from "@chakra-ui/react";
import { useChakraToast } from "@commons-res/hooks/useChakraToast";
import { ContextMenuItem } from "@radix-ui/react-context-menu";
import { open } from "@tauri-apps/api/shell";
import React from "react";
import { BeatLoader } from "react-spinners";
import { useMangaContextMenu_Context } from ".";

export default function OpenToMangadex() {
    const [isTransition, startTransition] = React.useTransition();
    const { mangaId } = useMangaContextMenu_Context();
    const toast = useChakraToast({
        "duration": 9000,
        "isClosable": true,
        "position": "bottom-right",
        "status": "error",
        "title": "Error on opening the link"
    });
    const openLink = () => startTransition(() => {
        open(`https://mangadex.org/title/${mangaId}`).catch((e) => {
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
        <Box
            onClick={() => openLink()}
            paddingTop={1}
            paddingBottom={1}
            pl={2}
            pr={2}
            as={ContextMenuItem}
            _hover={{
                backgroundColor: "gray.100"
            }}
            color={isTransition ? "gray" : "orange.500"}
        >
            <Stack
                spacing={"2"}
            >
                {
                    isTransition ? <BeatLoader size={7} /> : <Icon as={ExternalLinkIcon} />
                }
                <Text as="span">
                    Open to Mangadex
                </Text>
            </Stack>
        </Box>
    );
}