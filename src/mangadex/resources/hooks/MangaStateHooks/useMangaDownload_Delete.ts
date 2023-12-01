import useMangaDownload from "./useMangaDownload";
import useMangaDelete from "./useMangaDelete";


export default function useMangaDownload_Delete(props: {
    mangaID: string;
}) {
    const delete_ = useMangaDelete(props);
    const download_ = useMangaDownload(props);
    return {
        delete_: delete_,
        download_: download_
    };
}
