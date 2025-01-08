<script lang="ts">
	import { createEventDispatcher, type ComponentProps } from "svelte";
	import Chapters from "./ChaptersAccordion.svelte";
	import Accordion from "@mangadex/componnents/theme/accordion/Accordion.svelte";
	import { createChapterEl1EventDispatcher } from "@mangadex/componnents/chapter/base/element1/ChapterElement1.svelte";

	interface Props {
		title: string;
		volumeContent: ComponentProps<Chapters>[];
		isOpen?: boolean;
	}

	let { title, volumeContent, isOpen = false }: Props = $props();
	type MouseEnvDiv = MouseEvent & {
		currentTarget: HTMLDivElement & EventTarget;
	};
	type KeyboardEnvDiv = KeyboardEvent & {
		currentTarget: HTMLDivElement & EventTarget;
	};
	const dispatch = createChapterEl1EventDispatcher();
</script>

<Accordion {title} titleBorder {isOpen}>
	<div class="volume">
		{#each volumeContent as chapters (chapters.title)}
			<Chapters
				{isOpen}
				{...chapters}
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
			<p>Still loading...</p>
		{/each}
	</div>
</Accordion>

<style lang="scss">
	.volume {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 5px;
	}
</style>
