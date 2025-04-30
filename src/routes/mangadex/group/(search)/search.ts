import type { Client } from "@urql/svelte";
import { query } from "./query";
import type { AuthorListParams, ScanlationGroupListParams } from "@mangadex/gql/graphql";
import AbstractSearchResult, {
	type PaginationData
} from "@mangadex/utils/searchResult/AbstractSearchResult";

export type ScanlationGroupListItemData = {
	id: string;
	name: string;
	members: number;
	leader?: {
		id: string;
		name: string;
	};
};

type ScanlationGroupSearchResultConstructorParams = {
	data: ScanlationGroupListItemData[];
	client: Client;
	params: ScanlationGroupListParams;
	offset: number;
	limit: number;
	total: number;
};

export class ScanlationGroupSearchResult extends AbstractSearchResult<ScanlationGroupListItemData> {
	client: Client;
	params: ScanlationGroupListParams;
	offset: number;
	limit: number;
	total: number;
	constructor(param: ScanlationGroupSearchResultConstructorParams) {
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
	next(): Promise<AbstractSearchResult<ScanlationGroupListItemData>> {
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
	params: ScanlationGroupListParams
): Promise<AbstractSearchResult<ScanlationGroupListItemData>> {
	const result = await client
		.query(query, {
			params
		})
		.toPromise();
	if (result.data) {
		const data = result.data.scanlationGroup.list;
		return new ScanlationGroupSearchResult({
			client,
			params,
			offset: data.limit,
			total: data.total,
			limit: data.limit,
			data: data.data.map<ScanlationGroupListItemData>((e) => {
				let eleader = e.relationships.leader;
				let leader = eleader
					? { id: eleader.id, name: eleader.attributes.username }
					: undefined;
				return {
					id: e.id,
					name: e.attributes.name,
					members: e.relationships.members.length,
					leader
				};
			})
		});
	}
	if (result.error) {
		throw result.error;
	}
	throw new Error("No results??");
}
