import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { List } from "@mangadex/api/structures/List";
import { Mangadex_suspense__ } from "@mangadex/index";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import { useQuery } from "@tanstack/react-query";
import { Client } from "@tauri-apps/api/http";
import React from "react";

const CustomListSwiper = React.lazy(() => import("@mangadex/resources/componnents/lists/v1/CustomListSwiper"));

export async function getSeasonalId(client?: Client) {
    return await List.get_seasonal_id(client);
}

export default function Seasonal() {
    const client = useHTTPClient();

    const _queryKey_ = React.useMemo(() => queryKey(), []);
    const query = useQuery(_queryKey_, async () => {
        return await getSeasonalId(client);
    });
    if (query.isSuccess) {
        return (
            <Chakra.Box>
                <Chakra.Heading fontFamily={"inherit"}>Seasonal</Chakra.Heading>
                <React.Suspense
                    fallback={<Chakra.Box >
                        <Chakra.Center>
                            <MangadexSpinner
                                size={"xl"}
                            />
                        </Chakra.Center>
                    </Chakra.Box>}
                >
                    <CustomListSwiper listID={query.data} />
                </React.Suspense>
            </Chakra.Box>
        );
    }
    return (
        <Mangadex_suspense__ />
    );
}

export function queryKey() {
    return [
        "mdx", "seasonal", "id"
    ];
}
