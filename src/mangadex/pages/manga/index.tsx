import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { GetMangaByIDResponse, Manga, Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import { Mangadex_suspense__, useTrackEvent } from "@mangadex/index";
import ErrorEL1 from "@mangadex/resources/componnents/error/ErrorEL1";
import MyErrorBounderies from "@mangadex/resources/componnents/error/MyErrorBounderies";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import Download_Manga_withHotkeys from "@mangadex/resources/componnents/mangas/Mainpage/Download_Manga_withHotKeys";
import { Manga_Page } from "@mangadex/resources/componnents/mangas/Manga_Page";
import { useAppWindowTitle } from "@mangadex/resources/hooks/TauriAppWindow";
import { useQuery } from "@tanstack/react-query";
import { Client, getClient } from "@tauri-apps/api/http";
import React from "react";
import { LoaderFunction, Outlet as ReactRouterOutlet, useNavigate, useOutletContext, useParams } from "react-router-dom";

type MangaPage_OutletContex = {
    toUse: Manga
}

export function useManga() {
    return useOutletContext<MangaPage_OutletContex>();
}

function Outlet(props: {
    context: MangaPage_OutletContex
}) {
    return (
        <ReactRouterOutlet context={props.context} />
    );
}

function Loading() {
    const setTitle = useAppWindowTitle();
    React.useEffect(() => {
        setTitle("Loading... | Mangadex");
    }, []);
    return (
        <Mangadex_suspense__ />
    );
}

function ThrowError({ error, id }: {
    error: Error,
    id?: string
}) {
    const setTitle = useAppWindowTitle();
    React.useEffect(() => {
        setTitle(`Error on loading title ${id ?? "undefined"} | Mangadex`);
    });
    return (
        <ErrorEL1 error={error} />
    );
}

export async function queryFn(id: string, client: Client) {
    return await Manga.getMangaByID(id, client);
}

export default function MangaPage() {
    const client = useHTTPClient();

    const { id } = useParams();
    /// [x] Refactor into a function
    const query_key = React.useMemo(() => queryKey(id), []);

    useTrackEvent("mangadex-manga-page-entrance", {
        "manga-id": id ?? ""
    });
    const query = useQuery<GetMangaByIDResponse, Error>(query_key, async () => {
        if (id != undefined) {
            return await queryFn(id, client);
        } else {
            throw new Error("the given manga id is undefined");
        }
    }, {
        "staleTime": Infinity,
        enabled: !!id
    });
    const navigate = useNavigate();
    if ((query.isSuccess) && id != undefined) {
        return (
            <MyErrorBounderies>
                <Download_Manga_withHotkeys
                    mangaID={id}
                />
                <Manga_Page
                    src={query.data.manga}
                >
                    <Chakra.Box>
                        <ChakraContainer>
                            <Chakra.HStack>
                            </Chakra.HStack>
                            <Chakra.ButtonGroup isAttached colorScheme="orange">
                                <Chakra.Button onClick={() => navigate(".")} >
                                    Chapters
                                </Chakra.Button>
                                <Chakra.Button onClick={() => navigate("covers")}>
                                    Covers
                                </Chakra.Button>
                                {
                                    query.data.manga.get_some_relationshipLength("manga") == 0 ? (<React.Fragment />) : (
                                        <Chakra.Button onClick={() => navigate("related")}>
                                            Related
                                        </Chakra.Button>
                                    )
                                }
                            </Chakra.ButtonGroup>
                        </ChakraContainer>
                    </Chakra.Box>
                    <Chakra.Box>
                        <ChakraContainer>
                            <Outlet context={{ toUse: query.data.manga }} />
                        </ChakraContainer>
                    </Chakra.Box>
                </Manga_Page>
            </MyErrorBounderies>
        );
    }
    if (query.isLoading) {

        return (
            <Loading />
        );
    }
    if (query.isError) {

        return (
            <ThrowError error={query.error} id={id} />
        );
    }

    return (<React.Fragment />);
}

export function queryKey(id: string | undefined) {
    return ["mdx", "manga", id];
}

export const loader: LoaderFunction = async function ({ params }) {
    const { id } = params;
    if (id != undefined) {
        const client = await getClient();
        try {
            const { queryClient } = await import("@mangadex/resources/query.client");
            const _queryKey_ = queryKey(id);
            const queryData = queryClient.getQueryData<GetMangaByIDResponse>(_queryKey_, {
                exact: true
            });
            if (queryData != undefined) {
                const { manga, isOffline } = queryData;
                if (manga instanceof Manga_with_allRelationship) {
                    if (manga.$artists != undefined && manga.$authors != undefined && manga.$cover != undefined && manga.$related_manga != undefined) {
                        queryClient.fetchQuery(_queryKey_, () => queryFn(id, client), {
                            initialData: {
                                manga,
                                isOffline
                            }
                        });
                        return new Response(null, {
                            "status": 204,
                            "statusText": "Loaded"
                        });
                    } else {
                        await queryClient.fetchQuery(_queryKey_, () => queryFn(id, client));
                        return new Response(null, {
                            "status": 204,
                            "statusText": "Loaded"
                        });
                    }
                } else {
                    if (manga.get_relationships() == undefined || manga.get_relationships()?.length == 0) {
                        await queryClient.fetchQuery(_queryKey_, () => queryFn(id, client));
                        return new Response(null, {
                            "status": 204,
                            "statusText": "Loaded"
                        });
                    } else {
                        return new Response(null, {
                            "status": 204,
                            "statusText": "Loaded"
                        });
                    }
                }
            } else {
                await queryClient.fetchQuery(_queryKey_, () => queryFn(id, client));
                return new Response(null, {
                    "status": 204,
                    "statusText": "Loaded"
                });
            }
        } catch (e) {
            if (e instanceof Error) {
                throw e;
            } else {
                throw new Response(JSON.stringify(e), {
                    status: 500,
                    statusText: "Internal Loader Error"
                });
            }
        } finally {
            await client.drop();
        }
    } else {
        throw new Response(undefined, {
            "status": 404,
            "statusText": "MangaID Undefined"
        });
    }
};