import { addErrorToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
import { graphql } from "@mangadex/gql";
import { DownloadMode, type ChapterPagesSubscriptionSubscription, type ChapterPagesSubscriptionSubscriptionVariables } from "@mangadex/gql/graphql";
import { client as mangadexClient } from "@mangadex/gql/urql";
import getImageSize from "@mangadex/utils/img/getSize";
import type { StoreOrVal } from "@tanstack/svelte-query";
import type { Client, CombinedError, OperationResult } from "@urql/svelte";
import { get, readable, type Readable } from "svelte/store";

export type ChapterImage = {
	value: string,
	size?: {
		width: number,
		height: number
	}
}

export class ChapterPages {
	private pages: Map<number, ChapterImage>;
	private pagesError: Map<number, Error>;
	private pages_len?: number;
	constructor() {
		this.pages = new Map();
		this.pagesError = new Map()
	}
	addPage(index: number, page: ChapterImage) {
		this.pages.set(index, page);
		this.pagesError.delete(index)
	}

	set pagesLen(pages: number) {
		this.pagesLen = pages;
	}

	public get pagesLen(): number | undefined {
		return this.pages_len;
	}
	addPageError(index: number, error: Error) {
		this.pagesError.set(index, error)
	}
}

export const subscription = graphql(`
	subscription chapterPagesSubscription($chapter: UUID!, $mode: DownloadMode) {
		getChapterPages(chapter: $chapter, mode: $mode) {
			pages
			index
			size {
				width
				height
			}
			url
		}
	}
`);

export type ChapterPagesFuncOptions = {
	client?: Client,
	mode?: StoreOrVal<DownloadMode>
}

export const startCachingMutation = graphql(`
	mutation startChapterPagesCaching($chapter: UUID!, $mode: DownloadMode) {
		chapter {
			pagesCache(id: $chapter, mode: $mode) {
				startCaching
			}
		}
	}
`);

export const fetchMetadataMutation = graphql(`
	mutation fetchingChapterPagesMetadata($chapter: UUID!, $mode: DownloadMode) {
		chapter {
			pagesCache(id: $chapter, mode: $mode) {
				fetchMetadata
			}
		}
	}
`);

export const refetchPageMutation = graphql(`
	mutation refetchChapterPage($chapter: UUID!, $mode: DownloadMode, $page: Int!) {
		chapter {
			pagesCache(id: $chapter, mode: $mode) {
				refetchPage(page: $page)
			}
		}
	}
`);

export const resendPageMutation = graphql(`
	mutation resendChapterPage($chapter: UUID!, $mode: DownloadMode, $page: Int!) {
		chapter {
			pagesCache(id: $chapter, mode: $mode) {
				resendPage(page: $page)
			}
		}
	}
`);

export const resendAllMutation = graphql(`
	mutation resendChapterPages($chapter: UUID!, $mode: DownloadMode) {
		chapter {
			pagesCache(id: $chapter, mode: $mode) {
				resendAll
			}
		}
	}
`);

export async function startCaching(chapter: string, options?: { client?: Client, mode?: DownloadMode }) {
	const client = options?.client ?? mangadexClient;
	const res = await client.mutation(startCachingMutation, {
		chapter,
		mode: options?.mode
	}).toPromise();
	if (res.error) {
		throw res.error
	}
}

export async function fetchMetadata(chapter: string, options?: { client?: Client, mode?: DownloadMode }) {
	const client = options?.client ?? mangadexClient;
	const res = await client.mutation(fetchMetadataMutation, {
		chapter,
		mode: options?.mode
	}).toPromise();
	if (res.error) {
		throw res.error
	}
}

export async function resendAll(chapter: string, options?: { client?: Client, mode?: DownloadMode }) {
	const client = options?.client ?? mangadexClient;
	const res = await client.mutation(resendAllMutation, {
		chapter,
		mode: options?.mode
	}).toPromise();
	if (res.error) {
		throw res.error
	}
}

export async function refetchChapterPage(chapter: string, page: number, options?: { client?: Client, mode?: DownloadMode }) {
	const client = options?.client ?? mangadexClient;
	const res = await client.mutation(refetchPageMutation, {
		chapter,
		mode: options?.mode,
		page
	}).toPromise();
	if (res.error) {
		throw res.error
	}
}

export async function resendChapterPage(chapter: string, page: number, options?: { client?: Client, mode?: DownloadMode }) {
	const client = options?.client ?? mangadexClient;
	const res = await client.mutation(resendPageMutation, {
		chapter,
		mode: options?.mode,
		page
	}).toPromise();
	if (res.error) {
		throw res.error
	}
}

export type ChapterPagesStore = Readable<ChapterPages> & {
	startCaching: () => Promise<void>,
	fetchMetadata: () => Promise<void>,
	resendAll: () => Promise<void>,
	refetchChapterPage: (page: number) => Promise<void>,
	resendChapterPage: (page: number) => Promise<void>
};

export default function chapterPages(chapter: string, options?: ChapterPagesFuncOptions): ChapterPagesStore {
	const client = options?.client ?? mangadexClient;
	const mode = options?.mode ?? DownloadMode.Normal;

	const store = readable(new ChapterPages(), (set, update) => {
		// NOTE I am lazy to rewrite the same function over and over. This is why i came with this `sub_func` thingy.
		const sub_func = (op: OperationResult<ChapterPagesSubscriptionSubscription, ChapterPagesSubscriptionSubscriptionVariables>) => {
			if (op.data) {
				const data = op.data;
				const toUse = data.getChapterPages;
				update((value) => {
					value.pagesLen = toUse.pages;
					return value;
				});
				if (toUse.size != null && toUse.size != undefined) {
					update((value) => {
						if (toUse.size != null && toUse.size != undefined)
							value.addPage(toUse.index, {
								value: toUse.url,
								size: {
									width: toUse.size.width,
									height: toUse.size.height
								}
							})
						return value;
					})
				} else {
					update((value) => {
						value.addPage(toUse.index, {
							value: toUse.url
						});
						return value;
					});
					getImageSize(toUse.url).then((d) => {
						update((value) => {
							value.addPage(toUse.index, {
								value: toUse.url,
								size: d
							});
							return value;
						});
					})
				}
			} else if (op.error && op.extensions) {
				const error = op.error;
				const extensions = op.extensions;
				const page = extensions.page;
				if (typeof page == "number" || typeof page == "string") {
					update((d) => {
						try {
							d.addPageError(Number(page), error);
						} catch (e) {
							addErrorToast("Chapter loading error", e);
						}
						return d;
					});
				} else {
					addErrorToast("Chapter loading error", error);
				}
			}
		}
		// TODO test if this `mode` store *actually* works
		if (typeof mode == "object") {
			let unsub: (() => void) | undefined = undefined;
			let sub = mode.subscribe(($mode) => {
				unsub?.()
				let inner_sub = client.subscription(subscription, {
					chapter,
					mode: $mode
				}).subscribe((d) => sub_func(d));
				unsub = () => {
					inner_sub.unsubscribe()
				}
			})
			return () => {
				unsub?.();
				sub();
			}
		} else {
			// NOTE this one doesn't need test. It should work fine.
			let inner_sub = client.subscription(subscription, {
				chapter,
				mode
			}).subscribe((d) => sub_func(d));
			return () => {
				inner_sub.unsubscribe()
			}
		}
	});
	const getMode = () => {
		if (typeof mode == "object") {
			return get(mode);
		} else {
			return mode;
		}
	}
	return {
		...store,
		async startCaching() {
			await startCaching(chapter, {
				client,
				mode: getMode()
			})
		},
		async fetchMetadata() {
			await fetchMetadata(chapter, {
				client,
				mode: getMode()
			})
		},
		async resendAll() {
			await resendAll(chapter, {
				client,
				mode: getMode()
			})
		},
		async refetchChapterPage(page) {
			await refetchChapterPage(chapter, page, {
				client,
				mode: getMode()
			})
		},
		async resendChapterPage(page) {
			await resendChapterPage(chapter, page, {
				client,
				mode: getMode()
			})
		},
	}
}