<script lang="ts">
	import { RiProgress1Line, RiProgress1Fill } from "svelte-remixicon";
	import { progressModeStore as action } from "@mangadex/stores/chapterLayout";
	import { SlashIcon } from "svelte-feather-icons";
	import { ProgressMode } from "@mangadex/gql/graphql";

	const size = "18";
</script>

<div>
	{#if $action == ProgressMode.Default}
		<RiProgress1Fill size={`${size}px`} />
	{:else if $action == ProgressMode.Floating}
		<RiProgress1Line size={`${size}px`} />
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
