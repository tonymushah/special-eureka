import type { InternUploadSessionCommitDataInput } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";
import { setCommitDataToInternalSessionMutationGQLDocs } from "../set-commit-data";

export function setInternalSessionCommitDataMutation() {
	return createMutation(
		() => ({
			mutationKey: ["send", "internal", "session", "commit", "data"],
			async mutationFn({
				sessionId,
				commitData,
				startRunner
			}: {
				sessionId: string;
				commitData: InternUploadSessionCommitDataInput;
				startRunner?: boolean;
			}) {
				const res = await client
					.mutation(setCommitDataToInternalSessionMutationGQLDocs, {
						sessionId,
						commitData,
						startRunner
					})
					.toPromise();
				if (res.error) {
					throw res.error;
				}
			}
		}),
		() => mangadexQueryClient
	);
}
