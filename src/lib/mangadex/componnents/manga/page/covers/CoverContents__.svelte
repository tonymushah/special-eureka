<script lang="ts">
	import type { Readable } from "svelte/store";
	import type { CoverInput } from "./CoverContents.svelte";
	import { fade, slide } from "svelte/transition";
	import CoverContents from "./CoverContents.svelte";

	interface Props {
		isDataEmpty: Readable<boolean>;
		isInitialLoading: Readable<boolean>;
		isLoading: Readable<boolean>;
		coversData: Readable<CoverInput[]>;
	}
	let { isDataEmpty, isInitialLoading, isLoading, coversData }: Props = $props();
</script>

{#if $isInitialLoading}
	<div class="init-loading" transition:fade>
		<h3>Loading...</h3>
	</div>
{:else if !$isDataEmpty}
	{#if $isLoading}
		<div
			class="init-loading"
			transition:slide={{
				axis: "y"
			}}
		>
			<h3>Loading...</h3>
		</div>
	{/if}
	<article class="covers">
		<CoverContents covers={$coversData} />
	</article>
{/if}

<style lang="scss">
	.covers {
		margin-top: 10px;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		width: 100%;
		gap: 10px;
		margin-bottom: 10px;
	}
</style>
