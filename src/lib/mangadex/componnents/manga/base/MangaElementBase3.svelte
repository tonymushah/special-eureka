<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Content from "./base3/Content.svelte";
	import Layout from "./base3/Layout.svelte";
	import Image from "./base3/Image.svelte";
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
	<Image {coverImage} {coverImageAlt} />
	<Content {title} />
</Layout>

<style lang="scss">
	:root {
		--element-w: 10em;
		--element-h: 15em;
	}
</style>
