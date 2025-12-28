<script lang="ts">
	import type { ChapterEl1Events } from "@mangadex/componnents/chapter/base/element1/ChapterElement1.svelte";
	import Accordion from "@mangadex/componnents/theme/accordion/Accordion.svelte";
	import { type ComponentProps } from "svelte";
	import Chapters from "./ChaptersAccordion.svelte";

	interface Props extends ChapterEl1Events {
		title: string;
		volumeContent: ComponentProps<typeof Chapters>[];
		isOpen?: boolean;
	}

	let { title, volumeContent, isOpen = false, ...events }: Props = $props();
</script>

<Accordion {title} titleBorder {isOpen}>
	<div class="volume">
		{#each volumeContent as chapters (chapters.title)}
			<Chapters {isOpen} {...chapters} {...events} />
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
