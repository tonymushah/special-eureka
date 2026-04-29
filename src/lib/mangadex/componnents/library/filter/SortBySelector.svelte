<script lang="ts">
	import SortSelector from "@mangadex/componnents/manga/list/sortSelector/SortSelector.svelte";
	import type { UserLibrarySectionParam } from "@mangadex/gql/graphql";
	interface Props {
		params: UserLibrarySectionParam;
	}

	let { params = $bindable() }: Props = $props();
</script>

<section>
	<p>Sort by:</p>
	<SortSelector
		bind:sort={
			() => {
				return params.order ?? undefined;
			},
			(order) => {
				params.order = order;
			}
		}
	/>
</section>

<style lang="scss">
	section {
		display: flex;
		align-items: center;
		gap: 10px;
		p {
			margin: 0px;
		}
	}
</style>
