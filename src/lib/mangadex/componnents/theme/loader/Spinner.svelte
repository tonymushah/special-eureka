<script lang="ts">
	interface Props {
		size?: string;
		color?: string;
		strokeSize?: string;
	}

	let { size = "48px", color = "var(--text-color)", strokeSize = "5px" }: Props = $props();
</script>

<span
	class="loader"
	style={`width: ${size}; height: ${size}; --spinner-color: ${color}; --spinner-stroke-size: ${strokeSize};`}
></span>

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
