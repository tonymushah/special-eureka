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
	export let coverImage: string;
	export let coverImageAlt: string;
	export let title: string;
	export let status: MangaStatus;
	export let description: string;
</script>

<Layout on:click --layout-width="19em">
	<Image {coverImage} {coverImageAlt} />
	<Content {title} {status} {description} />
</Layout>
