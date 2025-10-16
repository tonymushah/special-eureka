import { userFollowedCustomListsGQL } from "@mangadex/gql-docs/list/user-followed";
import type { CurrentLoggedLists, CustomListVisibility, UserFollowedCustomListsQueryVariables, UserRole } from "@mangadex/gql/graphql";
import AbstractSearchResult, {
	type PaginationData
} from "@mangadex/utils/searchResult/AbstractSearchResult";
import type { Client } from "@urql/svelte";

export type FollowedUserCustomListItemData = {
	id: string;
	name: string;
	titles: number;
	visibility: CustomListVisibility;
	creator: {
		id: string,
		name: string,
		roles: UserRole[]
	}
};

type FollowedUserCustomListConstructorParams = {
	data: FollowedUserCustomListItemData[];
	client: Client;
	params: CurrentLoggedLists;
	offset: number;
	limit: number;
	total: number;
};

export class CurrentUserCustomListSearchResult extends AbstractSearchResult<FollowedUserCustomListItemData> {
	client: Client;
	params: CurrentLoggedLists;
	offset: number;
	limit: number;
	total: number;
	constructor(param: FollowedUserCustomListConstructorParams) {
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
	next(): Promise<AbstractSearchResult<FollowedUserCustomListItemData>> {
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
	params: UserFollowedCustomListsQueryVariables
): Promise<AbstractSearchResult<FollowedUserCustomListItemData>> {
	const result = await client
		.query(userFollowedCustomListsGQL, {
			...params
		})
		.toPromise();
	if (result.data) {
		const data = result.data.follows.customLists;
		return new CurrentUserCustomListSearchResult({
			client,
			params,
			offset: data.offset,
			total: data.total,
			limit: data.limit,
			data: data.data.map<FollowedUserCustomListItemData>((e) => {
				return {
					id: e.id,
					name: e.attributes.name,
					titles: e.relationships.titlesIds.length,
					visibility: e.attributes.visibility,
					creator: {
						id: e.relationships.user.id,
						name: e.relationships.user.attributes.username,
						roles: e.relationships.user.attributes.roles
					}
				};
			})
		});
	}
	if (result.error) {
		throw result.error;
	}
	throw new Error("No results??");
}
