import { QueryClient } from "@tanstack/svelte-query";

export const mangadexQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			networkMode: "always"
		},
		mutations: {
			networkMode: "always"
		}
	}
});
