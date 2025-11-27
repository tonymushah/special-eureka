import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";
import { createSessionMutationGQLDocs } from "../create-session";

export function createSessionMutation() {
	return createMutation(
		() => ({
			mutationKey: ["create", "internal", "upload", "session"],
			async mutationFn({ groups, mangaId }: { groups?: string[]; mangaId: string }) {
				const res = await client
					.mutation(createSessionMutationGQLDocs, {
						groups,
						mangaId
					})
					.toPromise();
				if (res.data) {
					return res.data.upload.internal.createSession as string;
				} else if (res.error) {
					throw res.error;
				} else {
					throw new Error("no data??");
				}
			}
		}),
		() => mangadexQueryClient
	);
}
