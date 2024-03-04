<script lang="ts">
	export let isHover: boolean;
</script>

<div
	role="document"
	class="layout"
	on:mouseenter={() => {
		isHover = true;
	}}
	on:mouseleave={() => {
		isHover = false;
	}}
>
	<slot />
</div>

<style lang="scss">
	.layout {
		width: var(--width);
		height: var(--height);
		overflow: hidden;
		border-radius: 0.25rem;
		color: var(--text-color);
	}
</style>
