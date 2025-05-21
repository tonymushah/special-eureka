<script lang="ts">
	import { type Snippet } from "svelte";
	import type { LayoutData } from "./$types";
	import ConflictLayout from "./ConflictLayout.svelte";
	import NoConflictLayout from "./NoConflictLayout.svelte";

	interface Props {
		data: LayoutData;
		children?: Snippet;
	}
	let { data, children }: Props = $props();
	let hasConflict = $derived.by(() => {
		const conflicts = data.conflicts;
		if (
			conflicts.contentRating != undefined ||
			conflicts.originalLanguage != undefined ||
			conflicts.publicationDemographic != undefined ||
			conflicts.status != undefined ||
			conflicts.tags.length != 0
		) {
			return true;
		} else {
			return false;
		}
	});
	let ingnoreConflict = $state(false);
</script>

{#if hasConflict && !ingnoreConflict}
	<ConflictLayout conflicts={data.conflicts} bind:ingnoreConflict />
{:else}
	<NoConflictLayout {data} {children} />
{/if}
