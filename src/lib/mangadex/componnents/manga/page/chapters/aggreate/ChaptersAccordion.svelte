<script lang="ts">
	import ChapterElement1, {
		createChapterEl1EventDispatcher
	} from "@mangadex/componnents/chapter/base/element1/ChapterElement1.svelte";
	import Accordion from "@mangadex/componnents/theme/accordion/Accordion.svelte";
	import { createEventDispatcher, type ComponentProps } from "svelte";

	export let title: string;
	export let chapters: ComponentProps<ChapterElement1>[];
	export let isOpen: boolean = false;

	const dispatch = createChapterEl1EventDispatcher();
	$: isSingle = chapters.length == 1;
	$: isEmpty = chapters.length == 0;
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
