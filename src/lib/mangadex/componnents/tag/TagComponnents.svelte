<script lang="ts">
	import is_tag_danger from "@mangadex/utils/is_tag_danger";
	import { onMount } from "svelte";
	import TagComponnent from "./TagComponnent.svelte";

	type Tag = {
		id: string;
		name: string;
	};
	export let tags: Tag[];
	onMount(() => {
		tags.sort((a) => {
			if (is_tag_danger(a.id)) {
				return -1;
			} else {
				return 0;
			}
		});
		tags = tags;
	});
</script>

{#each tags as { id, name }}
	<TagComponnent {id} {name} />
{/each}
