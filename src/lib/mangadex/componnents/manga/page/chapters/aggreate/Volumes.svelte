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
		<div class="loading">Still loading or empty</div>
	{/each}
</div>

<style lang="scss">
	.loading {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 200px;
		border: 3px solid var(--mid-tone);
		border-radius: 6px;
	}
</style>
