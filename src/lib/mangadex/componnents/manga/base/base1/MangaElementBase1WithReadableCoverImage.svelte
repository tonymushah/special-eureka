<script lang="ts">
	import type { MangaStatus } from "@mangadex/gql/graphql";
	import { createEventDispatcher } from "svelte";
	import Content from "./Content.svelte";
	import Image from "./Image.svelte";
	import Layout from "./Layout.svelte";
	import { type Readable } from "svelte/store";
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";

	interface Events {
		onclick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLElement;
			}
		) => any;
	}
	interface Props extends Events {
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
		mangaId,
		onclick
	}: Props = $props();
	let src = $derived($coverImage);
</script>

<Layout {onclick} --layout-width={withFull ? "100%" : "19em"} {mangaId}>
	{#if src}
		<Image coverImage={src} {coverImageAlt} />
	{:else}
		<Skeleton width="100px" height="160px" />
	{/if}
	<Content {title} {status} {description} />
</Layout>
