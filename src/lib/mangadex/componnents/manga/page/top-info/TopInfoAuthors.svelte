<script lang="ts">
	import { route } from "$lib/ROUTES";
	import Link from "@mangadex/componnents/theme/links/Link.svelte";
	import type { Author } from ".";

	export let authors: Author[];
</script>

<div class="authors">
	{#each authors as { id, name }, i (id)}
		<span class="author">
			<Link
				variant="base"
				href={route("/mangadex/author/[id]", {
					id
				})}
				ext_href={`https://mangadex.org/author/${id}`}>{name}</Link
			>
			{#if i < authors.length - 1}
				<span>,</span>
			{/if}
		</span>
	{/each}
</div>

<style lang="scss">
	.authors {
		display: flex;
		align-items: start;
		gap: 5px;
		flex-wrap: wrap;
		.author {
			display: flex;
		}
	}
</style>
