<script lang="ts">
	import type { ChapterEl1Events } from "@mangadex/componnents/chapter/base/element1/ChapterElement1.svelte";
	import { type ComponentProps } from "svelte";
	import VolumeAccordion from "./VolumeAccordion.svelte";

	interface Props extends ChapterEl1Events {
		volumes: ComponentProps<typeof VolumeAccordion>[];
		openStart?: boolean;
	}

	let { volumes: vs, openStart = false, ...events }: Props = $props();
	let volumes = $derived.by(() =>
		vs.filter((v) => v.volumeContent.flatMap((d) => d.chapters).length != 0)
	);
</script>

<div class="volumes">
	{#each volumes as volume, l}
		<VolumeAccordion isOpen={l == 0 && openStart} {...volume} {...events} />
	{:else}
		<div class="loading">Still loading</div>
	{/each}
</div>

<style lang="scss">
</style>
