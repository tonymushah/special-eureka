import { QueryClient } from "@tanstack/react-query";
import { Client } from "@tauri-apps/api/http";
import { loader as popular, queryKey as popular_QueryKey } from "../PopularTitles";

export async function popular_loader(client: Client, queryClient: QueryClient) {
    await queryClient.prefetchQuery(popular_QueryKey(), async function () {
        return await popular({
            client
        });
    });
}
