import { CheckIcon, DownloadIcon } from "@chakra-ui/icons";
import { useCoverImageCover } from "@mangadex/resources/componnents/covers/v1/CoverImage";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import { useIsCoverDownloaded } from "@mangadex/resources/hooks/CoverStateHooks";
import useCoverDownload from "@mangadex/resources/hooks/CoverStateHooks/use_cover_download";

export default function DownloadButton() {
    const cover = useCoverImageCover();
    const isDownloaded = useIsCoverDownloaded(cover.get_id());
    const download = useCoverDownload(cover.get_id());
    if (isDownloaded.isSuccess && isDownloaded.data == true) {
        return <CheckIcon color={"green"} />;
    } else if (isDownloaded.isFetching == true || download.isFetching == true) {
        return (
            <MangadexSpinner size={"xs"} />
        );
    } else {
        return (
            <DownloadIcon
                onClick={() => {
                    if (isDownloaded.isSuccess && isDownloaded.data == false) {
                        download.refetch();
                    }
                }}
                _hover={
                    download.isFetching == false
                        ? {
                            color: "gray.500",
                        }
                        : undefined
                }
            />
        );
    }
}
