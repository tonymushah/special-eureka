<script lang="ts">
	import ChapterElement1, {
		createChapterEl1EventDispatcher
	} from "@mangadex/componnents/chapter/base/element1/ChapterElement1.svelte";
	import Accordion from "@mangadex/componnents/theme/accordion/Accordion.svelte";
	import { createEventDispatcher, type ComponentProps } from "svelte";

	interface Props {
		title: string;
		chapters: ComponentProps<typeof ChapterElement1>[];
		isOpen?: boolean;
	}

	let { title, chapters, isOpen = false }: Props = $props();

	const dispatch = createChapterEl1EventDispatcher();
	let isSingle = $derived(chapters.length == 1);
	let isEmpty = $derived(chapters.length == 0);
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
{:else if !isEmpty}
	<div class="some-margin">
		<Accordion {title} titleBorder {isOpen}>
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
				{/each}
			</div>
		</Accordion>
	</div>
{/if}

<style lang="scss">
	.chapters {
		padding-top: 5px;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
	.some-margin {
		margin: 5px;
	}
</style>
