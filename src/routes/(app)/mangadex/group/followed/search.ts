import { userFollowedGroupsGQL } from "@mangadex/gql-docs/group/user-followed";
import type { UserFollowedGroupsQueryVariables } from "@mangadex/gql/graphql";
import AbstractSearchResult, {
	type PaginationData
} from "@mangadex/utils/searchResult/AbstractSearchResult";
import type { Client } from "@urql/svelte";
import type { ScanlationGroupListItemData } from "../(search)/search";

type UserFollowedScanlationGroupResultConstructorParams = {
	data: ScanlationGroupListItemData[];
	client: Client;
	params: UserFollowedGroupsQueryVariables;
	offset: number;
	limit: number;
	total: number;
};

export class UserFollowedScanlationGroupsResult extends AbstractSearchResult<ScanlationGroupListItemData> {
	client: Client;
	params: UserFollowedGroupsQueryVariables;
	offset: number;
	limit: number;
	total: number;
	constructor(param: UserFollowedScanlationGroupResultConstructorParams) {
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
	params: UserFollowedGroupsQueryVariables
): Promise<AbstractSearchResult<ScanlationGroupListItemData>> {
	const result = await client
		.query(userFollowedGroupsGQL, {
			...params
		})
		.toPromise();
	if (result.data) {
		const data = result.data.follows.groups;
		return new UserFollowedScanlationGroupsResult({
			client,
			params,
			offset: data.offset,
			total: data.total,
			limit: data.limit,
			data: data.data.map<ScanlationGroupListItemData>((e) => {
				const eleader = e.relationships.leader;
				const leader = eleader
					? { id: eleader.id, name: eleader.attributes.username }
					: undefined;
				return {
					id: e.id,
					name: e.attributes.name,
					members: e.relationships.membersLen,
					leader,
					discord: e.attributes.discord ?? undefined,
					website: e.attributes.website ?? undefined
				};
			})
		});
	}
	if (result.error) {
		throw result.error;
	}
	throw new Error("No results??");
}
