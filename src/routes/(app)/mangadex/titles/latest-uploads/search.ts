import type { Chapter } from "@mangadex/componnents/chapter/feed";
import type { ChapterFeedListItem } from "@mangadex/componnents/chapter/feed/list";
import getChapterDownloadState from "@mangadex/componnents/home/latest-updates/getChapterDownloadState";
import {
	CoverImageQuality,
	type Language,
	type MangaFeedSortOrder,
	type MangaListParams
} from "@mangadex/gql/graphql";
import get_cover_art from "@mangadex/utils/cover-art/get_cover_art";
import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
import AbstractSearchResult, {
	type PaginationData
} from "@mangadex/utils/searchResult/AbstractSearchResult";
import get_chapters_stats from "@mangadex/utils/statistics/chapter/query";
import type { Client } from "@urql/svelte";
import query from "./query";

export type LatestUploadsParams = {
	offset?: number;
	limit?: number;
};

type LatestUploadsConstructorParams = {
	data: ChapterFeedListItem[];
	client: Client;
	params: LatestUploadsParams;
	mangaListParams?: MangaListParams;
	offset: number;
	limit: number;
	total: number;
};

export class LatestUploadsResult extends AbstractSearchResult<ChapterFeedListItem> {
	client: Client;
	params: LatestUploadsParams;
	mangaListParams?: MangaListParams;
	offset: number;
	limit: number;
	total: number;
	constructor(param: LatestUploadsConstructorParams) {
		super(param.data);
		this.client = param.client;
		this.params = param.params;
		this.limit = param.limit;
		this.offset = param.offset;
		this.total = param.total;
		this.mangaListParams = param.mangaListParams;
	}
	hasNext(): boolean {
		return this.offset < this.total && this.offset >= 0;
	}
	next(): Promise<AbstractSearchResult<ChapterFeedListItem>> {
		return executeSearchQuery(
			this.client,
			{
				...this.params,
				offset: this.offset + this.limit,
				limit: this.limit
			},
			this.mangaListParams
		);
	}
	public get paginationData(): PaginationData {
		return {
			total: this.total,
			limit: this.limit,
			offset: this.offset
		};
	}
}

export default async function executeSearchQuery(
	client: Client,
	params: LatestUploadsParams,
	mangaListParams?: MangaListParams
): Promise<AbstractSearchResult<ChapterFeedListItem>> {
	const results = await client
		.query(query, {
			offset: params.offset,
			limit: params.limit,
			mangaListParams
		})
		.toPromise();
	if (results.error) {
		throw results.error;
	}
	if (results.data) {
		const data = results.data.chapter.listWithGroupByManga;
		const comments = await get_chapters_stats(
			client,
			data.data.flatMap((d) => d.chapters.map<string>((c) => c.id)),
			true
		);
		return new LatestUploadsResult({
			client,
			params,
			offset: data.offset,
			total: data.total,
			limit: data.limit,
			mangaListParams,
			data: data.data.map<ChapterFeedListItem>((e) => {
				const cover_art = get_cover_art({
					client,
					cover_id: e.manga.relationships.coverArt.id,
					manga_id: e.manga.id,
					filename: e.manga.relationships.coverArt.attributes.fileName,
					mode: CoverImageQuality.V256
				});
				return {
					mangaId: e.manga.id,
					title:
						get_value_from_title_and_random_if_undefined(
							e.manga.attributes.title,
							"en"
						) ?? e.manga.id,
					coverImage: cover_art,
					coverImageAlt: e.manga.relationships.coverArt.id,
					mangaLang: e.manga.attributes.originalLanguage,
					chapters: e.chapters.map<Chapter>((chap) => {
						const title = (() => {
							const _title = chap.attributes.title;
							const volume = chap.attributes.volume;
							const chapter = chap.attributes.chapter;

							const _volume = volume ? `Vol.${volume} ` : "";
							const _chapter = chapter ? `Chap.${chapter}` : "";
							const __title = _title ? ` - ${_title}` : "";
							return `${_volume}${_chapter}${__title}`;
						})();
						const user = chap.relationships.user;
						const scanGroups = chap.relationships.scanlationGroups;
						const threadInfo = (() => {
							const _data = comments.get(chap.id);
							if (_data) {
								return {
									comments: _data.repliesCount,
									threadUrl: _data.threadUrl
								};
							} else {
								return {
									comments: 0
								};
							}
						})();
						return {
							chapterId: chap.id,
							title,
							lang: chap.attributes.translatedLanguage,
							upload_date: new Date(
								chap.attributes.readableAt ?? chap.attributes.createdAt
							),
							uploader: {
								id: user.id,
								name: user.attributes.username,
								roles: user.attributes.roles
							},
							groups: scanGroups.map((group) => ({
								id: group.id,
								name: group.attributes.name
							})),
							...threadInfo,
							download_state: getChapterDownloadState({
								id: chap.id,
								client
							})
						};
					})
				};
			})
		});
	}
	throw new Error("No results??");
}
