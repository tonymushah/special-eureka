import { QueryClient } from "@tanstack/react-query";
import { Client } from "@tauri-apps/api/http";
import { loader as latest, queryKey as latest_QueryKey } from "../Latest_Update";

export async function latest_loader(client: Client | undefined, queryClient: QueryClient) {
    await queryClient.prefetchQuery(latest_QueryKey(), async () => {
        return await latest({
            client,
            queryClient
        });
    });
}