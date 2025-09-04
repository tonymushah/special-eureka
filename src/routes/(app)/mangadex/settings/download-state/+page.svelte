<script lang="ts">
	import { isMounted } from "@mangadex/stores/offlineIsMounted";
	import States from "./States.svelte";
	import WarningComponent from "@mangadex/componnents/WarningComponent.svelte";
	import { slide } from "svelte/transition";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
</script>

{#if $isMounted}
	<States />
{:else}
	<AppTitle title="Download State - MangaDex" />
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
