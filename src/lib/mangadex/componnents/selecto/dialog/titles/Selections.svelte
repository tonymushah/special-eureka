<!-- TODO add cache -->

<script lang="ts">
	import StatusBadgeOnlyLabel from "@mangadex/componnents/theme/tag/StatusBadgeOnlyLabel.svelte";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import { createQuery, type CreateQueryOptions } from "@tanstack/svelte-query";
	import { getContextClient } from "@urql/svelte";
	import { query } from "./selections/query";

	interface Props {
		titles: string[];
	}
	let { titles = $bindable([]) }: Props = $props();
	const client = getContextClient();
	const selectedTitles = createQuery(() => {
		return {
			queryKey: ["selecto", "titles", "fetch"],
			staleTime: 0,
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
						title: get_value_from_title_and_random_if_undefined(e.attributes.title, "en") ?? e.id
					}));
				} else {
					throw new Error("No data");
				}
			},
			enabled: titles.length > 0
		} satisfies CreateQueryOptions<
			{
				id: string;
				title: string;
			}[]
		>;
	});
	let titlesData = $derived.by(() => {
		const data = new Map<string, string>(selectedTitles.data?.map((o) => [o.id, o.title]));
		return titles
			.map((id) => {
				const aaa = data.get(id);
				if (aaa) {
					return {
						id,
						title: aaa
					};
				}
			})
			.filter((a) => a != undefined);
	});
	function removeSelection(id: string) {
		titles = titles.filter((v) => v != id);
	}
</script>

{#snippet showIDsOnly()}
	{#each titles as title}
		<StatusBadgeOnlyLabel
			label={title}
			color="gray"
			onclick={() => {
				removeSelection(title);
			}}
		/>
	{/each}
{/snippet}

<div class="layout">
	<p class="help">Click on the badge to remove the title from the selection</p>
	<div class="wrapper">
		<!-- <p class="test">clasdadsadads</p> -->
		<div class="titles-selected">
			{#if selectedTitles.isSuccess}
				{@const _titles = titlesData}
				{#each _titles as title}
					<StatusBadgeOnlyLabel
						label={title.title}
						color="blue"
						onclick={() => {
							removeSelection(title.id);
						}}
					/>
				{:else}
					{@render showIDsOnly()}
				{/each}
			{:else}
				{@render showIDsOnly()}
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.layout {
		display: flex;
		width: 100%;
		height: 100%;
		flex-direction: column;
	}
	.wrapper {
		display: grid;
		overflow-y: auto;
		flex-grow: 1;
	}
	.titles-selected {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		padding-bottom: 10px;
		/* flex-grow: 0; */
	}
	.help {
		margin: 4px 0px;
		display: flex;
	}
</style>
