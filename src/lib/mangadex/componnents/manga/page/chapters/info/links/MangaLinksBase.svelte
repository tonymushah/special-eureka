<script lang="ts" context="module">
	import type { Readable } from "svelte/store";

	export type LinkItem = {
		title: string;
		href: string;
		icon: Readable<string | undefined>;
	};
</script>

<script lang="ts">
	import MangaLinkButton from "./MangaLinkButton.svelte";

	export let title: string;
	export let items: LinkItem[];
</script>

<div class="outer">
	<h4>{title}</h4>
	<div class="inner">
		{#each items as { title, href, icon } (href)}
			<MangaLinkButton {title} {href} {icon} />
		{/each}
	</div>
</div>

<style lang="scss">
	h4 {
		margin: 0px;
		padding: 0px;
	}
	.outer {
		display: flex;
		flex-direction: column;
		.inner {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 5px;
		}
	}
</style>
