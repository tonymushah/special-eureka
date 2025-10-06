<script lang="ts">
	import { hasConflicts } from "@mangadex/utils/conflicts";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import ConflictLayout from "./ConflictLayout.svelte";
	import NoConflictLayout from "./NoConflictLayout.svelte";
	import type { LayoutData } from "./layout.context";
	import type { Snippet } from "svelte";

	interface Props {
		children?: Snippet;
		data: LayoutData;
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
