<script lang="ts">
	export let type: "blue" = "blue";
	$: blue = type == "blue";
</script>

<p class:blue>
	<slot />
</p>

<style lang="scss">
	p {
		font-size: var(--font-size);
		font-family: var(--fonts);
		color: var(--text-color);
	}
	.blue {
		color: var(--indication-blue);
	}
</style>
