import type { InputMaybe, InternUploadSessionCommitDataInput } from "@mangadex/gql/graphql";
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
				let externalUrl: InputMaybe<string>;
				if (typeof commitData.externalUrl == "string" && commitData.externalUrl.length != 0) {
					externalUrl = commitData.externalUrl;
				} else {
					externalUrl = null;
				}
				const res = await client
					.mutation(setCommitDataToInternalSessionMutationGQLDocs, {
						sessionId,
						commitData: {
							...commitData,
							externalUrl
						},
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
