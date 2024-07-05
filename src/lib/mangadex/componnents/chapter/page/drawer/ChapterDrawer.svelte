<script lang="ts">
	export let open: boolean;
	export let fixed: boolean = true;
</script>

<div class="container" class:fixed>
	<div class="content" class:open class:fixed>
		<slot name="content" />
	</div>
	<aside class:open class:fixed>
		<div class="inner">
			<slot {open} {fixed} />
		</div>
	</aside>
</div>

<style lang="scss">
	aside {
		height: 100%;
		width: 0;
		z-index: 1;
		top: 0;
		right: 0;
		background-color: var(--main-background);
		color: var(--text-color);
		overflow-x: hidden;
		transition-duration: 0.5s;
		.inner {
			padding: 10px;
		}
		overflow-y: scroll;
	}
	aside.fixed {
		position: fixed;
	}
	.content {
		transition-duration: 0.5s;
		flex: 4;
	}
	aside.open {
		width: 250px;
		flex: inherit;
	}
	.container:not(.fixed) {
		display: flex;
		max-height: 100%;
	}
</style>
