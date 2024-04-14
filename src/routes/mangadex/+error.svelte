<script lang="ts">
	import { page } from "$app/stores";
	import { slide } from "svelte/transition";
	let isTitleHovered = false;
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

	<div class="message">
		<p>{$page.error?.message}</p>
	</div>
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
	}
</style>
