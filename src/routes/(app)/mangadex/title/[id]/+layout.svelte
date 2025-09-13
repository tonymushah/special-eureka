<script lang="ts">
	import { type Snippet } from "svelte";
	import type { LayoutData } from "./$types";
	import ConflictLayout from "./ConflictLayout.svelte";
	import NoConflictLayout from "./NoConflictLayout.svelte";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import { hasConflicts } from "@mangadex/utils/conflicts";

	interface Props {
		data: LayoutData;
		children?: Snippet;
	}
	let { data, children }: Props = $props();
	let hasConflict = $derived.by(() => hasConflicts(data.conflicts));
	let ingnoreConflict = $state(false);
</script>

{#if hasConflict && !ingnoreConflict && data.conflicts}
	<AppTitle title="Title {data.layoutData.id} - MangaDex" />
	<ConflictLayout conflicts={data.conflicts} bind:ingnoreConflict />
{:else}
	<NoConflictLayout {data}>
		{@render children?.()}
	</NoConflictLayout>
{/if}
