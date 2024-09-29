<script lang="ts">
	export let profileBanner: string;
</script>

<section style="background-image: url({profileBanner});">
	<div class="gradient">
		<div class="backdrop-filter">
			<div class="left">
				<slot name="left" />
			</div>
			<div class="right">
				<slot name="right" />
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	section {
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 0px -200px;
		color: var(--text-color);
		min-height: 8em;
	}
	.gradient {
		background: linear-gradient(
			180deg,
			color-mix(in srgb, var(--main-background) 30%, transparent),
			color-mix(in srgb, var(--main-background) 80%, transparent),
			color-mix(in srgb, var(--main-background) 100%, transparent)
		);
		height: 100%;
	}
	.backdrop-filter {
		backdrop-filter: blur(2px);
		-webkit-backdrop-filter: blur(2px);
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		gap: 1em;
		height: 100%;
		.left {
			padding: 0.5em;
			flex-grow: 0;
		}
		.right {
			flex-grow: 4;
		}
	}
</style>
