<script lang="ts">
	import Layout from "./base4/Layout.svelte";
	import Content from "./base4/Content.svelte";
	import CoverImage from "./base4/CoverImage.svelte";

	interface Events {
		onclick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLElement;
			}
		) => any;
	}

	interface Props extends Events {
		coverImage: string;
		coverImageAlt: string;
		title: string;
		mangaId: string;
	}

	let { coverImage, coverImageAlt, title, mangaId, onclick }: Props = $props();
</script>

<Layout {onclick} --w-base={"9.5em"} --img-h={"12.5em"} {mangaId}>
	<CoverImage {coverImage} {coverImageAlt} />
	<Content {title} />
</Layout>
