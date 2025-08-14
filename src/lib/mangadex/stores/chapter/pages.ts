import { addErrorToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
import { graphql } from "@mangadex/gql";
import { DownloadMode, type ChapterPagesSubscriptionSubscription, type ChapterPagesSubscriptionSubscriptionVariables } from "@mangadex/gql/graphql";
import { client as mangadexClient } from "@mangadex/gql/urql";
import getImageSize from "@mangadex/utils/img/getSize";
import type { StoreOrVal } from "@tanstack/svelte-query";
import type { Client, CombinedError, OperationResult } from "@urql/svelte";
import { isArray, range } from "lodash";
import { get, readable, writable, type Readable, type Writable } from "svelte/store";

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

export type ChapterPagesStore = Writable<ChapterPages> & {
	startCaching: () => Promise<void>,
	fetchMetadata: () => Promise<void>,
	resendAll: () => Promise<void>,
	refetchChapterPage: (page: number) => Promise<void>,
	resendChapterPage: (page: number) => Promise<void>
};

export type ChapterImage = {
	value: string,
	size?: {
		width: number,
		height: number
	}
}

export type MaybeNullString = string | null

export type ChapterDoubleImageItem = MaybeNullString | [MaybeNullString, MaybeNullString]

export type DoublePageIndex = number | [number, number];

// TODO implement an enum to get page state

export type PageStateInner = {
	page: ChapterImage,
	error?: never
} | {
	page?: never,
	error: Error
}

export type PageState = PageStateInner | null;

export type DoublePageState = [PageState, PageState] | PageState;

export default class ChapterPages {
	private pages: Map<number, ChapterImage>;
	private pagesError: Map<number, Error>;
	private pages_len?: number;
	private constructor() {
		this.pages = new Map();
		this.pagesError = new Map()
	}
	private addPage(index: number, page: ChapterImage) {
		this.pages.set(index, page);
		this.pagesError.delete(index)
	}

	set pagesLen(pages: number) {
		this.pages_len = pages;
	}

	public get pagesLen(): number | undefined {
		return this.pages_len;
	}
	private addPageError(index: number, error: Error) {
		this.pagesError.set(index, error)
	}
	public getImages(): (ChapterImage | null)[] {
		return this.pagesLenRange().map((index) => {
			const page = this.pages.get(index);
			return page ?? null
		});
	}
	public getUrls(): (string | null)[] {
		return this.getImages().map((d) => {
			return d?.value ?? null
		});
	}
	public getPageError(page: number): Error | null {
		return this.pagesError.get(page) ?? null
	}
	public getPageData(page: number): ChapterImage | null {
		return this.pages.get(page) ?? null
	}
	private pagesLenRange(): number[] {
		if (this.pagesLen)
			return range(0, this.pagesLen)
		else
			return []
	}
	public pagesAsDoublePageIndexes(): DoublePageIndex[] {
		const output: Array<DoublePageIndex> = [];
		let accumalator: number[] = [];
		function push_acc_to_out1() {
			if (accumalator.length == 1) {
				output.push(accumalator[0]);
			} else if (accumalator.length == 2) {
				output.push([accumalator[0], accumalator[1]]);
			}
			accumalator = [];
		}
		function push_acc_to_out2() {
			if (accumalator.length == 2) {
				output.push([accumalator[0], accumalator[1]]);
				accumalator = [];
			}
		}
		this.pagesLenRange().map((index) => {
			const img = this.pages.get(index);
			const height = img?.size?.height;
			const width = img?.size?.width
			return {
				index,
				img,
				ratio: (width && height) ? width / height : undefined
			}
		}).forEach((maybeImg) => {
			if (maybeImg.ratio != undefined && maybeImg.ratio < 1) {
				accumalator.push(maybeImg.index);
			} else {
				push_acc_to_out1();
				output.push(maybeImg.index);
			}
			push_acc_to_out2();
		});
		/*
		((value, key) => {
			if (value < 1) {
				accumalator.push(key);
			} else {
				push_acc_to_out1();
				output.push(key);
			}
			push_acc_to_out2();
		});*/
		push_acc_to_out1();
		return output;
	}
	public getPageState(page: number): PageState {
		const pageData = this.getPageData(page);
		const pageError = this.getPageError(page);
		if (pageData) {
			return {
				"page": pageData,
			}
		} else if (pageError) {
			return {
				error: pageError,
			}
		} else {
			return null;
		}
	}
	public getDoublePageState(doublePageIndex: number): DoublePageState {
		const pages = this.pagesAsDoublePageIndexes();
		const current = pages.at(doublePageIndex);
		if (current) {
			if (isArray(current)) {
				return [this.getPageState(current[0]), this.getPageState(current[1])];
			} else {
				return this.getPageState(current);
			}
		} else {
			return null;
		}
	}
	private _removePageError(page: number) {
		this.pagesError.delete(page)
	}
	public getPagesState(): PageState[] {
		return this.pagesLenRange().map((index) => this.getPageState(index))
	}
	public static removePageError(pages: Writable<ChapterPages>, page: number) {
		pages.update((ps) => {
			ps._removePageError(page);
			return ps;
		})
	}
	public static initFromStore(chapterId: Readable<string>, options?: ChapterPagesFuncOptions): ChapterPagesStore {
		const client = options?.client ?? mangadexClient;
		const mode = options?.mode ?? DownloadMode.Normal;
		const store = writable(new ChapterPages(), (set, update) => {
			let unsub: (() => void) | undefined = undefined;
			function chapterIdSub(chapter: string) {
				// NOTE I am lazy to rewrite the same function over and over. This is why i came with this `sub_func` thingy.
				const sub_func = (op: OperationResult<ChapterPagesSubscriptionSubscription, ChapterPagesSubscriptionSubscriptionVariables>) => {
					const error = op.error;
					const extensions = op.extensions;
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
					} else if (error && extensions) {
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
			}
			chapterId.subscribe((chapter) => {
				unsub?.();
				unsub = chapterIdSub(chapter);
			});
			return () => {
				unsub?.();
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
				await startCaching(get(chapterId), {
					client,
					mode: getMode()
				})
			},
			async fetchMetadata() {
				await fetchMetadata(get(chapterId), {
					client,
					mode: getMode()
				})
			},
			async resendAll() {
				await resendAll(get(chapterId), {
					client,
					mode: getMode()
				})
			},
			async refetchChapterPage(page) {
				await refetchChapterPage(get(chapterId), page, {
					client,
					mode: getMode()
				})
			},
			async resendChapterPage(page) {
				await resendChapterPage(get(chapterId), page, {
					client,
					mode: getMode()
				});
			},
		}
	}
	public static initStore(chapter: string, options?: ChapterPagesFuncOptions): ChapterPagesStore {
		return ChapterPages.initFromStore(readable(chapter), options);
	}
}
