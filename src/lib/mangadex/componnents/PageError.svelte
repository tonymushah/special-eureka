<script lang="ts">
	import { slide } from "svelte/transition";
	let isTitleHovered = false;
	export let message: string | undefined = undefined;
</script>

<div class="error">
	<h2
		on:mouseenter={() => {
			isTitleHovered = true;
		}}
		on:mouseleave={() => {
			isTitleHovered = false;
		}}
	>
		Oops, something is not working as intended
	</h2>
	{#if isTitleHovered}
		<p class="tony-message" transition:slide>Tony Mushah: Pardon me for that ��</p>
	{/if}

	{#if message}
		<div class="message" transition:slide>
			<p>{message}</p>
		</div>
	{/if}
</div>

<style lang="scss">
	.error {
		display: flex;
		width: 100cqw;
		height: 100cqh;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		flex-wrap: nowrap;
		background-color: color-mix(in srgb, var(--danger-l1) 50%, transparent 50%);
		h2 {
			margin: 0px;
		}
	}
</style>
