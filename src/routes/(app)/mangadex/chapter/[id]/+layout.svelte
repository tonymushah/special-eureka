<script lang="ts">
	import { onMount, type Snippet } from "svelte";
	import type { LayoutData } from "./$types";
	import NoConflictLayout from "./NoConflictLayout.svelte";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import { hasConflicts } from "@mangadex/utils/conflicts";
	import ConflictLayout from "@mangadex/routes/title/[id]/ConflictLayout.svelte";
	import { isDataSaver } from "@mangadex/stores/chapterQuality";
	import { noop } from "lodash";

	interface Props {
		data: LayoutData;
		children?: Snippet;
	}
	let { data, children }: Props = $props();
	let hasConflict = $derived.by(() => hasConflicts(data.conflicts));
	let ingnoreConflict = $state(false);
	onMount(() => isDataSaver.subscribe(noop));
</script>

{#if hasConflict && !ingnoreConflict && data.conflicts}
	<AppTitle title="Title {data.data.id} - MangaDex" />
	<ConflictLayout conflicts={data.conflicts} bind:ingnoreConflict />
{:else}
	<NoConflictLayout {data}>
		{@render children?.()}
	</NoConflictLayout>
{/if}
