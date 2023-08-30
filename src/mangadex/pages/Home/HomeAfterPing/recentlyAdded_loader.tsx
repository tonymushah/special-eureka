import { QueryClient } from "@tanstack/react-query";
import { Client } from "@tauri-apps/api/http";
import { loader as recentlyAdded, queryKey as recentlyAdded_QueryKey } from "../RecentlyAdded";

export async function recentlyAdded_loader(client: Client, queryClient: QueryClient) {
    const data = await recentlyAdded({
        client
    });
    queryClient.setQueryData(recentlyAdded_QueryKey(), data);
}
