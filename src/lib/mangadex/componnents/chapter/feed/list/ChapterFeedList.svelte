<script lang="ts">
	/*
	 TODO implement selecto
	 */
	import ChapterFeedSelecto from "@mangadex/componnents/selecto/ChapterFeedSelecto.svelte";
	import MidToneLine from "@mangadex/componnents/theme/lines/MidToneLine.svelte";
	import { ChapterFeedStyle } from "@mangadex/gql/graphql";
	import { type Writable } from "svelte/store";
	import type { ChapterFeedListItem } from ".";
	import ChapterFeedElement2 from "../element2/ChapterFeedElement2.svelte";
	import ChapterFeedElement3 from "../element3/ChapterFeedElement3.svelte";
	import ChapterFeedListSelector from "./select/ChapterFeedListSelector.svelte";
	type MouseEnvDiv = MouseEvent & {
		currentTarget: HTMLDivElement & EventTarget;
	};
	type KeyboardEnvDiv = KeyboardEvent & {
		currentTarget: HTMLDivElement & EventTarget;
	};
	interface Events {
		ondownload?: (
			ev: MouseEnvDiv & {
				id: string;
			}
		) => any;
		ondownloadKeyPress?: (
			ev: KeyboardEnvDiv & {
				id: string;
			}
		) => any;
		onread?: (
			ev: MouseEnvDiv & {
				id: string;
			}
		) => any;
		onreadKeyPress?: (
			ev: KeyboardEnvDiv & {
				id: string;
			}
		) => any;
		onmangaClick?: (
			ev: MouseEnvDiv & {
				id: string;
			}
		) => any;
		onmangaKeyPress?: (
			ev: KeyboardEnvDiv & {
				id: string;
			}
		) => any;
		onremoveClick?: (
			ev: MouseEnvDiv & {
				id: string;
			}
		) => any;
		onremoveKeyPress?: (
			ev: KeyboardEnvDiv & {
				id: string;
			}
		) => any;
		oncomments?: (
			ev: MouseEnvDiv & {
				id: string;
			}
		) => any;
		oncommentsKeyPress?: (
			ev: KeyboardEnvDiv & {
				id: string;
			}
		) => any;
	}
	interface Props extends Events {
		list?: ChapterFeedListItem[];
		style: Writable<ChapterFeedStyle>;
		additionalContent?: import("svelte").Snippet;
	}

	let { list = [], style, additionalContent, ...eventsProps }: Props = $props();
	let coverfull = $derived($style == ChapterFeedStyle.CoverFull);
	let coverless = $derived($style == ChapterFeedStyle.CoverLess);
	let isEmpty = $derived(list.length == 0);
	let container: HTMLElement | undefined = $state();
	let selectedMangas: string[] = $state([]);
	let selectedChapters: string[] = $state([]);
</script>

<ChapterFeedSelecto bind:container bind:selectedChapters bind:selectedMangas />

<section>
	<div class="tab-title">
		<div class="tab-additional-content">
			{#if additionalContent}{@render additionalContent()}{:else}
				<span>:3</span>
			{/if}
		</div>
		<ChapterFeedListSelector {style} />
	</div>
	<MidToneLine />
	<section class="content" bind:this={container} class:coverfull class:coverless class:isEmpty>
		{#each list as item}
			{#if coverfull}
				<ChapterFeedElement2
					title={item.title}
					chapters={item.chapters}
					coverImage={item.coverImage}
					coverImageAlt={item.coverImageAlt}
					mangaLang={item.mangaLang}
					mangaId={item.mangaId}
					{...eventsProps}
				/>
			{:else if coverless}
				<ChapterFeedElement3
					title={item.title}
					chapters={item.chapters}
					mangaLang={item.mangaLang}
					mangaId={item.mangaId}
					{...eventsProps}
				/>
			{/if}
		{/each}
	</section>
</section>

<style lang="scss">
	div.tab-title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.content {
		display: grid;
		gap: 10px;
	}
	section {
		--chapter-layout: var(--accent-l3);
		--chapter-layout-hover: var(--accent-l3-hover);
		--chapter-layout-active: var(--accent-l3-active);
	}
</style>
