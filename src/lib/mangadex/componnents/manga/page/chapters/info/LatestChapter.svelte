<script lang="ts">
	export let volume: string | null | undefined = undefined;
	export let chapter: string | null | undefined = undefined;
	$: shouldShow =
		volume != null || volume != undefined || chapter != null || chapter != undefined;
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
