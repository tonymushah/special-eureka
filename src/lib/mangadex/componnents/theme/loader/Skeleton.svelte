<script lang="ts">
	export let height: string = "100px";
	export let width: string = "360px";
	export let duration: string = "1s";
	export let border_radius: string = "0px";
</script>

<span class="loader" style="animation-duration: {duration}; --width: {width}; --height: {height};">
	<div style="border-radius: {border_radius};"></div>
</span>

<style lang="scss">
	.loader {
		display: flex;
		width: min-content;
		background-image: linear-gradient(90deg, transparent, var(--mid-tone) 50%, transparent 80%);
		background-repeat: no-repeat;
		background-size: var(--height);
		background-position: -50% 0;
		box-sizing: border-box;
		animation-name: animloader;
		animation-timing-function: linear;
		animation-fill-mode: backwards;
		animation-iteration-count: infinite;
		div {
			background-color: color-mix(in srgb, var(--main-background) 70%, var(--mid-tone) 5%);
			width: var(--width);
			height: var(--height);
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
