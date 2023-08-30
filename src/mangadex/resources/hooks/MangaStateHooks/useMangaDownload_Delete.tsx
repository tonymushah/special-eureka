import { useMangaDownload } from "./useMangaDownload";
import { useMangaDelete } from "./useMangaDelete";


export function useMangaDownload_Delete(props: {
    mangaID: string;
}) {
    const delete_ = useMangaDelete(props);
    const download_ = useMangaDownload(props);
    return {
        delete_: delete_,
        download_: download_
    };
}
