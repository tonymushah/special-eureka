<script lang="ts">
	import SvelteMarkdown from "@humanspeak/svelte-markdown";
	import ExtLink from "../theme/links/ExtLink.svelte";
	import Paragraph from "./renderers/Paragraph.svelte";
	import Table from "./renderers/Table.svelte";
	interface Props {
		source: string;
	}

	let { source }: Props = $props();
</script>

<SvelteMarkdown
	{source}
	renderers={{
		link: ExtLink,
		paragraph: Paragraph,
		table: Table
	}}
/>
