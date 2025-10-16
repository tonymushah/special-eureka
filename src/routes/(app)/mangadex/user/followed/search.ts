import { userFollowedUsersGQL } from "@mangadex/gql-docs/user/user-followed";
import type { UserRole } from "@mangadex/gql/graphql";
import AbstractSearchResult, {
	type PaginationData
} from "@mangadex/utils/searchResult/AbstractSearchResult";
import type { Client } from "@urql/svelte";

export type UserListItemData = {
	id: string;
	name: string;
	roles: UserRole[];
};

type UserSearchResultConstructorParams = {
	data: UserListItemData[];
	client: Client;
	params: {};
	offset: number;
	limit: number;
	total: number;
};

export class UserFollowingSearchResult extends AbstractSearchResult<UserListItemData> {
	client: Client;
	params: UserFollowingParams;
	offset: number;
	limit: number;
	total: number;
	constructor(param: UserSearchResultConstructorParams) {
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
	next(): Promise<AbstractSearchResult<UserListItemData>> {
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

export type UserFollowingParams = {
	limit?: number | null;
	offset?: number | null;
};

export default async function executeSearchQuery(
	client: Client,
	params: UserFollowingParams
): Promise<AbstractSearchResult<UserListItemData>> {
	const result = await client
		.query(userFollowedUsersGQL, {
			...params,
		})
		.toPromise();
	if (result.data) {
		const data = result.data.follows.users;
		return new UserFollowingSearchResult({
			client,
			params,
			offset: data.offset,
			total: data.total,
			limit: data.limit,
			data: data.data.map<UserListItemData>((e) => {
				return {
					id: e.id,
					name: e.attributes.username,
					roles: e.attributes.roles
				};
			})
		});
	}
	if (result.error) {
		throw result.error;
	}
	throw new Error("No results??");
}
