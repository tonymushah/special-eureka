<script lang="ts">
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";
	import type { Readable } from "svelte/store";
	import Content from "./Content.svelte";
	import Image from "./Image.svelte";
	import Layout from "./Layout.svelte";
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
		mangaId: string;
	}

	let { coverImage, coverImageAlt, title, mangaId, onclick }: Props = $props();
</script>

<Layout --element-w="10em" --element-h="15em" {onclick} {mangaId}>
	{#if $coverImage}
		<Image coverImage={$coverImage} {coverImageAlt} />
	{:else}
		<Skeleton width={"var(--element-w)"} height={"var(--element-h)"} />
	{/if}
	<Content {title} />
</Layout>
