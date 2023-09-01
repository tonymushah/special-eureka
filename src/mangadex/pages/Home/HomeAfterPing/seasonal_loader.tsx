import { List } from "@mangadex/api/structures/List";
import { QueryClient } from "@tanstack/react-query";
import { Client } from "@tauri-apps/api/http";
import { getSeasonalId } from "../Seasonal";

export async function seasonal_loader(client: Client, queryClient: QueryClient) {
    /// [x] Refactor Query Key into a function
    const seasonal_id = await queryClient.fetchQuery(queryKey(), async function () {
        return await getSeasonalId(client);
    });/// [x] Refactor Query Key into a function 
    await queryClient.prefetchQuery(custom_list_queryKey(seasonal_id), async function(){
        return await List.getListByID_includes_manga(seasonal_id, client);
    });
}

function custom_list_queryKey(seasonal_id: string) {
    return ["mdx", "custom_list", seasonal_id];
}

export function queryKey() {
    return ["mdx", "seasonal", "id"];
}

