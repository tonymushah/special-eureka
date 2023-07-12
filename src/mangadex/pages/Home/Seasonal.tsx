import React from "react";
import * as Chakra from "@chakra-ui/react";
import { List } from "@mangadex/api/structures/List";
import { Client } from "@tauri-apps/api/http";
import { useQuery } from "@tanstack/react-query";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Mangadex_suspense__ } from "@mangadex/index";

const CustomListSwiper = React.lazy(() => import("@mangadex/resources/componnents/lists/v1/CustomListSwiper"));

export async function getSeasonalId(client: Client) {
    return await List.get_seasonal_id(client);
}

export default function Seasonal() {
    const client = useHTTPClient();
    const query = useQuery([
        "mdx", "seasonal", "id"
    ], async () => {
        return await getSeasonalId(client);
    });
    if (query.isSuccess) {
        return (
            <Chakra.Box>
                <Chakra.Heading fontFamily={"inherit"}>Seasonal</Chakra.Heading>
                <React.Suspense
                    fallback={<Chakra.Box >
                        <Chakra.Center>
                            <Chakra.Spinner
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