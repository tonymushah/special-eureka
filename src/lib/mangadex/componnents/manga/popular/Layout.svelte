<script lang="ts">
	export let coverImage: string;
</script>

<div class="layout-image" style={`background-image: url(${coverImage});`}>
	<div class="layout-color">
		<div class="layout">
			<div class="no-index">
				<slot name="no-index" />
			</div>
			<div class="content">
				<slot />
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.layout-image {
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 0px -200px;
		color: var(--text-color);
	}
	.layout-color {
		background: linear-gradient(
			180deg,
			color-mix(in srgb, var(--main-background) 30%, transparent),
			color-mix(in srgb, var(--main-background) 80%, transparent),
			color-mix(in srgb, var(--main-background) 100%, transparent)
		);
	}
	.layout {
		margin: var(--popular-element-layout-margin);
		padding: var(--popular-element-layout-padding);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		div.content {
			display: flex;
			align-items: start;
			flex-direction: row;
			width: 100%;
		}
	}
</style>
