<script lang="ts">
	import { createQuery, type CreateQueryOptions } from "@tanstack/svelte-query";
	import { getContextClient } from "@urql/svelte";
	import { derived as der, toStore } from "svelte/store";
	import { query } from "./selections/query";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import StatusBadgeOnlyLabel from "@mangadex/componnents/theme/tag/StatusBadgeOnlyLabel.svelte";

	interface Props {
		titles: string[];
	}
	let { titles = $bindable([]) }: Props = $props();
	const d = toStore(() => titles);
	const client = getContextClient();
	const selectedTitles = createQuery(
		der([d], ([titles]) => {
			return {
				queryKey: ["get", "title", "titles", ...titles],

				async queryFn(): Promise<{ id: string; title: string }[]> {
					const res = await client
						.query(query, {
							titles
						})
						.toPromise();
					if (res.error) {
						throw res.error;
					} else if (res.data) {
						return res.data.manga.list.data.map((e) => ({
							id: e.id,
							title:
								get_value_from_title_and_random_if_undefined(
									e.attributes.title,
									"en"
								) ?? e.id
						}));
					} else {
						throw new Error("No data");
					}
				}
			} satisfies CreateQueryOptions<
				{
					id: string;
					title: string;
				}[]
			>;
		})
	);
	function removeSelection(id: string) {
		titles = titles.filter((v) => v != id);
	}
</script>

<p>Click on the badge to remove it from the selection</p>
<div class="titles-selected">
	{#if $selectedTitles.data && !$selectedTitles.isFetching}
		{@const _titles = $selectedTitles.data}
		{#each _titles as title}
			<StatusBadgeOnlyLabel
				label={title.title}
				color="blue"
				onclick={() => {
					removeSelection(title.id);
				}}
			/>
		{:else}
			{#each titles as title}
				<StatusBadgeOnlyLabel
					label={title}
					color="gray"
					onclick={() => {
						removeSelection(title);
					}}
				/>
			{/each}
		{/each}
	{:else}
		{#each titles as title}
			<StatusBadgeOnlyLabel
				label={title}
				color="gray"
				onclick={() => {
					removeSelection(title);
				}}
			/>
		{/each}
	{/if}
</div>

<style lang="scss">
	.titles-selected {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	p {
		margin: 4px 0px;
	}
</style>
