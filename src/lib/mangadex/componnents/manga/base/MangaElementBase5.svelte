<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Content from "./base5/Content.svelte";
	import Layout from "./base5/Layout.svelte";

	const dispatch = createEventDispatcher<{
		readClick: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
		moreInfoClick: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let coverImage: string;
	export let coverImageAlt: string;
	export let title: string;
	export let description: string;
	let isHover = false;
</script>

<Layout bind:isHover>
	<img src={coverImage} alt={coverImageAlt} />
	<Content {title} {description} {isHover} on:moreInfoClick on:readClick />
</Layout>

<style lang="scss">
	:root {
		--transition-duration: 500ms;
		--transition-timing-function: ease-in-out;
		--width: 16em;
		--height: 23em;
		--height-c: 24em;
	}
	img {
		width: var(--width);
		height: var(--height);
		object-fit: cover;
		border-radius: 0.25rem;
	}
</style>
