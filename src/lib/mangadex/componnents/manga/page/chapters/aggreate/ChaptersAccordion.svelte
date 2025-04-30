<script lang="ts">
	import ChapterElement1, {
		type ChapterEl1Events
	} from "@mangadex/componnents/chapter/base/element1/ChapterElement1.svelte";
	import Accordion from "@mangadex/componnents/theme/accordion/Accordion.svelte";
	import { type ComponentProps } from "svelte";

	interface Props extends ChapterEl1Events {
		title: string;
		chapters: ComponentProps<typeof ChapterElement1>[];
		isOpen?: boolean;
	}

	let { title, chapters, isOpen = false, ...events }: Props = $props();

	let isSingle = $derived(chapters.length == 1);
	let isEmpty = $derived(chapters.length == 0);
</script>

{#if isSingle}
	<ChapterElement1 {...chapters[0]} {...events} />
{:else if !isEmpty}
	<div class="some-margin">
		<Accordion {title} titleBorder {isOpen}>
			<div class="chapters">
				{#each chapters as chapter (chapter.id)}
					<ChapterElement1 {...chapter} {...events} />
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
