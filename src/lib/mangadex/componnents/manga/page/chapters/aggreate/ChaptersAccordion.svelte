<script lang="ts">
	import ChapterElement1 from "@mangadex/componnents/chapter/base/element1/ChapterElement1.svelte";
	import Accordion from "@mangadex/componnents/theme/accordion/Accordion.svelte";
	import { createEventDispatcher, type ComponentProps } from "svelte";

	export let title: string;
	export let chapters: ComponentProps<ChapterElement1>[];

	type MouseEnvDiv = MouseEvent & {
		currentTarget: HTMLDivElement & EventTarget;
	};
	type KeyboardEnvDiv = KeyboardEvent & {
		currentTarget: HTMLDivElement & EventTarget;
	};
	const dispatch = createEventDispatcher<{
		download: MouseEnvDiv & {
			id: string;
		};
		downloadKeyPress: KeyboardEnvDiv & {
			id: string;
		};
		read: MouseEnvDiv & {
			id: string;
		};
		readKeyPress: KeyboardEnvDiv & {
			id: string;
		};
	}>();
	$: isSingle = chapters.length == 1;
</script>

{#if isSingle}
	<ChapterElement1
		{...chapters[0]}
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
	/>
{:else}
	<Accordion {title} titleBorder>
		<div class="chapters">
			{#each chapters as chapter (chapter.id)}
				<ChapterElement1
					{...chapter}
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
				/>
			{/each}
		</div>
	</Accordion>
{/if}

<style lang="scss">
	.chapters {
		padding-top: 5px;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
</style>
