<script lang="ts">
	import { fade } from "svelte/transition";

	export let open: boolean;
	export let fixed: boolean = true;
	export let left = false;
</script>

<div class="container" class:fixed>
	{#if left}
		<aside class:open class:fixed class:left transition:fade>
			<div class="inner">
				<slot {open} {fixed} />
			</div>
		</aside>
	{/if}
	<div class="content" class:open class:fixed>
		<slot name="content" />
	</div>
	{#if !left}
		<aside class:open class:fixed transition:fade>
			<div class="inner">
				<slot {open} {fixed} />
			</div>
		</aside>
	{/if}
</div>

<style lang="scss">
	aside {
		height: 100cqh;
		width: 0;
		z-index: 1;
		top: 0;
		background-color: var(--main-background);
		color: var(--text-color);
		overflow-x: hidden;
		overflow-y: scroll;
		transition-duration: 0.5s;
		border-color: var(--accent-l2);
		border-style: solid;
		border-top: 0px;
		border-bottom: 0px;
		.inner {
			padding: 10px;
		}
	}
	aside.left {
		left: 0;
		box-shadow: 1px 0px 1px var(--accent);
		border-left: 1px;
	}
	aside:not(.left) {
		right: 0;
		box-shadow: -1px 0px 1px var(--accent);
		border-right: 1px;
	}
	aside.fixed {
		position: absolute;
	}
	.content {
		transition-duration: 0.5s;
		flex: 4;
	}
	aside:not(.open) {
		border-style: none;
		box-shadow: none;
	}
	aside.open {
		width: 250px;
		flex: inherit;
	}
	.container:not(.fixed) {
		display: flex;
		max-height: 100%;
	}
	.container {
		height: 100%;
	}
</style>
