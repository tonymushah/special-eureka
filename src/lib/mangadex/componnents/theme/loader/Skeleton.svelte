<script lang="ts">
	interface Props {
		height?: string;
		width?: string;
		duration?: string;
		border_radius?: string;
		color?: string;
	}

	let {
		height = "100px",
		width = "360px",
		duration = "1s",
		border_radius = "0px",
		color = "var(--mid-tone)"
	}: Props = $props();
</script>

<div
	class="loader"
	style="animation-duration: {duration}; --width: {width}; --height: {height}; --skeleton-color: {color}; --border-radius: {border_radius}"
>
	<div></div>
</div>

<style lang="scss">
	.loader {
		display: flex;
		width: min-content;
		background-image: linear-gradient(
			90deg,
			transparent,
			var(--skeleton-color) 50%,
			transparent 80%
		);
		background-repeat: no-repeat;
		background-size: var(--height);
		background-position: -50% 0;
		box-sizing: border-box;
		animation-name: animloader;
		animation-timing-function: linear;
		animation-fill-mode: backwards;
		animation-iteration-count: infinite;
		border-radius: var(--border-radius);
		div {
			background-color: color-mix(in srgb, var(--main-background) 70%, var(--skeleton-color) 5%);
			width: var(--width);
			height: var(--height);
			border-radius: var(--border-radius);
		}
	}

	@keyframes animloader {
		0% {
			background-position: 150% 0;
		}
		100% {
			background-position: -150% 0;
		}
	}
</style>
