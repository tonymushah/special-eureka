<script lang="ts">
	import { fade } from "svelte/transition";
</script>

<div transition:fade>
	<slot />
</div>

<style lang="scss">
	div {
		display: grid;
	}
</style>
