import { DeleteIcon } from "@chakra-ui/icons";
import { HStack, Box, Text } from "@chakra-ui/react";
import useMangaDownload_Delete from "@mangadex/resources/hooks/MangaStateHooks/useMangaDownload_Delete";
import { ContextMenuItem } from "@radix-ui/react-context-menu";
import { BeatLoader } from "react-spinners";
import { useMangaContextMenu_Context } from ".";
import { useMenuItemsColorModeValue } from "./Portal";

export default function Delete() {
    const { mangaId } = useMangaContextMenu_Context();
    const { delete_, download_ } = useMangaDownload_Delete({
        mangaID: mangaId
    });
    const { backgroundColor } = useMenuItemsColorModeValue();
    return (
        <Box paddingRight={"2"} paddingLeft={"2"}
            _hover={{
                backgroundColor
            }}
            as={ContextMenuItem}
            textColor={download_.fetchStatus == "fetching" || delete_.fetchStatus == "fetching" ? "gray" : "red"}
            onClick={() => {
                if (download_.fetchStatus != "fetching" && delete_.fetchStatus != "fetching") {
                    delete_.refetch();
                }
            }}
            pl={2}
            pr={2}
            paddingTop={1}
            paddingBottom={1}
        >
            <HStack
                spacing={"2"}
            >
                {
                    download_.fetchStatus == "fetching" || delete_.fetchStatus == "fetching" ? <BeatLoader size={7} /> : <DeleteIcon />
                }
                <Text as="span">
                    Delete
                </Text>
            </HStack>
        </Box>
    );
}