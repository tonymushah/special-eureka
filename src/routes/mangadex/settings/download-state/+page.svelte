<script lang="ts">
	import { isMounted } from "@mangadex/stores/offlineIsMounted";
	import States from "./States.svelte";
	import WarningComponent from "@mangadex/componnents/WarningComponent.svelte";
	import { slide } from "svelte/transition";
</script>

{#if $isMounted}
	<States />
{:else}
	<div
		transition:slide={{
			axis: "y"
		}}
	>
		<WarningComponent
			label="The offline data is not mounted"
			message="Please enable it to check the actual states"
		/>
	</div>
{/if}
