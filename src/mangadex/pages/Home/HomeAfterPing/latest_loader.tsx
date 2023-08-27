import { QueryClient } from "@tanstack/react-query";
import { Client } from "@tauri-apps/api/http";
import { loader as latest, queryKey as latest_QueryKey } from "../Latest_Update";

export async function latest_loader(client: Client, queryClient: QueryClient) {
    const data = await latest({
        client,
        queryClient
    });
    queryClient.setQueryData(latest_QueryKey(), data);
}
