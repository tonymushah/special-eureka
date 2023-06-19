import { ToastId, useToast, UseToastOptions } from "@chakra-ui/react";
import { Cover } from "@mangadex/api/structures/Cover";
import React from "react";
import { useQueryClient, useQuery, useMutation, UseQueryOptions, useQueries, QueryKey } from "@tanstack/react-query";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Alt_title, Lang_and_Data } from "@mangadex/api/internal/Utils";
import { Manga, Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import { MangaPageProps } from "@mangadex/resources/componnents/mangas/Manga_Page";


export function useMangaDownload(props: {
    mangaID: string
}) {
    const client = useHTTPClient();
    const toast = useToast({
        position: "bottom-right",
        duration: 9000
    });
    const queryClient = useQueryClient();
    const key = ["mdx", "manga", props.mangaID];
    const query = useQuery(key.concat("mutation", "download"), () => {
        toast({
            title: "Downloading manga...",
            status: "loading",
            duration: 9000
        });
        return Manga.download_manga(props.mangaID, client);
    }, {
        onSuccess: (manga) => {
            let title = "";
            if (manga.get_title().en == null) {
                title = new Alt_title(manga.get_alt_title()).get_quicklang()!;
            } else {
                title = manga.get_title().en;
            }
            toast({
                title: "Downloaded manga",
                status: "success",
                description: title,
                isClosable: true
            });
            queryClient.refetchQueries({
                queryKey: key
            });
        },
        onError(error) {
            toast({
                title: "Error on downloading manga",
                description: JSON.stringify(error),
                status: "error",
                isClosable: true
            });
        },
        enabled: false,
        "networkMode": "online"
    });
    return query;
}

export function useMangaDelete(props: {
    mangaID: string
}) {
    const client = useHTTPClient();
    const toast = useToast({
        position: "bottom-right",
        duration: 9000
    });
    const toastID = React.useRef<ToastId>();
    function addToast(props?: UseToastOptions) {
        toastID.current = toast(props);
    }
    function updateToast(props?: UseToastOptions) {
        if (toastID.current != undefined && props != undefined) {
            toast.update(toastID.current, props);
        }
    }
    const queryClient = useQueryClient();
    const key = ["mdx", "manga", props.mangaID];
    const query = useQuery(key.concat("mutation", "delete"), () => {
        addToast({
            title: "Deleting manga...",
            status: "loading",
            isClosable: true
        });
        return Manga.delete_aDownloaded_manga(props.mangaID, client);
    }, {
        onSuccess: () => {
            updateToast({
                title: "Deleted manga",
                status: "success",
                isClosable: true
            });
            queryClient.removeQueries({
                queryKey: key,
                exact: true
            });
        },
        onError(error: any) {
            updateToast({
                title: "Error on deleting manga",
                status: "error",
                description: JSON.stringify(error),
                variant: "solid",
                isClosable: true
            });
        },
        enabled: false
    });
    return query;
}

export function useMangaDownload_Delete(props: {
    mangaID: string
}) {
    const delete_ = useMangaDelete(props);
    const download_ = useMangaDownload(props);
    return {
        delete_: delete_,
        download_: download_
    };
}

export function get_mangaQueryKey_byID(props: {
    mangaID: string
}): QueryKey {
    return ["mdx", "manga", props.mangaID];
}

export function get_manga_byId(props: {
    mangaID: string,
    with_all_includes?: boolean,
    options?: Omit<UseQueryOptions<Manga, Error>, "queryKey" | "queryFn">
}) {
    const client = useHTTPClient();
    const key = get_mangaQueryKey_byID(props);
    const query = useQuery<Manga, Error>(key, () => {
        if (props.with_all_includes == true) {
            return Manga_with_allRelationship.getMangaByID(props.mangaID, client);
        } else {
            return Manga.getMangaByID(props.mangaID, client);
        }
    }, props.options == undefined ? {
        "staleTime": Infinity
    } : props.options);
    return {
        key,
        query
    };
}

export function get_manga_page_cover(props: MangaPageProps) {
    const client = useHTTPClient();
    let cover_key_ = [""];
    try {
        cover_key_ = ["mdx", "cover", props.src.get_cover_art_id()];
    } catch {
        cover_key_ = ["mdx", "manga", props.src.get_id(), "cover"];
    }
    const cover_key = cover_key_;
    const coverQuery = useQuery(cover_key, () => {
        return props.src.get_cover_art(client);
    }, {
        "staleTime": Infinity
    });
    return {
        coverQuery,
        cover_key
    };
}

export function get_manga_page_titles(props: MangaPageProps) {
    const title_query_key = ["mdx", "manga", props.src.get_id(), "title"];
    const title_query = useQuery<Array<Lang_and_Data>, Error>(title_query_key, () => {
        return Lang_and_Data.initializeArrayByAltTitle_obj(props.src.get_alt_title());
    }, {
        "staleTime": Infinity
    });
    return {
        title_query,
        title_query_key
    };
}

export function get_manga_page_authors(props: MangaPageProps) {
    const client = useHTTPClient();
    const authors = useQueries({
        queries: props.src.get_authors_id().map(author_id => {
            return {
                queryKey: ["mdx", "author", author_id],
                queryFn: () => {
                    return props.src.get_author_byID(author_id, client);
                },
                staleTime: Infinity
            };
        })
    }
    );
    return authors;
}

export function get_manga_page_artists(props: MangaPageProps) {
    const client = useHTTPClient();
    const artistists = useQueries({
        queries: props.src.get_artists_id().map(author_id => {
            return {
                queryKey: ["mdx", "author", author_id],
                queryFn: () => {
                    return props.src.get_artist_byID(author_id, client);
                },
                staleTime: Infinity
            };
        })
    }
    );
    return artistists;
}

export function get_manga_page_authors_artists(props: MangaPageProps) {
    const authors = get_manga_page_authors(props);
    const artistists = get_manga_page_artists(props);
    function is_Artists_finished(): boolean {
        const all_isSuccess_Artists = artistists.map<boolean>((value) => {
            return value.isSuccess;
        });
        const is_allArtists_Success = all_isSuccess_Artists.includes(false) ? false : true;
        return is_allArtists_Success;
    }
    function is_Authors_finished(): boolean {
        const all_isSuccess_Authors = authors.map<boolean>((value) => {
            return value.isSuccess;
        });
        const is_allAuthors_Success = all_isSuccess_Authors.includes(false) ? false : true;
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
    };
}

export function get_cover_art(props: {
    src: Manga
}) {
    return get_manga_page_cover({
        src: props.src
    });
}

export function get_manga_description(props: {
    src: Manga
}) {
    const manga_description_querykey = ["mdx", "manga", props.src.get_id(), "description"];
    const manga_description_query = useQuery<Array<Lang_and_Data>, Error>(manga_description_querykey, () => {
        return Lang_and_Data.initializeByDesc(props.src.get_description());
    });
    return {
        manga_description_query,
        manga_description_querykey
    };
}

export function get_manga_page_cover_art_image(props: {
    src: Manga,
    isThumbail?: boolean,
    scale?: 256 | 512
}) {
    const client = useHTTPClient();
    const query_key = ["mdx", "manga", props.src.get_id(), "cover-art", "image"];
    const queryClient = useQueryClient();
    const query = useQuery<string>(query_key, async () => {
        let data: Cover | undefined = undefined;
        try {
            const cover_id = props.src.get_cover_art_id();
            const cover_query_key = ["mdx", "cover", cover_id];
            const queryData = queryClient.getQueryData<Cover>(cover_query_key);
            if (queryData == undefined) {
                data = (await props.src.get_cover_art(client));
                data = queryClient.setQueryData(cover_query_key, data);
            } else {
                data = queryData;
            }
        } catch (error) {
            data = (await props.src.get_cover_art(client));
            data = queryClient.setQueryData(["mdx", "cover", data.get_id()], data);
        }
        if (props.isThumbail == true) {
            if (props.scale == 512) {
                return await data!.get_CoverImage_thumbnail_promise(512, client);
            } else {
                return await data!.get_CoverImage_thumbnail_promise(256, client);
            }
        } else {
            return await data!.get_CoverImage_promise(client);
        }
    });
    return {
        query_key,
        query
    };
}