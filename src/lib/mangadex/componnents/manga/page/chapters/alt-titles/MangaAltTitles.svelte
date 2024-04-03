<script lang="ts" context="module">
	import type { Language } from "@mangadex/gql/graphql";

	export type AltTitleItem = {
		locale: Language;
		title: string;
	};
</script>

<script lang="ts">
	import AltTitle from "./AltTitle.svelte";

	export let titles: AltTitleItem[];
</script>

<div class="alt-titles">
	{#each titles as { title, locale } (title)}
		<AltTitle bind:title bind:locale />
	{/each}
</div>

<style lang="scss">
	.alt-titles {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
</style>
