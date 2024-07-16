<script lang="ts">
	import { isDoublePage } from "@mangadex/componnents/chapter/page/contexts/currentChapterReadingMode";
	import DoublePageSelect from "./select-page/DoublePageSelect.svelte";
	import DefaultPageSelect from "./select-page/DefaultPageSelect.svelte";

	const doublePage = isDoublePage();
</script>

{#if $doublePage}
	<DoublePageSelect />
{:else}
	<DefaultPageSelect />
{/if}
