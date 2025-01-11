import { graphql } from "@mangadex/gql/exports";
import type { AuthorSearchFetcher, AuthorSearchFetcherResultData } from ".";
import type { Tag } from "@melt-ui/svelte";
import type { Client } from "@urql/svelte";
import { client as mangadexClient } from "@mangadex/gql/urql";

export const query = graphql(`
	query authorSearchFetcher($name: String!, $offset: Int! = 0, $limit: Int! = 10) {
		author {
			list(params: { name: $name, offset: $offset, limit: $limit }) {
				data {
					id
					attributes {
						name
					}
				}
				offset
				limit
				total
			}
		}
	}
`);

export type GQLAuthorFetcherParams = {
	name: string;
	offset: number;
	limit: number;
	total: number;
};

export class GQLAuthorFetcherResultData implements AuthorSearchFetcherResultData {
	data: Tag[];
	client: Client;
	params: GQLAuthorFetcherParams;
	constructor(data: Tag[], params: GQLAuthorFetcherParams, client: Client = mangadexClient) {
		this.data = data;
		this.params = params;
		this.client = client;
	}
	private nextParams(): GQLAuthorFetcherParams {
		return {
			...this.params,
			offset: this.params.offset + this.params.limit
		};
	}
	hasNext(): boolean {
		return this.params.offset < this.params.total && this.params.offset >= 0;
	}
	async next(): Promise<AuthorSearchFetcherResultData> {
		const res = await this.client
			.query(query, {
				name: this.params.name,
				offset: this.params.offset + this.params.limit,
				limit: this.params.limit
			})
			.toPromise();
		if (res.error) {
			throw res.error;
		}
		if (res.data) {
			const data = res.data;
			return new GQLAuthorFetcherResultData(
				data.author.list.data.map((v) => ({
					id: v.id,
					value: v.attributes.name
				})),
				this.nextParams()
			);
		} else {
			throw new Error("No data and no erro, what is happening??");
		}
	}
}

const gqlAuthorFetcher: AuthorSearchFetcher = async function (name: string) {
	const res = await mangadexClient
		.query(query, {
			name
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	}
	if (res.data) {
		const data = res.data;
		return new GQLAuthorFetcherResultData(
			data.author.list.data.map((v) => ({
				id: v.id,
				value: v.attributes.name
			})),
			{
				name,
				offset: data.author.list.offset,
				limit: data.author.list.limit,
				total: data.author.list.total
			}
		);
	} else {
		throw new Error("No data and no erro, what is happening??");
	}
};

export default gqlAuthorFetcher;
