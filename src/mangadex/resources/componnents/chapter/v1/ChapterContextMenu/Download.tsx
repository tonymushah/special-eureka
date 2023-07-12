import * as Chakra from "@chakra-ui/react";
import { useContextMenuProps } from ".";
import { get_ChapterbyId, useChapterDownloadMutation, useChapterDeleteMutation } from "@mangadex/resources/hooks/ChapterStateHooks";
import { ContextMenuItem } from "@radix-ui/react-context-menu";
import { FiSave } from "react-icons/fi";
import { BeatLoader } from "react-spinners";

export default function Download() {
    const { id } = useContextMenuProps();
    const { query } = get_ChapterbyId({
        id
    });
    const download_ = useChapterDownloadMutation({
        chapID: id,
        onSuccess() {
            query.refetch();
        }
    });
    const delete_ = useChapterDeleteMutation({
        chapID: id,
        onSuccess() {
            query.refetch();
        }
    });
    return (
        <Chakra.Box
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
                backgroundColor: "gray.100"
            }}>
            <Chakra.HStack
                spacing={"2"}
            >
                {
                    download_.fetchStatus == "fetching" || delete_.fetchStatus == "fetching" ? <BeatLoader size={7} /> : <Chakra.Icon as={FiSave} />
                }
                <Chakra.Text as="span">
                    Download
                </Chakra.Text>
            </Chakra.HStack>
        </Chakra.Box>
    );
}