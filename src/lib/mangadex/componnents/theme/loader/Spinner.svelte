<script lang="ts">
	export let size = "48px";
	export let color = "var(--text-color)";
	export let strokeSize = "5px";
</script>

<span
	class="loader"
	style={`width: ${size}; height: ${size}; --spinner-color: ${color}; --spinner-stroke-size: ${strokeSize};`}
/>

<style lang="scss">
	.loader {
		border: var(--spinner-stroke-size) solid var(--spinner-color);
		border-bottom-color: transparent;
		border-radius: 50%;
		display: inline-block;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
