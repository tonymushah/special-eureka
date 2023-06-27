import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { GetMangaByIDResponse, Manga } from "@mangadex/api/structures/Manga";
import { useTrackEvent } from "@mangadex/index";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import Download_Manga_withHotkeys from "@mangadex/resources/componnents/mangas/Mainpage/Download_Manga_withHotKeys";
import { Manga_Page } from "@mangadex/resources/componnents/mangas/Manga_Page";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { appWindow } from "@tauri-apps/api/window";
import React from "react";
import { Outlet, useNavigate, useOutletContext, useParams } from "react-router-dom";

type MangaPage_OutletContex = {
    toUse: Manga
}

export function useManga() {
    return useOutletContext<MangaPage_OutletContex>();
}


export default function MangaPage() {
    const client = useHTTPClient();

    const queryClient = useQueryClient();
    const { id } = useParams();
    const query_key = ["mdx", "manga", id];
    React.useMemo<void>(() => {
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

            <React.Fragment>
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
                            <Chakra.ButtonGroup colorScheme="orange">
                                <Chakra.Button onClick={() => navigate(".")} >
                                    Chapters
                                </Chakra.Button>
                                <Chakra.Button onClick={() => navigate("covers")}>
                                    Covers
                                </Chakra.Button>
                                {
                                    query.data?.manga.get_some_relationshipLength("manga") == 0 ? (<React.Fragment />) : (
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
                            <Outlet context={{ toUse: query.data! }} />
                        </ChakraContainer>
                    </Chakra.Box>
                </Manga_Page>
            </React.Fragment>

        );
    }
    if (query.isLoading) {
        appWindow.setTitle("Loading... | Mangadex");
        return (
            <Chakra.AbsoluteCenter>
                <Chakra.Spinner />
            </Chakra.AbsoluteCenter>
        );
    }
    if (query.isError) {
        appWindow.setTitle(`Error on loading title ${id!} | Mangadex`);
        throw query.error;
    }

    return (<React.Fragment />);
}