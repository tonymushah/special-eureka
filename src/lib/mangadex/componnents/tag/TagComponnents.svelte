<script lang="ts">
	import is_tag_danger from "@mangadex/utils/tags/is_tag_danger";
	import { onMount } from "svelte";
	import TagComponnent from "./TagComponnent.svelte";

	type Tag = {
		id: string;
		name: string;
	};
	export let tags: Tag[];
	let to_show: Tag[];
	onMount(() => {
		tags.sort((a) => {
			if (is_tag_danger(a.id)) {
				return -1;
			} else {
				return 0;
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
