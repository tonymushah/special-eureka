<script lang="ts">
	export let profileBanner: string;
</script>

<section style="background-image: url({profileBanner});">
	<div class="gradient">
		<div class="backdrop-filter">
			<div class="top">
				<div class="left">
					<slot name="left" />
				</div>
				<div class="right">
					<slot name="right" />
				</div>
			</div>
			<div class="bottom">
				<slot name="bottom" />
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
