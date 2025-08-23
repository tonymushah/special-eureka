<script lang="ts">
	import { navigating } from "$app/stores";
	import isDefaultDecoration from "$lib/window-decoration/stores/isDefaultDecoration";
	import Sidebar from "../sidebar/Sidebar.svelte";
	import { isSidebarRtl } from "../sidebar/states/isRtl";
	import Toaster from "../theme/toast/Toaster.svelte";
	import { scrollElementId } from "./scrollElement";
	interface Props {
		children?: import("svelte").Snippet;
	}
	let { children }: Props = $props();
	let loading = $derived($navigating != null);
	let isRTL = $derived($isSidebarRtl);
</script>

<div class="provider" class:isRTL class:defaultDecoration={$isDefaultDecoration}>
	<div class="sidebar">
		<Sidebar />
	</div>
	<div
		class="inner"
		id={scrollElementId}
		class:loading
		class:defaultDecoration={$isDefaultDecoration}
		role="button"
		tabindex="0"
		onkeydown={(e) => {
			if (loading) {
				e.stopPropagation();
				e.preventDefault();
			}
		}}
		onclick={(e) => {
			if (loading) {
				e.stopPropagation();
				e.preventDefault();
			}
		}}
	>
		<Toaster />
		{@render children?.()}
	</div>
</div>

<style lang="scss">
	.provider {
		display: flex;
		color: var(--text-color);
		width: 100%;
		height: 100%;
		.sidebar {
			width: fit-content;
		}
		.inner {
			height: -webkit-fill-available;
		}
	}
	.provider.isRTL {
		flex-direction: row-reverse;
	}
	.provider::-webkit-scrollbar {
		display: none;
	}
	.inner:global([data-selecting]) {
		user-select: none;
		:global(*) {
			user-select: none;
		}
	}

	.inner {
		//scroll-behavior: smooth;
		overflow-y: scroll;
		// NOTE it added a lot of unecessary space that made appear a lot unecessary scrollbar
		// on Linux.
		// padding-bottom: 10px;
		width: 100%;
		transition:
			filter,
			webkit-filter 300ms ease-in-out;
		:global(*::-webkit-scrollbar) {
			width: 12px;
		}
		:global(*::-webkit-scrollbar-thumb) {
			border-radius: 0.25em;
			background-color: var(--scrollbar-color);
			transition: background-color 300ms ease-in-out;
		}
		:global(*::-webkit-scrollbar-thumb:hover) {
			background-color: var(--scrollbar-color-hover);
		}

		:global(*::-webkit-scrollbar-track) {
			background-color: var(--accent);
		}
	}

	.inner.defaultDecoration {
		height: 100cqh;
	}
	.inner::-webkit-scrollbar {
		width: 12px;
	}
	.inner::-webkit-scrollbar-thumb {
		border-radius: 0.25em;
		background-color: var(--scrollbar-color);
		transition: background-color 300ms ease-in-out;
	}
	.inner::-webkit-scrollbar-thumb:hover {
		background-color: var(--scrollbar-color-hover);
	}

	.inner::-webkit-scrollbar-track {
		background-color: var(--accent);
	}
	.inner.loading {
		cursor: wait;
		animation-name: loading;
		animation-direction: normal;
		animation-fill-mode: both;
		animation-duration: 300ms;
		animation-timing-function: ease-in-out;
		pointer-events: none;
	}
	.inner.loading :global(*) {
		pointer-events: none;
	}
	@keyframes loading {
		from {
			filter: blur(0px);
			-webkit-filter: blur(0px);
		}
		to {
			filter: blur(10px);
			-webkit-filter: blur(10px);
		}
	}
</style>
