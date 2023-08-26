import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { GetMangaByIDResponse, Manga } from "@mangadex/api/structures/Manga";
import { Mangadex_suspense__, useTrackEvent } from "@mangadex/index";
import ErrorEL1 from "@mangadex/resources/componnents/error/ErrorEL1";
import MyErrorBounderies from "@mangadex/resources/componnents/error/MyErrorBounderies";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import Download_Manga_withHotkeys from "@mangadex/resources/componnents/mangas/Mainpage/Download_Manga_withHotKeys";
import { Manga_Page } from "@mangadex/resources/componnents/mangas/Manga_Page";
import { useAppWindowTitle } from "@mangadex/resources/hooks/TauriAppWindow";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Outlet as ReactRouterOutlet, useNavigate, useOutletContext, useParams } from "react-router-dom";

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
        setTitle(`Error on loading title ${id!} | Mangadex`);
    });
    return (
        <ErrorEL1 error={error} />
    );
}

export default function MangaPage() {
    const client = useHTTPClient();

    const queryClient = useQueryClient();
    const { id } = useParams();
    /// [ ] Refactor into a function
    const query_key = ["mdx", "manga", id];
    React.useMemo(() => {
        queryClient.removeQueries(query_key, {
            "exact": true
        });
    }, []);

    useTrackEvent("mangadex-manga-page-entrance", {
        "manga-id": id!
    });
    const query = useQuery<GetMangaByIDResponse, Error>(query_key, async () => {
        return await Manga.getMangaByID(id!, client);
    }, {
        "staleTime": Infinity,
    });
    const navigate = useNavigate();
    if (query.isSuccess) {
        return (
            <MyErrorBounderies>
                <Download_Manga_withHotkeys
                    mangaID={id!}
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