<script lang="ts">
	export let coverImage: string;
</script>

<div class="layout-image" style={`background-image: url(${coverImage});`}>
	<div class="layout-color">
		<div class="layout">
			<slot />
		</div>
	</div>
</div>

<style lang="scss">
	.layout-image {
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 0px -400px;
		color: var(--text-color);
	}
	.layout-color {
		background: linear-gradient(
			180deg,
			color-mix(in srgb, var(--main-background) 20%, transparent),
			color-mix(in srgb, var(--main-background) 45%, transparent),
			color-mix(in srgb, var(--main-background) 70%, transparent)
		);
	}
	.layout {
		margin: var(--popular-element-layout-margin);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		display: flex;
		align-items: start;
		flex-direction: row;
		width: 100%;
	}
</style>
