import * as Chakra from "@chakra-ui/react";
import get_manga_byId from "@mangadex/resources/hooks/MangaStateHooks/get_manga_byId";
import useMangaDelete from "@mangadex/resources/hooks/MangaStateHooks/useMangaDelete";
import useMangaDownload from "@mangadex/resources/hooks/MangaStateHooks/useMangaDownload";
import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { BeatLoader } from "react-spinners";

export function Manga__Delete_Update_Button(props: {
    manga_id: string;
}) {
    const { query } = get_manga_byId({
        mangaID: props.manga_id
    });
    const download_query = useMangaDownload({
        mangaID: props.manga_id
    });
    const delete_ = useMangaDelete({
        mangaID: props.manga_id
    });
    if (query.isSuccess && query.data?.isOffline == true) {
        return (
            <Chakra.IconButton
                backgroundColor={"orange.400"}
                color={"white"}
                _hover={{
                    backgroundColor: "orange.600"
                }}
                boxShadow={"md"}
                isLoading={query.isLoading || delete_.isFetching}
                spinner={<BeatLoader
                    size={8} color='black' />}
                aria-label={"Delete Manga"}
                icon={<FiTrash2 />}
                isDisabled={download_query.isFetching}
                onClick={() => delete_.refetch()} 
            />
        );
    } else {
        return (
            <React.Fragment />
        );
    }
}
