<script lang="ts">
	import { route } from "$lib/ROUTES";
	import Link from "@mangadex/componnents/theme/links/Link.svelte";
	import type { Author } from ".";

	export let authors: Author[];
</script>

<div class="authors">
	{#each authors as { id, name }, i (id)}
		<Link
			variant="base"
			href={route("/mangadex/author/[id]", {
				id
			})}
		>
			{name}
		</Link>
		{#if i < authors.length - 1}
			<span>,</span>
		{/if}
	{/each}
</div>

<style lang="scss">
	.authors {
		display: flex;
		align-items: start;
		gap: 5px;
		flex-wrap: wrap;
	}
</style>
