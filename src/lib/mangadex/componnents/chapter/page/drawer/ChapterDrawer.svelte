<script lang="ts">
	export let open: boolean;
	export let fixed: boolean = true;
	export let left = false;
</script>

<div class="container" class:fixed>
	{#if left}
		<aside class:open class:fixed class:left>
			<div class="inner">
				<slot {open} {fixed} />
			</div>
		</aside>
	{/if}
	<div class="content" class:open class:fixed>
		<slot name="content" />
	</div>
	{#if !left}
		<aside class:open class:fixed>
			<div class="inner">
				<slot {open} {fixed} />
			</div>
		</aside>
	{/if}
</div>

<style lang="scss">
	aside {
		height: 100%;
		width: 0;
		z-index: 1;
		top: 0;
		background-color: var(--main-background);
		color: var(--text-color);
		overflow-x: hidden;
		transition-duration: 0.5s;
		.inner {
			padding: 10px;
		}
		overflow-y: scroll;
	}
	aside.left {
		left: 0;
	}
	aside:not(.left) {
		right: 0;
	}
	aside.fixed {
		position: absolute;
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
