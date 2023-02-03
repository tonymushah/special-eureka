import { useToast } from "@chakra-ui/react";
import { useQueryClient, useQuery, useMutation, UseQueryOptions, useQueries } from "react-query";
import { useHTTPClient } from "../../../commons-res/components/HTTPClientProvider";
import { Lang_and_Data } from "../../api/internal/Utils";
import { Manga } from "../../api/structures/Manga";
import { MangaPageProps } from "../componnents/mangas/Manga_Page";

export function useMangaDownload_Delete(props : {
    mangaID: string
}) {
    const client = useHTTPClient();
    const toast = useToast();
    const queryClient = useQueryClient();
    const key = "mdx-manga:" + props.mangaID;
    const delete_ = useMutation({
        mutationFn : () => {
            toast({
                position : "bottom-right",
                title : "Deleting manga...",
                status : "loading",
                duration : 9000,
                isClosable : true
            });
            return Manga.delete_aDownloaded_manga(props.mangaID, client)},
        onSuccess : () => {
            toast({
                position : "bottom-right",
                title : "Deleted manga",
                status : "success",
                duration : 9000,
                isClosable : true
            })
            queryClient.removeQueries({
                queryKey : key
            })
        },
        onError(error : any, variables, context) {
            toast({
                position : "bottom-right",
                title : "Error on deleting manga",
                status : "error",
                description : error.message,
                variant : "solid",
                duration : 9000,
                isClosable : true
            })
        },
    });
    const download_ = useMutation({
        mutationFn : () => {
            toast({
                position : "bottom-right",
                title : "Downloaded manga",
                status : "success",
                duration : 9000,
                isClosable : true
            })
            toast({
                title : "Downloading manga...",
                status : "loading",
                duration : 9000
            });
            return Manga.download_manga(props.mangaID, client)
        },
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey: key
            })
        },
        onError(error : Error, variables, context) {
            toast({
                position : "bottom-right",
                title : "Error on downloading manga",
                description : error.message,
                status : "error",
                duration : 9000,
                isClosable : true
            })
        },
    })
    return {
        delete_ : delete_,
        download_ : download_
    }
}

export function get_manga_byId(props: {
    mangaID: string,
    options?: Omit<UseQueryOptions<Manga, Error>, 'queryKey' | 'queryFn'>
}){
    const client = useHTTPClient();
    const key = "mdx-manga:" + props.mangaID;
    const query = useQuery<Manga, Error>(key, () => {
        return Manga.getMangaByID(props.mangaID, client);
    }, props.options == undefined ? {
        "staleTime": Infinity
    } : props.options);
    return {
        key,
        query
    };
}

export function get_manga_page_cover(props : MangaPageProps){
    const client = useHTTPClient();
    const cover_key = "mdx-cover-" + props.src.get_cover_art_id();
    const coverQuery = useQuery(cover_key, () => {
        return props.src.get_cover_art(client)
    }, {
        "staleTime": Infinity
    });
    return {
        coverQuery,
        cover_key
    }
}

export function get_manga_page_titles(props : MangaPageProps){
    const title_query_key = "mdx-manga:" + props.src.get_id() + "-title"
    const title_query = useQuery<Array<Lang_and_Data>, Error>(title_query_key, () => {
        return Lang_and_Data.initializeArrayByAltTitle_obj(props.src.get_alt_title());
    }, {
        "staleTime": Infinity
    });
    return {
        title_query,
        title_query_key
    }
}

export function get_manga_page_authors(props: MangaPageProps){
    const client = useHTTPClient();
    const authors = useQueries(
        props.src.get_authors_id().map(author_id => {
            return {
                queryKey: "mdx-author:" + author_id,
                queryFn: () => {
                    return props.src.get_author_byID(author_id, client);
                },
                staleTime: Infinity
            }
        })
    )
    return authors;
}

export function get_manga_page_artists(props : MangaPageProps) {
    const client = useHTTPClient();
    const artistists = useQueries(
        props.src.get_artists_id().map(author_id => {
            return {
                queryKey: "mdx-author:" + author_id,
                queryFn: () => {
                    return props.src.get_artist_byID(author_id, client);
                },
                staleTime: Infinity
            }
        })
    );
    return artistists;
}

export function get_manga_page_authors_artists(props: MangaPageProps){
    const authors = get_manga_page_authors(props);
    const artistists = get_manga_page_artists(props);
    function is_Artists_finished(): boolean {
        let all_isSuccess_Artists = artistists.map<boolean>((value) => {
            return value.isSuccess;
        });
        let is_allArtists_Success = all_isSuccess_Artists.includes(false) ? false : true;
        return is_allArtists_Success;
    }
    function is_Authors_finished(): boolean {
        let all_isSuccess_Authors = authors.map<boolean>((value) => {
            return value.isSuccess;
        });
        let is_allAuthors_Success = all_isSuccess_Authors.includes(false) ? false : true;
        return is_allAuthors_Success;
    }
    function is_Author_artists_finished(): boolean {
        if (is_Authors_finished() == true && is_Artists_finished() == true) {
            return true;
        } else {
            return false;
        }
    }
    return {
        authors,
        artistists,
        is_Artists_finished,
        is_Authors_finished,
        is_Author_artists_finished
    }
}

export function get_cover_art(props: {
    src : Manga
}){
    return get_manga_page_cover({
        src : props.src
    });
}

export function get_manga_description(props: {
    src : Manga
}){
    const manga_description_querykey = "mdx-manga:" + props.src.get_id() + "-description";
    const manga_description_query = useQuery<Array<Lang_and_Data>, Error>(manga_description_querykey, () => {
        return Lang_and_Data.initializeByDesc(props.src.get_description());
    })
    return {
        manga_description_query,
        manga_description_querykey
    }
}