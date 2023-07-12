import { DeleteIcon } from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { get_ChapterbyId, useChapterDownloadMutation, useChapterDeleteMutation } from "@mangadex/resources/hooks/ChapterStateHooks";
import { ContextMenuItem } from "@radix-ui/react-context-menu";
import { BeatLoader } from "react-spinners";
import { useContextMenuProps } from ".";

export default function Delete() {
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
        <Chakra.Box paddingRight={"2"} paddingLeft={"2"}
            _hover={{
                backgroundColor: "gray.100"
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
            <Chakra.HStack
                spacing={"2"}
            >
                {
                    download_.fetchStatus == "fetching" || delete_.fetchStatus == "fetching" ? <BeatLoader size={7} /> : <DeleteIcon />
                }
                <Chakra.Text as="span">
                    Delete
                </Chakra.Text>
            </Chakra.HStack>
        </Chakra.Box>
    );
}