<script lang="ts">
	import type { MangaStatus } from "@mangadex/gql/graphql";
	import { createEventDispatcher } from "svelte";
	import Content from "./Content.svelte";
	import Image from "./Image.svelte";
	import Layout from "./Layout.svelte";
	import { type Readable } from "svelte/store";
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";
	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	interface Props {
		coverImage: Readable<string | undefined>;
		coverImageAlt: string;
		title: string;
		status: MangaStatus;
		description: string;
		withFull?: boolean;
		mangaId: string;
	}

	let {
		coverImage,
		coverImageAlt,
		title,
		status,
		description,
		withFull = false,
		mangaId
	}: Props = $props();
	let src = $derived($coverImage);
</script>

<Layout on:click --layout-width={withFull ? "100%" : "19em"} {mangaId}>
	{#if src}
		<Image coverImage={src} {coverImageAlt} />
	{:else}
		<Skeleton width="100px" height="160px" />
	{/if}
	<Content {title} {status} {description} />
</Layout>
