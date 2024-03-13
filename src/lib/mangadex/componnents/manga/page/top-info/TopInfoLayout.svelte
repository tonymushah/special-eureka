<script lang="ts">
	import { getTopCoverContextStore } from "./context";

	const coverImageStore = getTopCoverContextStore();
	$: coverImage = $coverImageStore ?? "";
</script>

<div class="layout-image" style={`background-image: url(${coverImage});`}>
	<div class="layout-color">
		<div class="layout">
			<div class="cover">
				<slot name="cover" />
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
		display: grid;
		margin: var(--manga-page-layout-margin);
		padding: var(--manga-page-layout-padding);
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
		.cover {
			grid-column: 0 / 3;
			grid-row: 1;
			display: flex;
			align-self: center;
			justify-content: center;
			margin: 2em;
		}
		.content {
			grid-column: 2 / -1;
			grid-row: 1;
		}
	}
</style>
