import { graphql } from "@mangadex/gql";
import { createMutation, createQuery } from "@tanstack/svelte-query";
import { mangadexQueryClient } from "..";
import { client } from "@mangadex/gql/urql";
import { get } from "svelte/store";
import type { OfflineConfigInput } from "@mangadex/gql/graphql";

const query = graphql(`
	query offlineConfig {
		userOption {
			getOfflineConfig {
				dataDir
				mangasDir
				coversDir
				chaptersDir
			}
		}
	}
`);

const mutation = graphql(`
	mutation updateOfflineConfig($cfg: OfflineConfigInput!) {
		userOption {
			setOfflineConfig(cfg: $cfg) {
				dataDir
				mangasDir
				coversDir
				chaptersDir
			}
		}
	}
`);

export const queryStore = createQuery(() => (
	{
		queryKey: ["offline", "config"],
		async queryFn() {
			const res = await client.query(query, {});
			if (res.error) throw res.error;
			if (res.data) {
				return res.data;
			}
			throw new Error("No data or error");
		}
	}),
	() => mangadexQueryClient
);

async function updateCfg(cfg: OfflineConfigInput) {
	const res = await client.mutation(mutation, {
		cfg
	});
	if (res.error) throw res.error;
	if (res.data) {
		return res.data.userOption.setOfflineConfig;
	}
	throw new Error("No data or error");
}

export const mutationStore = createMutation(() => (
	{
		mutationKey: ["offline", "config", "mutation"],
		onSettled(data, error, variables, context) {
			queryStore.refetch();
		},
		mutationFn: updateCfg
	}),
	() => mangadexQueryClient
);
