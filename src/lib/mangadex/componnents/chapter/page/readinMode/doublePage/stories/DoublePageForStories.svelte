<script lang="ts">
	import { initChapterImageContext } from "../../../contexts/images";
	import { ReadingDirection, readingDirection } from "../../../stores/readingDirection";
	import Page from "../DoublePage.svelte";
	export let images: string[];
	initChapterImageContext(images);
</script>

<p>
	Current mode:
	<span>
		{#if $readingDirection == ReadingDirection.Ltr}
			Left to Right
		{:else}
			Right to Left
		{/if}
	</span>
</p>

<button
	on:click={() => {
		switch ($readingDirection) {
			case ReadingDirection.Ltr:
				readingDirection.set(ReadingDirection.Rtl);
				break;
			case ReadingDirection.Rtl:
				readingDirection.set(ReadingDirection.Ltr);
				break;
			default:
				break;
		}
	}}>switch mode</button
>

<Page />
