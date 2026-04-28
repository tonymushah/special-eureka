// TODO refactor svelte reactive classes

import type { ReadonlyValue, StoreOrVal, WritableValue } from "$lib";
import { addErrorToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
import { graphql } from "@mangadex/gql";
import {
	DownloadMode,
	type ChapterPagesSubscriptionSubscription,
	type ChapterPagesSubscriptionSubscriptionVariables
} from "@mangadex/gql/graphql";
import { client as mangadexClient } from "@mangadex/gql/urql";
import getImageSize from "@mangadex/utils/img/getSize";
import type { Client, OperationResult } from "@urql/svelte";
import { isArray, range } from "lodash";
import type { Getter } from "runed";
import { SvelteMap } from "svelte/reactivity";

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
	client?: Client;
	mode?: StoreOrVal<DownloadMode>;
};

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

export const refetchIncompletesMutation = graphql(`
	mutation refetchIncompletesPages($chapter: UUID!, $mode: DownloadMode) {
		chapter {
			pagesCache(id: $chapter, mode: $mode) {
				refetchIncompletes
			}
		}
	}
`);

export async function refetchIncompletePages(
	chapter: string,
	options?: { client?: Client; mode?: DownloadMode }
) {
	const client = options?.client ?? mangadexClient;
	const res = await client
		.mutation(refetchIncompletesMutation, {
			chapter,
			mode: options?.mode
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	}
}

export async function startCaching(
	chapter: string,
	options?: { client?: Client; mode?: DownloadMode }
) {
	const client = options?.client ?? mangadexClient;
	const res = await client
		.mutation(startCachingMutation, {
			chapter,
			mode: options?.mode
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	}
}

export async function fetchMetadata(
	chapter: string,
	options?: { client?: Client; mode?: DownloadMode }
) {
	const client = options?.client ?? mangadexClient;
	const res = await client
		.mutation(fetchMetadataMutation, {
			chapter,
			mode: options?.mode
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	}
}

export async function resendAll(
	chapter: string,
	options?: { client?: Client; mode?: DownloadMode }
) {
	const client = options?.client ?? mangadexClient;
	const res = await client
		.mutation(resendAllMutation, {
			chapter,
			mode: options?.mode
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	}
}

export async function refetchChapterPage(
	chapter: string,
	page: number,
	options?: { client?: Client; mode?: DownloadMode }
) {
	const client = options?.client ?? mangadexClient;
	const res = await client
		.mutation(refetchPageMutation, {
			chapter,
			mode: options?.mode,
			page
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	}
}

export async function resendChapterPage(
	chapter: string,
	page: number,
	options?: { client?: Client; mode?: DownloadMode }
) {
	const client = options?.client ?? mangadexClient;
	const res = await client
		.mutation(resendPageMutation, {
			chapter,
			mode: options?.mode,
			page
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	}
}

export type ChapterImage = {
	value: string;
	size?: {
		width: number;
		height: number;
	};
};

export type MaybeNullString = string | null;

export type ChapterDoubleImageItem = MaybeNullString | [MaybeNullString, MaybeNullString];

export type DoublePageIndex = number | [number, number];

export type IndexedPageState = {
	index: number;
	state: PageState;
};

export type IndexedDoublePageState = [IndexedPageState, IndexedPageState] | IndexedPageState;

// TODO implement an enum to get page state

export type PageStateInner =
	| {
			page: ChapterImage;
			error?: never;
			num: number;
	  }
	| {
			page?: never;
			error: Error;
			num: number;
	  };

export type PageState = PageStateInner | null;

export type DoublePageState = [PageState, PageState] | PageState;

export type ChapterPagesConstructorParam = {
	chapter_id: Getter<string>;
	mode?: Getter<DownloadMode>;
	client?: Client;
};

export default class ChapterPages {
	private pages: SvelteMap<number, ChapterImage>;
	private pagesError: SvelteMap<number, Error>;
	private _pages_len: WritableValue<number | undefined>;
	private chapter_id: Getter<string>;
	private _mode?: Getter<DownloadMode>;
	private client: Client;
	public reset() {
		this.pages.clear();
		this.pagesError.clear();
		this.pages_len = undefined;
	}
	private get pages_len(): number | undefined {
		console.log(this);
		return this._pages_len?.value;
	}
	private set pages_len(value: number | undefined) {
		console.log(this._pages_len);
		this._pages_len.value = value;
	}
	public get id(): string {
		return this.chapter_id();
	}
	public get mode(): DownloadMode | undefined {
		return this._mode?.();
	}
	private sub_func(
		op: OperationResult<
			ChapterPagesSubscriptionSubscription,
			ChapterPagesSubscriptionSubscriptionVariables
		>
	) {
		const error = op.error;
		const extensions = op.extensions;
		if (op.data) {
			const data = op.data;
			const toUse = data.getChapterPages;
			this.pagesLen = toUse.pages;

			if (toUse.size != null && toUse.size != undefined) {
				if (toUse.size != null && toUse.size != undefined)
					this.addPage(toUse.index, {
						value: toUse.url,
						size: {
							width: toUse.size.width,
							height: toUse.size.height
						}
					});
			} else {
				this.addPage(toUse.index, {
					value: toUse.url
				});
				getImageSize(toUse.url).then((d) => {
					this.addPage(toUse.index, {
						value: toUse.url,
						size: d
					});
				});
			}
		} else if (error && extensions) {
			const page = extensions.page;
			if (typeof page == "number" || typeof page == "string") {
				try {
					this.addPageError(Number(page), error);
				} catch (e) {
					addErrorToast("Chapter loading error", e);
				}
			} else {
				addErrorToast("Chapter loading error", error);
			}
		}
	}
	public constructor({ chapter_id, mode, client: _client }: ChapterPagesConstructorParam) {
		let __pages_len = $state({
			value: undefined
		});
		this.pages = new SvelteMap();
		this.pagesError = new SvelteMap();
		this._pages_len = __pages_len;
		this.chapter_id = chapter_id;
		this._mode = mode;
		const client = _client ?? mangadexClient;
		this.client = client;
		$effect(() => {
			const inner_sub = client
				.subscription(subscription, {
					chapter: this.chapter_id,
					mode: this.mode
				})
				.subscribe((d) => this.sub_func(d));
			return () => {
				inner_sub.unsubscribe();
				this.reset();
			};
		});
	}
	private addPage(index: number, page: ChapterImage) {
		this.pages.set(index, page);
		this.pagesError.delete(index);
	}

	private set pagesLen(pages: number) {
		this.pages_len = pages;
	}

	public get pagesLen(): number | undefined {
		return this.pages_len;
	}
	private addPageError(index: number, error: Error) {
		this.pagesError.set(index, error);
	}
	public get images(): (ChapterImage | null)[] {
		return this.pagesLenRange().map((index) => {
			const page = this.pages.get(index);
			return page ?? null;
		});
	}
	public get urls(): (string | null)[] {
		return this.images.map((d) => {
			return d?.value ?? null;
		});
	}
	public getPageError(page: number): Error | null {
		return this.pagesError.get(page) ?? null;
	}
	public getPageData(page: number): ChapterImage | null {
		return this.pages.get(page) ?? null;
	}
	private pagesLenRange(): number[] {
		if (this.pagesLen) return range(0, this.pagesLen);
		else return [];
	}
	public get pagesAsDoublePageIndexes(): DoublePageIndex[] {
		return this.__pagesAsDoublePageIndexes.value;
	}
	private get __pagesAsDoublePageIndexes(): ReadonlyValue<DoublePageIndex[]> {
		let output: Array<DoublePageIndex> = $state([]);
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
		this.pagesLenRange()
			.map((index) => {
				const img = this.pages.get(index);
				const height = img?.size?.height;
				const width = img?.size?.width;
				return {
					index,
					img,
					ratio: width && height ? width / height : undefined
				};
			})
			.forEach((maybeImg) => {
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
		return {
			get value() {
				return output;
			}
		};
	}
	public getPageState(page: number): PageState {
		const pageData = this.getPageData(page);
		const pageError = this.getPageError(page);
		if (pageData != null) {
			return {
				page: pageData,
				num: page
			};
		} else if (pageError != null) {
			return {
				error: pageError,
				num: page
			};
		} else {
			return null;
		}
	}
	public getDoublePageState(doublePageIndex: number): DoublePageState {
		const pages = this.pagesAsDoublePageIndexes;
		const current = pages.at(doublePageIndex);
		if (current != undefined) {
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
		this.pagesError.delete(page);
	}
	public get pagesState(): PageState[] {
		return this.pagesLenRange().map((index) => this.getPageState(index));
	}
	public get doublePageStates(): IndexedDoublePageState[] {
		return this.pagesAsDoublePageIndexes.map((e) => {
			if (isArray(e)) {
				return [
					{
						index: e[0],
						state: this.getPageState(e[0])
					},
					{
						index: e[1],
						state: this.getPageState(e[1])
					}
				];
			} else {
				return {
					index: e,
					state: this.getPageState(e)
				};
			}
		});
	}
	public removePageError(page: number) {
		this._removePageError(page);
	}
	public async startCaching() {
		await startCaching(this.id, {
			client: this.client,
			mode: this.mode
		});
	}
	public async fetchMetadata() {
		await fetchMetadata(this.id, {
			client: this.client,
			mode: this.mode
		});
	}
	public async resendAll() {
		await resendAll(this.id, {
			client: this.client,
			mode: this.mode
		});
	}
	public async refetchChapterPage(page: number) {
		await refetchChapterPage(this.id, page, {
			client: this.client,
			mode: this.mode
		});
	}
	public async resendChapterPage(page: number) {
		await resendChapterPage(this.id, page, {
			client: this.client,
			mode: this.mode
		});
	}
	public async refetchIncompletes() {
		await refetchIncompletePages(this.id, {
			client: this.client,
			mode: this.mode
		});
	}
	public get isComplete(): boolean {
		return this.pages.size == this.pagesLen;
	}
	public get getIncompleteIndexes(): number[] {
		return this.images.flatMap((value, index) => {
			if (value == null) {
				return [index];
			} else {
				return [];
			}
		});
	}
}
