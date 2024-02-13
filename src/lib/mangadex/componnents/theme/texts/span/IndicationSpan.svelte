<script lang="ts">
	export let type: "blue" = "blue";
	$: blue = type == "blue";
</script>

<span class:blue>
	<slot />
</span>

<style lang="scss">
	span {
		font-size: var(--font-size);
		font-family: var(--fonts);
		color: var(--text-color);
	}
	.blue {
		color: var(--indication-blue);
	}
</style>
