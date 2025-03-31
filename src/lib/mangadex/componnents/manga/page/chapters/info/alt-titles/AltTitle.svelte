<script lang="ts">
	import FlagIcon from "@mangadex/componnents/FlagIcon.svelte";
	import type { Language } from "@mangadex/gql/graphql";
	import type { Readable } from "svelte/store";

	interface Props {
		locale: Readable<Language | undefined>;
		title: string;
	}

	let { locale, title }: Props = $props();
	let lang = $derived($locale);
</script>

<div class="alt-title">
	{#if lang}
		<FlagIcon {lang} />
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
