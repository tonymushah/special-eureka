import { QueryClient } from "@tanstack/react-query";
import { Client } from "@tauri-apps/api/http";
import { loader as recentlyAdded, queryKey as recentlyAdded_QueryKey } from "../RecentlyAdded";

export async function recentlyAdded_loader(client: Client, queryClient: QueryClient) {
    queryClient.prefetchQuery(recentlyAdded_QueryKey(), async function () {
        return await recentlyAdded({
            client
        });
    });
}
