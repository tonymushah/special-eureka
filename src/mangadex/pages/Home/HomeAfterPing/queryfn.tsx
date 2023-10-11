import { QueryClient } from "@tanstack/react-query";
import { Client } from "@tauri-apps/api/http";


export function queryfn(client: Client | undefined, queryClient: QueryClient) {
    return async () => {
        const { latest_loader } = await import("./latest_loader");
        const { popular_loader } = await import("./popular_loader");
        const { recentlyAdded_loader } = await import("./recentlyAdded_loader");
        const { seasonal_loader } = await import("./seasonal_loader");
        return (await Promise.all([
            latest_loader(client, queryClient),
            popular_loader(client, queryClient),
            recentlyAdded_loader(client, queryClient),
            seasonal_loader(client, queryClient),
        ]));
    };
}
