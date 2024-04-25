<script lang="ts">
	import { createEventDispatcher, type ComponentProps } from "svelte";
	import VolumeAccordion from "./VolumeAccordion.svelte";
	import { createChapterEl1EventDispatcher } from "@mangadex/componnents/chapter/base/element1/ChapterElement1.svelte";

	export let volumes: ComponentProps<VolumeAccordion>[];
	export let openStart = false;

	const dispatch = createChapterEl1EventDispatcher();
</script>

<div class="volumes">
	{#each volumes as volume, l}
		<VolumeAccordion
			isOpen={l == 0 && openStart}
			{...volume}
			on:download={({ detail }) => {
				dispatch("download", detail);
			}}
			on:downloadKeyPress={({ detail }) => {
				dispatch("downloadKeyPress", detail);
			}}
			on:read={({ detail }) => {
				dispatch("read", detail);
			}}
			on:readKeyPress={({ detail }) => {
				dispatch("readKeyPress", detail);
			}}
			on:remove={({ detail }) => {
				dispatch("remove", detail);
			}}
			on:removeKeyPress={({ detail }) => {
				dispatch("removeKeyPress", detail);
			}}
		/>
	{/each}
</div>

<style lang="scss">
</style>
