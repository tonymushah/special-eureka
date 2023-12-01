import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import isMangaDonwloaded from "@mangadex/resources/hooks/MangaStateHooks/isMangaDownloaded";
import useMangaDelete from "@mangadex/resources/hooks/MangaStateHooks/useMangaDelete";
import useMangaDownload from "@mangadex/resources/hooks/MangaStateHooks/useMangaDownload";
import { FiSave, FiRefreshCcw } from "react-icons/fi";
import { BeatLoader } from "react-spinners";

export function Manga__Download_Update_Button(props: {
    manga_id: string;
}) {
    const client = useHTTPClient();
    const query = isMangaDonwloaded({
        variables: {
            mangaId: props.manga_id,
            client
        }
    });
    const download_query = useMangaDownload({
        mangaID: props.manga_id
    });
    const delete_query = useMangaDelete({
        mangaID: props.manga_id
    });
    return (
        <Chakra.IconButton
            backgroundColor={"orange.400"}
            color={"white"}
            _hover={{
                backgroundColor: "orange.600"
            }}
            boxShadow={"md"}
            isLoading={query.isLoading || download_query.isFetching}
            spinner={<BeatLoader
                size={8} color='black' />}
            isDisabled={delete_query.isFetching}
            aria-label={query.data ? "Update" : "Download"}
            icon={query.data ? <FiRefreshCcw /> : <FiSave />}
            onClick={() => download_query.refetch()}
        />
    );
}
