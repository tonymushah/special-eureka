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

interface GetCoverParam {
	id: string;
	asManga?: boolean;
	quality?: "256" | "512";
}

interface MangaDexInternalUtil {
	__getCoverImageUrl(param: GetCoverParam): string;
}

declare global {
	interface Window {
		__MANGADEX_UTILS__: MangaDexInternalUtil;
	}
}
