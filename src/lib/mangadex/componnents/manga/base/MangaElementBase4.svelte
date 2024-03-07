<script lang="ts">
	import Layout from "./base4/Layout.svelte";
	import Content from "./base4/Content.svelte";
	import { createEventDispatcher } from "svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let coverImage: string;
	export let coverImageAlt: string;
	export let title: string;
</script>

<Layout on:click>
	<img src={coverImage} alt={coverImageAlt} />
	<Content {title} />
</Layout>

<style lang="scss">
	img {
		width: 9.5em;
		height: 12.5em;
		object-fit: cover;
		border-radius: 0.25rem;
	}
</style>
