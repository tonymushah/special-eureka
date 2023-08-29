import * as Chakra from "@chakra-ui/react";
import { useChapterDownloadMutation, useChapterDeleteMutation } from "@mangadex/resources/hooks/ChapterStateHooks";
import { get_ChapterbyId } from "@mangadex/resources/hooks/ChapterStateHooks/get_ChapterbyId";
import { ContextMenuItem } from "@radix-ui/react-context-menu";
import { BeatLoader } from "react-spinners";
import { useContextMenuProps } from ".";
import { ReactIcon } from "@chakra-ui/icons";

export default function Update() {
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
            _hover={{
                backgroundColor: "gray.100"
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
            <Chakra.HStack
                spacing={"2"}
            >
                {
                    download_.fetchStatus == "fetching" || delete_.fetchStatus == "fetching" ? <BeatLoader size={7} /> : <ReactIcon />
                }
                <Chakra.Text as="span">
                    Update
                </Chakra.Text>
            </Chakra.HStack>
        </Chakra.Box>
    );
}