<script lang="ts">
	import type { MangaStatus } from "@mangadex/gql/graphql";
	import { createEventDispatcher } from "svelte";
	import Content from "./base1/Content.svelte";
	import Image from "./base1/Image.svelte";
	import Layout from "./base1/Layout.svelte";
	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	interface Props {
		coverImage: string;
		coverImageAlt: string;
		title: string;
		status: MangaStatus;
		description: string;
		withFull?: boolean;
	}

	let {
		coverImage,
		coverImageAlt,
		title,
		status,
		description,
		withFull = false
	}: Props = $props();
</script>

<Layout on:click --layout-width={withFull ? "100%" : "19em"}>
	<Image {coverImage} {coverImageAlt} />
	<Content {title} {status} {description} />
</Layout>
