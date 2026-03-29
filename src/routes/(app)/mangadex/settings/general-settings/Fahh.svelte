<script lang="ts">
	import { fahh } from "@mangadex/stores/fahh.svelte";
	import { playFahh } from "@special-eureka/core/fahh/play";
	import { isAprilsFoolsDay } from "@special-eureka/core/utils/isAprilFouls";
</script>

<div>
	<input type="checkbox" bind:checked={fahh.shouldPlay} disabled={fahh.force} class="checkbox" />
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<h3>
		Play the <strong onclick={playFahh}>FAHH</strong> sound effect every time there is an error.
	</h3>
</div>
{#if fahh.force}
	<p>
		Just bear with it. {#if isAprilsFoolsDay()}
			It is April fools day!!
		{:else}
			<i>(Wait... Something went wrong... Please reload the app!)</i>
		{/if}
	</p>
{/if}

<style lang="scss">
	.checkbox {
		width: 24px;
		height: 24px;
	}
	div {
		display: flex;
		align-items: center;
		gap: 6px;
		h3 {
			margin: 0px;
		}
	}
	p {
		margin: 0px;
	}
</style>
