<script lang="ts">
	import SvelteMarkdown from "svelte-markdown";
	import ExtLink from "../theme/links/ExtLink.svelte";
	import Paragraph from "./renderers/Paragraph.svelte";
	interface Props {
		source: string;
	}

	let { source }: Props = $props();
</script>

<SvelteMarkdown
	{source}
	renderers={{
		link: ExtLink,
		paragraph: Paragraph
	}}
/>
