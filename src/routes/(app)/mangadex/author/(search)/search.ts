import type { Client } from "@urql/svelte";
import { query } from "./query";
import type { AuthorListParams } from "@mangadex/gql/graphql";
import AbstractSearchResult, {
	type PaginationData
} from "@mangadex/utils/searchResult/AbstractSearchResult";

export type AuthorListItemData = {
	id: string;
	name: string;
	titles: number;
	profilePicture?: string;
};

type AuthorSearchResultConstructorParams = {
	data: AuthorListItemData[];
	client: Client;
	params: AuthorListParams;
	offset: number;
	limit: number;
	total: number;
};

export class AuthorSearchResult extends AbstractSearchResult<AuthorListItemData> {
	client: Client;
	params: AuthorListParams;
	offset: number;
	limit: number;
	total: number;
	constructor(param: AuthorSearchResultConstructorParams) {
		super(param.data);
		this.client = param.client;
		this.params = param.params;
		this.limit = param.limit;
		this.offset = param.offset;
		this.total = param.total;
	}
	hasNext(): boolean {
		return this.offset < this.total && this.offset >= 0;
	}
	next(): Promise<AbstractSearchResult<AuthorListItemData>> {
		return executeSearchQuery(this.client, {
			...this.params,
			offset: this.offset + this.limit,
			limit: this.limit
		});
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
	params: AuthorListParams
): Promise<AbstractSearchResult<AuthorListItemData>> {
	const result = await client
		.query(query, {
			params
		})
		.toPromise();
	if (result.data) {
		const data = result.data.author.list;
		return new AuthorSearchResult({
			client,
			params,
			offset: data.limit,
			total: data.total,
			limit: data.limit,
			data: data.data.map<AuthorListItemData>((e) => ({
				id: e.id,
				name: e.attributes.name,
				titles: e.relationships.works.length
			}))
		});
	}
	if (result.error) {
		throw result.error;
	}
	throw new Error("No results??");
}
