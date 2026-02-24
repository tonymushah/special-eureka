import { downloadCoversLocalyGQLDoc } from "@mangadex/gql-docs/cover/local-download";
import { client } from "@mangadex/gql/urql";
import { createMutation } from "@tanstack/svelte-query";

export function downloadCoversLocally() {
	return createMutation(() => ({
		mutationKey: ["download", "covers"],
		async mutationFn(ids: string[]) {
			const res = await client.mutation(downloadCoversLocalyGQLDoc, {
				ids
			});
			if (res.error) {
				throw res.error;
			}
		}
	}));
}
