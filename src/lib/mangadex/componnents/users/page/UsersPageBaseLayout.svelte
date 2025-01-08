<script lang="ts">
	interface Props {
		profileBanner: string;
		left?: import('svelte').Snippet;
		right?: import('svelte').Snippet;
		bottom?: import('svelte').Snippet;
	}

	let {
		profileBanner,
		left,
		right,
		bottom
	}: Props = $props();
</script>

<section style="background-image: url({profileBanner});">
	<div class="gradient">
		<div class="backdrop-filter">
			<div class="top">
				<div class="left">
					{@render left?.()}
				</div>
				<div class="right">
					{@render right?.()}
				</div>
			</div>
		</div>
	</div>
</section>
<div class="bottom">
	{@render bottom?.()}
</div>

<style lang="scss">
	section {
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 0px -200px;
		color: var(--text-color);
		background-position: center;
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
	@media (width < 800px) {
		:root {
			--right-grow: 2;
		}
		.top {
			gap: 0.5em;
		}
	}
	@media (width >= 800px) {
		:root {
			--right-grow: 4;
		}
		.top {
			gap: 1em;
		}
	}
	.backdrop-filter {
		backdrop-filter: blur(2px);
		-webkit-backdrop-filter: blur(2px);
		.top {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;

			height: 100%;
			.left {
				flex-grow: 0;
			}
			.right {
				flex-grow: var(--right-grow);
			}
		}
	}
</style>
