<script lang="ts" context="module">
	import type { AltTitleItem } from "./info/alt-titles/MangaAltTitles.svelte";
	import type { LinkItem } from "./info/links/MangaLinksBase.svelte";
	import type { TitlePButtonItem } from "./info/title-buttons/TitlePButton.svelte";

	export type IdKeyedItem<T> = {
		key: T;
		title: string;
		items: TitlePButtonItem[];
	};
	export type MangaLinksItem = {
		title: string;
		items: LinkItem[];
	};
</script>

<script lang="ts" generics="T">
	import { createEventDispatcher } from "svelte";
	import MangaLinksBase from "./info/links/MangaLinksBase.svelte";
	import TitlePButton from "./info/title-buttons/TitlePButton.svelte";
	import MangaAltTitles from "./info/alt-titles/MangaAltTitles.svelte";
	const dispatch = createEventDispatcher<{
		titlePButton: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
			id: string;
			key: T;
		};
	}>();
	export let idsKeysItem: IdKeyedItem<T>[];
	export let links: MangaLinksItem[];
	export let altTitles: AltTitleItem[];
	export let altTitlesBoxTitle: string = "Alternative Titles";
</script>

<div class="infos">
	<slot name="top" />
	<div class="flex-row">
		{#each idsKeysItem as { key, title, items } (key)}
			<TitlePButton
				{title}
				{items}
				{key}
				on:click={({ detail }) => {
					dispatch("titlePButton", detail);
				}}
			/>
		{/each}
	</div>
	<div class="flex-row">
		{#each links as { title, items } (title)}
			<MangaLinksBase {title} {items} />
		{/each}
	</div>
	<div class="alt-titles-outer">
		<h4>{altTitlesBoxTitle}</h4>
		<MangaAltTitles bind:titles={altTitles} />
	</div>
	<slot />
</div>

<style lang="scss">
	.infos {
		display: flex;
		flex-direction: column;
		gap: 5px;
		.flex-row {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 10px;
		}
		.alt-titles-outer {
			h4 {
				margin: 0px;
			}
		}
	}
</style>
