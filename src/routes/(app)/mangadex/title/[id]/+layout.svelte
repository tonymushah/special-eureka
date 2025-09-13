<script lang="ts">
	import { type Snippet } from "svelte";
	import type { LayoutData } from "./$types";
	import ConflictLayout from "./ConflictLayout.svelte";
	import NoConflictLayout from "./NoConflictLayout.svelte";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";

	interface Props {
		data: LayoutData;
		children?: Snippet;
	}
	let { data, children }: Props = $props();
	let hasConflict = $derived.by(() => {
		const conflicts = data.conflicts;
		if (conflicts == null) {
			return false;
		}
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
	<AppTitle title="Title {data.layoutData.id} - MangaDex" />
	<ConflictLayout conflicts={data.conflicts} bind:ingnoreConflict />
{:else}
	<NoConflictLayout {data}>
		{@render children?.()}
	</NoConflictLayout>
{/if}
