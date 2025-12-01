import { onlyScanlationGroupNameGQLDoc } from "@mangadex/gql-docs/group/only-name";
import { createQuery, QueryClient, type Accessor } from "@tanstack/svelte-query";
import { Client } from "@urql/svelte";

type ScanlationOnlyNamesParam = {
	groupsId: Accessor<string[]>;
	client: Client;
	queryClient?: Accessor<QueryClient>;
	enabled?: Accessor<boolean>;
};

export const onlyGroupNames = ({
	groupsId,
	client,
	queryClient,
	enabled
}: ScanlationOnlyNamesParam) =>
	createQuery(
		() => ({
			queryKey: ["scanlation", "groups", "only-name", ...groupsId()],
			async queryFn() {
				const res = await client
					.query(onlyScanlationGroupNameGQLDoc, {
						scanGroupsId: groupsId()
					})
					.toPromise();
				if (res.data) {
					return res.data.scanlationGroup.list.data;
				} else if (res.error) {
					throw res.error;
				} else {
					throw new Error("no data??");
				}
			},
			enabled: enabled?.()
		}),
		queryClient
	);
