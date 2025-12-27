<script lang="ts">
	import { progressModeStore as action } from "@mangadex/stores/chapterLayout";
	import { PanelBottom, PanelBottomDashed, SlashIcon } from "@lucide/svelte";
	import { ProgressMode } from "@mangadex/gql/graphql";

	const size = "18";
</script>

<div>
	{#if $action == ProgressMode.Default}
		<PanelBottom {size} />
	{:else if $action == ProgressMode.Floating}
		<PanelBottomDashed {size} />
	{:else}
		<SlashIcon {size} />
	{/if}
</div>

<style lang="scss">
	div {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
