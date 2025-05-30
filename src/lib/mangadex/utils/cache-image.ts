import { mangadexQueryClient } from "@mangadex/index";
import { createQueries, createQuery, type QueryFunctionContext } from "@tanstack/svelte-query";
import { derived, type Readable } from "svelte/store";

export function cacheImage(url: string) {
	return createQuery(
		{
			queryKey: ["image", url],
			staleTime: Infinity,
			async queryFn(ctx) {
				const blob = await fetch(url, {
					signal: ctx.signal
				}).then((e) => e.blob());
				return URL.createObjectURL(blob);
			}
		},
		mangadexQueryClient
	);
}

export function cacheImageFromReadable(url_read: Readable<string>) {
	return createQuery(
		derived(url_read, (url) => ({
			queryKey: ["image", url],
			staleTime: Infinity,
			async queryFn(ctx: QueryFunctionContext) {
				const blob = await fetch(url, {
					signal: ctx.signal
				}).then((e) => e.blob());
				return URL.createObjectURL(blob);
			}
		})),
		mangadexQueryClient
	);
}

export function cacheImages(urls: string[]) {
	return createQueries(
		{
			queries: urls.map((url) => ({
				queryKey: ["image", url],
				staleTime: Infinity,
				async queryFn({ signal }: QueryFunctionContext) {
					const blob = await fetch(url, {
						signal
					}).then((e) => e.blob());
					return URL.createObjectURL(blob);
				}
			}))
		},
		mangadexQueryClient
	);
}

export function cacheImagesFromReadable(urls_readable: Readable<string[]>) {
	return createQueries(
		{
			queries: derived(urls_readable, (urls) =>
				urls.map((url) => ({
					queryKey: ["image", url],
					staleTime: Infinity,
					async queryFn({ signal }: QueryFunctionContext) {
						const blob = await fetch(url, {
							signal
						}).then((e) => e.blob());
						return URL.createObjectURL(blob);
					}
				}))
			)
		},
		mangadexQueryClient
	);
}
