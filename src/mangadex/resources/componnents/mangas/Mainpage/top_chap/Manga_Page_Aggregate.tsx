import * as Chakra from "@chakra-ui/react";
import { Client } from "@tauri-apps/api/http";
import React from "react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Manga } from "@mangadex/api/structures/Manga";
import { AggregateListOptions } from "@mangadex/api/structures/SearchType/AggregateListOptions";
import { get_aggregate_query } from "@mangadex/resources/hooks/AgreggateStateHooks";
import ErrorEL1 from "@mangadex/resources/componnents/error/ErrorEL1";
import Loading from "../loading";

const Aggregate_part = React.lazy(() => import("./Aggregate_part"));

export default function Manga_Page_Aggregate(props: {
    src: Manga,
    to_see_lang?: Array<string>,
    to_use_groups?: Array<string>
}) {
    const client: Client = useHTTPClient();
    const aggregate_list_option: AggregateListOptions = {
        mangaID: props.src.get_id(),
        translatedLanguage: props.to_see_lang,
        client: client
    };
    const { query } = get_aggregate_query({
        aggregate_options: aggregate_list_option
    });
    if (query.isRefetching == true && query.isLoading) {
        return (
            <Chakra.Box m={2} bg="inherit">
                <Loading/>
            </Chakra.Box>
        );
    }
    if (query.isSuccess) {
        return (
            <React.Suspense
                fallback={
                    <Chakra.Box m={2} bg="inherit">
                        <Loading/>
                    </Chakra.Box>
                }
            >
                <Aggregate_part
                    src={query.data}
                />
            </React.Suspense>
        );
    }
    if (query.isError) {
        return (
            <ErrorEL1
                error={query.error}
            />
        );
    }
    return (
        <Chakra.Box m={2} bg="inherit">
            <Loading/>
        </Chakra.Box>
    );
}