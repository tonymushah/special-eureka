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
	interface Props {
		coverImage: string;
		coverImageAlt: string;
		title: string;
	}

	let { coverImage, coverImageAlt, title }: Props = $props();
</script>

<Layout --element-w="10em" --element-h="15em">
	<Image {coverImage} {coverImageAlt} />
	<Content {title} />
</Layout>
