import type { CurrentLoggedLists, CustomListVisibility } from "@mangadex/gql/graphql";
import AbstractSearchResult, {
	type PaginationData
} from "@mangadex/utils/searchResult/AbstractSearchResult";
import type { Client } from "@urql/svelte";
import query from "./query";

export type CurrentUserCustomListItemData = {
	id: string;
	name: string;
	titlesLen: number;
	titles: string[];
	visibility: CustomListVisibility;
};

type UserCustomListResultConstructorParams = {
	data: CurrentUserCustomListItemData[];
	client: Client;
	params: CurrentLoggedLists;
	offset: number;
	limit: number;
	total: number;
};

export class CurrentUserCustomListResult extends AbstractSearchResult<CurrentUserCustomListItemData> {
	client: Client;
	params: CurrentLoggedLists;
	offset: number;
	limit: number;
	total: number;
	constructor(param: UserCustomListResultConstructorParams) {
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
	next(): Promise<AbstractSearchResult<CurrentUserCustomListItemData>> {
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
	params: CurrentLoggedLists
): Promise<AbstractSearchResult<CurrentUserCustomListItemData>> {
	const result = await client
		.query(query, {
			...params
		})
		.toPromise();
	if (result.data) {
		const data = result.data.customList.currentLoggedLists;
		return new CurrentUserCustomListResult({
			client,
			params,
			offset: data.offset,
			total: data.total,
			limit: data.limit,
			data: data.data.map<CurrentUserCustomListItemData>((e) => {
				return {
					id: e.id,
					name: e.attributes.name,
					titlesLen: e.relationships.titlesIds.length,
					titles: e.relationships.titlesIds,
					visibility: e.attributes.visibility
				};
			})
		});
	}
	if (result.error) {
		throw result.error;
	}
	throw new Error("No results??");
}
