import type { MangaListContentItemProps } from "@mangadex/componnents/manga/list/MangaListContent.svelte";
import tagPopularTitlesQuery from "@mangadex/gql-docs/tag/page/popularInfQuery";
import {
	CoverImageQuality, type TagPopularList
} from "@mangadex/gql/graphql";
import get_cover_art from "@mangadex/utils/cover-art/get_cover_art";
import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
import AbstractSearchResult, {
	type PaginationData
} from "@mangadex/utils/searchResult/AbstractSearchResult";
import type { Client } from "@urql/svelte";

type TagPopularSectionResultConstuctorParams = {
	data: MangaListContentItemProps[];
	client: Client;
	params?: TagPopularList;
	offset: number;
	limit: number;
	total: number;
	id: string;
};

export class TagPopularSectionResult extends AbstractSearchResult<MangaListContentItemProps> {
	client: Client;
	params?: TagPopularList;
	offset: number;
	limit: number;
	total: number;
	id: string
	constructor({
		data,
		client,
		params,
		offset,
		limit,
		total,
		id
	}: TagPopularSectionResultConstuctorParams) {
		super(data);
		this.client = client;
		this.params = params;
		this.limit = limit;
		this.offset = offset;
		this.total = total;
		this.id = id;
	}
	hasNext(): boolean {
		return this.offset <= this.total && this.offset >= 0;
	}
	public get paginationData(): PaginationData {
		return {
			total: this.total,
			limit: this.limit,
			offset: this.offset
		};
	}
	next(): Promise<AbstractSearchResult<MangaListContentItemProps>> {
		return executeSearchQuery(
			this.client,
			this.id,
			{
				...this.params,
				offset: this.offset + this.limit,
				limit: this.limit
			},
		);
	}
}

type SomeRes = {
	data: MangaListContentItemProps[];
	offset: number;
	limit: number;
	total: number;
};

export default async function executeSearchQuery(
	client: Client,
	id: string,
	param?: TagPopularList,
): Promise<AbstractSearchResult<MangaListContentItemProps>> {
	let res: SomeRes | undefined = undefined;

	const result = await client
		.query(tagPopularTitlesQuery, {
			params: param,
			id
		})
		.toPromise();
	if (result.data) {
		const data = result.data.tag.page.popularInfSection;
		res = {
			data: data.data.map<MangaListContentItemProps>((v) => {
				const contentRating = v.attributes.contentRating;
				return {
					mangaId: v.id,
					id: v.id,
					coverImage: get_cover_art({
						cover_id: v.relationships.coverArt.id,
						manga_id: v.id,
						filename: v.relationships.coverArt.attributes.fileName,
						client,
						mode: CoverImageQuality.V256
					}),
					status: v.attributes.status,
					contentRating: contentRating != null ? contentRating : undefined,
					description:
						get_value_from_title_and_random_if_undefined(
							v.attributes.description,
							"en"
						) ?? "",
					title:
						get_value_from_title_and_random_if_undefined(
							v.attributes.title,
							"en"
						) ?? "",
					coverImageAlt: v.relationships.coverArt.id,
					withFull: true,
					tags: v.attributes.tags.map((tag) => ({
						id: tag.id,
						name:
							get_value_from_title_and_random_if_undefined(
								tag.attributes.name,
								"en"
							) ?? ""
					})),
					language: v.attributes.originalLanguage
				};
			}),
			offset: data.offset,
			limit: data.limit,
			total: data.total
		};
	}
	if (result.error) {
		throw result.error;
	}

	if (res) {
		return new TagPopularSectionResult({
			...res,
			client,
			params: param,
			id
		});
	} else {
		throw new Error("no data obtained");
	}
}
