<script lang="ts">
	import SvelteMarkdown from "svelte-markdown";
	import ExtLink from "../theme/links/ExtLink.svelte";
	export let source: string;
</script>

<SvelteMarkdown
	{source}
	renderers={{
		link: ExtLink
	}}
/>
