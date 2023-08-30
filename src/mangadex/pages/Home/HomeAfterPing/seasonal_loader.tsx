import { List } from "@mangadex/api/structures/List";
import { QueryClient } from "@tanstack/react-query";
import { Client } from "@tauri-apps/api/http";
import { getSeasonalId } from "../Seasonal";

export async function seasonal_loader(client: Client, queryClient: QueryClient) {
    const seasonal_id = await getSeasonalId(client);
    /// [x] Refactor Query Key into a function
    queryClient.setQueryData(queryKey(), seasonal_id);
    const data = await List.getListByID_includes_manga(seasonal_id, client);
    /// [x] Refactor Query Key into a function
    const key = custom_list_queryKey(seasonal_id);
    queryClient.setQueryData(key, data);
}

function custom_list_queryKey(seasonal_id: string) {
    return ["mdx", "custom_list", seasonal_id];
}

export function queryKey() {
    return ["mdx", "seasonal", "id"];
}

