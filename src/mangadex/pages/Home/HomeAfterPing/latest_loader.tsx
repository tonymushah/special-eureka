import { QueryClient } from "@tanstack/react-query";
import { Client } from "@tauri-apps/api/http";
import { loader as latest, queryKey as latest_QueryKey } from "../Latest_Update";

export async function latest_loader(client: Client, queryClient: QueryClient) {
    await queryClient.fetchQuery(latest_QueryKey(), async () => {
        return await latest({
            client,
            queryClient
        });
    });
}
