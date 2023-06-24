import * as Chakra from "@chakra-ui/react";
import { appWindow } from "@tauri-apps/api/window";
import React from "react";
import { Nav } from "react-bootstrap";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, Outlet, useOutletContext, useParams } from "react-router-dom";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Manga } from "@mangadex/api/structures/Manga";
import Download_Manga_withHotkeys from "@mangadex/resources/componnents/mangas/Mainpage/Download_Manga_withHotKeys";
import { Manga_Page } from "@mangadex/resources/componnents/mangas/Manga_Page";
import { useTrackEvent } from "@mangadex/";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";

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
        "manga-id" : id!
    });
    const query = useQuery<Manga, Error>(query_key, () => {
        return Manga.getMangaByID(id!, client);
    }, {
        "staleTime": Infinity,
    });
    if (query.isSuccess) {
        return (

            <React.Fragment>
                <Download_Manga_withHotkeys
                    mangaID={id!}
                />
                <Manga_Page
                    src={query.data}
                >
                    <Chakra.Box>
                        <ChakraContainer>
                            <Nav
                                variant="tabs"
                                as={Chakra.Box}
                            >
                                <Nav.Item>
                                    <Nav.Link
                                        as={Link}
                                        to="."
                                        eventKey="chapters"
                                    >
                                        Chapters
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        as={Link}
                                        to="covers"
                                        eventKey="covers"
                                    >
                                        Covers
                                    </Nav.Link>
                                </Nav.Item>
                                {
                                    query.data!.get_some_relationshipLength("manga") == 0 ? (<></>) : (
                                        <Nav.Item>
                                            <Nav.Link
                                                as={Link}
                                                to="related"
                                                eventKey="related"
                                            >
                                                Related
                                            </Nav.Link>
                                        </Nav.Item>
                                    )
                                }
                            </Nav>
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

    return (<></>);
}