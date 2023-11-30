import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import Manga, { GetMangaByIDResponse } from "@mangadex/api/structures/Manga";
import { Mangadex_suspense__, useTrackEvent } from "@mangadex/index";
import ErrorEL1 from "@mangadex/resources/componnents/error/ErrorEL1";
import MyErrorBounderies from "@mangadex/resources/componnents/error/MyErrorBounderies";
import ChakraContainer from "@mangadex/resources/componnents/layout/Container";
import Download_Manga_withHotkeys from "@mangadex/resources/componnents/mangas/Mainpage/Download_Manga_withHotKeys";
import { Manga_Page } from "@mangadex/resources/componnents/mangas/Manga_Page";
import { useAppWindowTitle } from "@mangadex/resources/hooks/TauriAppWindow";
import { useQuery } from "@tanstack/react-query";
import { Client } from "@tauri-apps/api/http";
import React from "react";
import { Outlet as ReactRouterOutlet, useOutletContext } from "react-router-dom";
import ButtonsNavigation from "./ButtonsNavigation";

import { useParams } from "@router";

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

export async function queryFn(id: string, client?: Client) {
    return await Manga.getMangaByID(id, client);
}

export default function MangaPage() {
    const client = useHTTPClient();

    const { id } = useParams("/mangadex/manga/:id");
    /// [x] Refactor into a function
    const query_key = React.useMemo(() => queryKey(id), []);

    useTrackEvent("mangadex-manga-page-entrance", {
        "manga-id": id ?? ""
    });
    const query = useQuery<GetMangaByIDResponse, Error>(query_key, async () => {
        return await queryFn(id, client);
    }, {
        "staleTime": Infinity,
        enabled: !!id
    });
    if ((query.isSuccess) && id != undefined) {
        return (
            <MyErrorBounderies>
                <Download_Manga_withHotkeys
                    mangaID={id}
                />
                <Manga_Page
                    src={query.data.manga}
                >
                    <ButtonsNavigation />
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

export function queryKey(id: string) {
    return ["mdx", "manga", id];
}

