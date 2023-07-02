import * as Chakra from "@chakra-ui/react";
import { get_manga_byId, useMangaDelete, useMangaDownload } from "@mangadex/resources/hooks/MangaStateHooks";
import { FiSave, FiRefreshCcw } from "react-icons/fi";
import { BeatLoader } from "react-spinners";

export function Manga__Download_Update_Button(props: {
    manga_id: string;
}) {
    const { query } = get_manga_byId({
        mangaID: props.manga_id
    });
    const download_query = useMangaDownload({
        mangaID: props.manga_id
    });
    const delete_query = useMangaDelete({
        mangaID : props.manga_id
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
            aria-label={query.data?.isOffline ? "Update" : "Download"}
            icon={query.data?.isOffline ? <FiRefreshCcw /> : <FiSave />}
            onClick={() => download_query.refetch()} 
        />
    );
}
