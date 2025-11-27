import { getMangaTitleOnlyQuery } from "@mangadex/gql-docs/title/id/title-only";
import { createQuery, QueryClient, type Accessor } from "@tanstack/svelte-query";
import type { Client } from "@urql/svelte";

type TitleOnlyQuery = {
	mangaId: Accessor<string>;
	client: Client;
	enabled?: Accessor<boolean>;
	queryClient?: Accessor<QueryClient>;
};

export const titleOnlyQuery = ({ mangaId, client, enabled, queryClient }: TitleOnlyQuery) =>
	createQuery(
		() => ({
			queryKey: ["manga", mangaId(), "title-only"],
			async queryFn() {
				const res = await client
					.query(getMangaTitleOnlyQuery, {
						mangaId: mangaId()
					})
					.toPromise();
				if (res.data) {
					return res.data.manga.get.attributes.title as Record<string, string>;
				} else if (res.error) {
					throw res.error;
				} else {
					throw new Error("no data");
				}
			},
			enabled: enabled?.()
		}),
		queryClient
	);
