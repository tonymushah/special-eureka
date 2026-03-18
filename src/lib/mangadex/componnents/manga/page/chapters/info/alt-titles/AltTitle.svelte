<script lang="ts">
	import FlagIcon from "@mangadex/componnents/FlagIcon.svelte";
	import type { Language } from "@mangadex/gql/graphql";
	import { getContextClient } from "@urql/svelte";
	import { createQuery } from "@tanstack/svelte-query";
	import { getLanguageFromStrQuery } from "@mangadex/gql-docs/getLanguageFromStr";

	interface Props {
		lang: string;
		title: string;
	}

	let client = getContextClient();
	let { lang: langstr, title }: Props = $props();
	let query = createQuery(() => ({
		queryKey: ["getLanguageFromStrQuery", langstr],
		staleTime: 30 * 60 * 60,
		async queryFn() {
			const res = await client.query(getLanguageFromStrQuery, { lang: langstr }).toPromise();
			if (res.error) {
				throw res.error;
			} else if (res.data) {
				return res.data.utils.strToLanguage;
			} else {
				throw new Error("no data??");
			}
		}
	}));
</script>

<div class="alt-title">
	{#if query.isSuccess}
		<div class="flag">
			<FlagIcon lang={query.data} />
		</div>
	{/if}
	<h4>{title}</h4>
</div>

<style lang="scss">
	.alt-title {
		display: flex;
		flex-direction: row;
		gap: 5px;
		align-items: center;
		h4 {
			margin: 0px;
			font-weight: 500;
		}
	}
</style>
