import type { Client } from "@urql/svelte";
import { query } from "./query";
import type { AuthorListParams, ScanlationGroupListParams, UserListParam, UserRole } from "@mangadex/gql/graphql";
import AbstractSearchResult, { type PaginationData } from "@mangadex/utils/searchResult/AbstractSearchResult";

export type UserListItemData = {
	id: string,
	name: string,
	roles: UserRole[],
}

type UserSearchResultConstructorParams = {
	data: UserListItemData[]
	client: Client
	params: UserListParam
	offset: number
	limit: number
	total: number
}

export class UserGroupSearchResult extends AbstractSearchResult<UserListItemData> {
	client: Client
	params: UserListParam
	offset: number
	limit: number
	total: number
	constructor(param: UserSearchResultConstructorParams) {
		super(param.data);
		this.client = param.client;
		this.params = param.params;
		this.limit = param.limit;
		this.offset = param.offset;
		this.total = param.total
	}
	hasNext(): boolean {
		return this.offset < this.total && this.offset >= 0;
	}
	next(): Promise<AbstractSearchResult<UserListItemData>> {
		return executeSearchQuery(this.client, {
			...this.params,
			offset: this.offset + this.limit,
			limit: this.limit
		})
	}
	public get paginationData(): PaginationData {
		return {
			total: this.total,
			limit: this.limit,
			offset: this.offset
		}
	}
}

export default async function executeSearchQuery(client: Client, params: UserListParam): Promise<AbstractSearchResult<UserListItemData>> {
	const result = await client.query(query, {
		params
	}).toPromise();
	if (result.data) {
		const data = result.data.user.list;
		return new UserGroupSearchResult({
			client,
			params,
			offset: data.limit,
			total: data.total,
			limit: data.limit,
			data: data.data.map<UserListItemData>((e) => {
				return {
					id: e.id,
					name: e.attributes.username,
					roles: e.attributes.roles
				}
			})
		})
	}
	if (result.error) {
		throw result.error
	}
	throw new Error("No results??");
}