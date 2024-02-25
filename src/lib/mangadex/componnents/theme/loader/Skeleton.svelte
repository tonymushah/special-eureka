<script lang="ts">
	export let height: string = "100px";
	export let width: string = "360px";
	export let duration: string = "1s";
</script>

<span class="loader" style="animation-duration: {duration};">
	<div style={`width: ${width};height: ${height};`}></div>
</span>

<style lang="scss">
	.loader {
		div {
			background-color: color-mix(in srgb, var(--main-background) 70%, var(--mid-tone) 5%);
		}
		display: flex;
		width: min-content;
		background-image: linear-gradient(
			100deg,
			transparent,
			var(--mid-tone) 50%,
			transparent 80%
		);
		background-repeat: no-repeat;
		background-size:
			75px 100px,
			100px 100px,
			125px 20px,
			260px 20px,
			260px 20px;
		background-position:
			-50% 0,
			0 0,
			120px 0,
			120px 40px,
			120px 80px,
			120px 120px;
		box-sizing: border-box;
		animation-name: animloader;
		animation-timing-function: linear;
		animation-fill-mode: forwards;
		animation-iteration-count: infinite;
	}

	@keyframes animloader {
		0% {
			background-position:
				0% 0,
				0 0,
				120px 0,
				120px 40px,
				120px 80px,
				120px 120px;
		}
		100% {
			background-position:
				100% 0,
				0 0,
				120px 0,
				120px 40px,
				120px 80px,
				120px 120px;
		}
	}
</style>
