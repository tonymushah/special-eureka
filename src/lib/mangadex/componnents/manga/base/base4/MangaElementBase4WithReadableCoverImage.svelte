<script lang="ts">
	import Layout from "./Layout.svelte";
	import Content from "./Content.svelte";
	import { createEventDispatcher } from "svelte";
	import CoverImage from "./CoverImage.svelte";
	import type { Readable } from "svelte/store";
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let coverImage: Readable<string | undefined>;
	export let coverImageAlt: string;
	export let title: string;
	$: coverImage_ = $coverImage;
</script>

<Layout on:click --w-base={"9.5em"} --img-h={"12.5em"}>
	{#if coverImage_}
		<CoverImage bind:coverImage={coverImage_} {coverImageAlt} />
	{:else}
		<Skeleton width={"var(--w-base)"} height={"var(--img-h)"} />
	{/if}
	<Content {title} />
</Layout>
