<script lang="ts">
	import FlagIcon from "@mangadex/componnents/FlagIcon.svelte";
	import type { Language } from "@mangadex/gql/graphql";

	export let locale: Language;
	export let title: string;
</script>

<div class="alt-title">
	<FlagIcon bind:lang={locale} />
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
