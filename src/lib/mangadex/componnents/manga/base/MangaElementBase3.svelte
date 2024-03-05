<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Content from "./base3/Content.svelte";
	import Layout from "./base3/Layout.svelte";

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let coverImage: string;
	export let coverImageAlt: string;
	export let title: string;
</script>

<Layout>
	<img src={coverImage} alt={coverImageAlt} />
	<Content {title} />
</Layout>

<style lang="scss">
	img {
		width: 10em;
		height: 15em;
		object-fit: cover;
		border-radius: 0.25rem;
	}
</style>
