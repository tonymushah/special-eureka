<script lang="ts">
	import Paragraph from "@mangadex/componnents/markdown/renderers/Paragraph.svelte";
	import ExtLink from "@mangadex/componnents/theme/links/ExtLink.svelte";
	import SvelteMarkdown from "svelte-markdown";
	import Heading from "./Heading.svelte";
	interface Props {
		description: string;
	}

	let { description }: Props = $props();
</script>

<div class="description">
	<SvelteMarkdown
		source={description}
		renderers={{
			link: ExtLink,
			paragraph: Paragraph,
			heading: Heading
		}}
	/>
</div>

<style lang="scss">
	@media (width < 900px) {
		div.description {
			line-clamp: 2;
			-webkit-line-clamp: 2;
		}
	}
	@media (width >= 900px) {
		div.description {
			line-clamp: 3;
			-webkit-line-clamp: 3;
		}
	}
	div.description {
		font-size: 12px;
		-webkit-box-orient: vertical;
		display: -webkit-box;
		overflow: hidden;
		margin: 2px;
	}
</style>
