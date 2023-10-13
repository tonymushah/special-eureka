import useMangaDownload_Delete from "@mangadex/resources/hooks/MangaStateHooks/useMangaDownload_Delete";
import { useMangaContextMenu_Context } from ".";
import { HStack, Box, Text, Icon } from "@chakra-ui/react";
import { ContextMenuItem } from "@radix-ui/react-context-menu";
import { FiSave } from "react-icons/fi";
import { BeatLoader } from "react-spinners";
import { useMenuItemsColorModeValue } from "./Portal";

export default function Download() {
    const { mangaId } = useMangaContextMenu_Context();
    const { delete_, download_ } = useMangaDownload_Delete({
        mangaID: mangaId
    });
    const { backgroundColor } = useMenuItemsColorModeValue();
        return (
            <Box
                textColor={download_.fetchStatus == "fetching" || delete_.fetchStatus == "fetching" ? "gray" : "green"}
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
                _hover={{
                    backgroundColor
                }}>
                <HStack
                    spacing={"2"}
                >
                    {
                        download_.fetchStatus == "fetching" || delete_.fetchStatus == "fetching" ? <BeatLoader size={7} /> : <Icon as={FiSave} />
                    }
                    <Text as="span">
                        Download
                    </Text>
                </HStack>
            </Box>
        );
    }