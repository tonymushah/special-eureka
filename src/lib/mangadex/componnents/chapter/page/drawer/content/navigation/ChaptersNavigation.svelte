<script lang="ts">
	import { hasRelatedChapters } from "../../../contexts/relatedChapters";
	import ChapterSelect from "./chapters-navigation/ChapterSelect.svelte";
	import PreviousNext from "./chapters-navigation/PreviousNext.svelte";
	const hasRelated = hasRelatedChapters();
</script>

{#if !$hasRelated}
	<div class="layout">
		<PreviousNext>
			<div class="select">
				<ChapterSelect />
			</div>
		</PreviousNext>
	</div>
{/if}

<style lang="scss">
	.layout {
		display: flex;
		flex-direction: row;
		gap: 5px;
		.select {
			flex: 3;
		}
	}
</style>
