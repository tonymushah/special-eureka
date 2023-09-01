import { DownloadIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useMangaDexPath } from "@mangadex/index";
import { useChapterDownloadMutation } from "@mangadex/resources/hooks/ChapterStateHooks";
import { useNavigate } from "react-router";

export function DownloadButtonWithId({ id }: {
    id: string;
}) {
    const mangadexPath = useMangaDexPath();
    const navigate = useNavigate();
    const chapterDownload = useChapterDownloadMutation({
        chapID: id,
        onSuccess(data) {
            if (location.pathname == `${mangadexPath}/chapter/${data.chapter.get_id()}`) {
                navigate(`${mangadexPath}/chapter/${data.chapter.get_id()}`);
            }
        }
    });
    return (
        <Button colorScheme="green" isLoading={chapterDownload.isFetching} onClick={() => chapterDownload.refetch()}
            leftIcon={<DownloadIcon />}
        >
            Download
        </Button>
    );
}
