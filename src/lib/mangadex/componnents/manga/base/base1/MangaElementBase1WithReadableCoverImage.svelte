<script lang="ts">
	import type { MangaStatus } from "@mangadex/gql/graphql";
	import { createEventDispatcher } from "svelte";
	import Content from "./Content.svelte";
	import Image from "./Image.svelte";
	import Layout from "./Layout.svelte";
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
	export let status: MangaStatus;
	export let description: string;
	export let withFull = false;
	$: src = $coverImage;
</script>

<Layout on:click --layout-width={withFull ? "100%" : "19em"}>
	{#if src}
		<Image bind:coverImage={src} {coverImageAlt} />
	{:else}
		<Skeleton width="100px" height="160px" />
	{/if}
	<Content {title} {status} {description} />
</Layout>
