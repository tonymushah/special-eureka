<script lang="ts">
	import Layout from "./base4/Layout.svelte";
	import Content from "./base4/Content.svelte";
	import { createEventDispatcher } from "svelte";
	import CoverImage from "./base4/CoverImage.svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let coverImage: string;
	export let coverImageAlt: string;
	export let title: string;
</script>

<Layout on:click --w-base={"9.5em"} --img-h={"12.5em"}>
	<CoverImage {coverImage} {coverImageAlt} />
	<Content {title} />
</Layout>
