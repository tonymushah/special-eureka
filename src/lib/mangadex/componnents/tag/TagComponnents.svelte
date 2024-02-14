<script lang="ts">
	import is_tag_gore from "@mangadex/utils/tags/is_tag_gore";
	import is_tag_sexual_violence from "@mangadex/utils/tags/is_tag_sexual_violence";
	import { onMount } from "svelte";
	import TagComponnent from "./TagComponnent.svelte";
	import type { Tag } from "@mangadex/utils/types/Tag";

	export let tags: Tag[];
	let to_show: Tag[];
	onMount(() => {
		tags.sort((a) => {
			if (is_tag_gore(a.id)) {
				return 0;
			} else if (is_tag_sexual_violence(a.id)) {
				return -1;
			} else {
				return 1;
			}
		});
		to_show = tags;
	});
</script>

{#if to_show}
	{#each to_show as { id, name }}
		<TagComponnent {id} {name} />
	{/each}
{/if}
