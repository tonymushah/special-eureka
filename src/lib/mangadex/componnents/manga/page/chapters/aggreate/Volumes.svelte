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
			on:comments={({ detail }) => {
				dispatch("comments", detail);
			}}
			on:commentsKeyPress={({ detail }) => {
				dispatch("commentsKeyPress", detail);
			}}
		/>
	{:else}
		<div class="loading">Still loading</div>
	{/each}
</div>

<style lang="scss">
</style>
