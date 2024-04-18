<script lang="ts">
	import FlagIcon from "@mangadex/componnents/FlagIcon.svelte";
	import type { Language } from "@mangadex/gql/graphql";
	import type { Readable } from "svelte/store";

	export let locale: Readable<Language | undefined>;
	export let title: string;
	$: lang = $locale;
</script>

<div class="alt-title">
	{#if lang}
		<FlagIcon bind:lang />
	{/if}
	<h4>{title}</h4>
</div>

<style lang="scss">
	.alt-title {
		display: flex;
		flex-direction: row;
		gap: 5px;
		align-items: center;
		h4 {
			margin: 0px;
			font-weight: 500;
		}
	}
</style>
