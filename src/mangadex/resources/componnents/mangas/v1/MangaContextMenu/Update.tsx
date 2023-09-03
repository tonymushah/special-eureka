import { HStack, Box, Text } from "@chakra-ui/react";
import { useMangaDownload_Delete } from "@mangadex/resources/hooks/MangaStateHooks/useMangaDownload_Delete";
import { ContextMenuItem } from "@radix-ui/react-context-menu";
import { BeatLoader } from "react-spinners";
import { useMangaContextMenu_Context } from ".";
import { ReactIcon } from "@chakra-ui/icons";
import { useMenuItemsColorModeValue } from "./Portal";

export default function Update() {
    const { mangaId } = useMangaContextMenu_Context();
    const { delete_, download_ } = useMangaDownload_Delete({
        mangaID: mangaId
    });
    const { backgroundColor } = useMenuItemsColorModeValue();
    return (
        <Box
            _hover={{
                backgroundColor
            }}
            textColor={download_.fetchStatus == "fetching" || delete_.fetchStatus == "fetching" ? "gray" : "blue"}
            onClick={() => {
                if (download_.fetchStatus != "fetching" && delete_.fetchStatus != "fetching") {
                    download_.refetch();
                }
            }}
            paddingTop={1}
            paddingBottom={1}
            pl={2}
            pr={2}
            as={ContextMenuItem}
        >
            <HStack
                spacing={"2"}
            >
                {
                    download_.fetchStatus == "fetching" || delete_.fetchStatus == "fetching" ? <BeatLoader size={7} /> : <ReactIcon />
                }
                <Text as="span">
                    Update
                </Text>
            </HStack>
        </Box>
    );
}