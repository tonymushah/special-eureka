<script lang="ts">
	interface Props {
		volume?: string | null | undefined;
		chapter?: string | null | undefined;
	}

	let { volume = undefined, chapter = undefined }: Props = $props();
	let shouldShow =
		$derived((typeof volume == "string" && volume.length > 0) ||
		(typeof chapter == "string" && chapter.length > 0));
</script>

{#if shouldShow}
	<h4 class="latest-chapter">
		Last Chapter:
		{#if volume != null || volume != undefined}
			<span>Volume {volume}</span>
		{/if}
		{#if chapter != null || chapter != undefined}
			Chapter {chapter}
		{/if}
	</h4>
{/if}

<style lang="scss">
	h4 {
		margin: 0px;
	}
</style>
