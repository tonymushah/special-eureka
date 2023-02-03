import * as Chakra from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Container, Nav } from "react-bootstrap";
import { useQuery, useQueryClient } from "react-query";
import { Link, Outlet, useOutletContext, useParams } from "react-router-dom";
import { useHTTPClient } from "../../../commons-res/components/HTTPClientProvider";
import { Manga } from "../../api/structures/Manga";
import ErrorEL1 from "../../resources/componnents/error/ErrorEL1";
import { Manga_Page } from "../../resources/componnents/mangas/Manga_Page";

type MangaPage_OutletContex = {
    toUse: Manga
}

export function useManga() {
    return useOutletContext<MangaPage_OutletContex>();
}


export default function MangaPage() {
    const client = useHTTPClient();
    const queryClient = useQueryClient()
    let { id } = useParams();
    const query_key = "mdx-manga:" + id;
    useMemo<void>(() => {
        queryClient.removeQueries(query_key);
    }, []);
    const query = useQuery<Manga, Error>(query_key, () => {
        return Manga.getMangaByID(id!, client);
    }, {
        "staleTime": Infinity
    });
    if (query.isLoading) {
        return (
            <Chakra.AbsoluteCenter>
                <Chakra.Spinner />
            </Chakra.AbsoluteCenter>
        );
    }
    if (query.isError) {
        return (
            <ErrorEL1 error={query.error} />
        )
    }
    return (
        <Manga_Page
            src={query.data!}
        >
            <Chakra.Box>
                <Container>
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
                </Container>
            </Chakra.Box>
            <Chakra.Box>
                <Container>
                    <Outlet context={{ toUse: query.data! }} />
                </Container>
            </Chakra.Box>
        </Manga_Page>

    )
}