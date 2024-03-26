<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Content from "./Content.svelte";
	import Layout from "./Layout.svelte";
	import Image from "./Image.svelte";
	import type { Readable } from "svelte/store";
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";
	const dispatch = createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let coverImage: Readable<string | undefined>;
	export let coverImageAlt: string;
	export let title: string;
	$: cover = $coverImage;
</script>

<Layout
	--element-w="10em"
	--element-h="15em"
	on:click={({ detail }) => {
		dispatch("click", detail);
	}}
>
	{#if cover}
		<Image bind:coverImage={cover} {coverImageAlt} />
	{:else}
		<Skeleton width={"var(--element-w)"} height={"var(--element-h)"} />
	{/if}
	<Content {title} />
</Layout>
