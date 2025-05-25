<script lang="ts" module>
	export type ToastVariant =
		| "danger"
		| "accent"
		| "primary"
		| "green"
		| "red"
		| "yellow"
		| "blue"
		| "gray"
		| "purple";
	export type ToastData = {
		title: string;
		description?: string;
		variant?: ToastVariant;
	};

	const {
		elements: { content, title, description, close },
		helpers,
		states: { toasts },
		actions: { portal }
	} = createToaster<ToastData>({
		hover: "pause"
	});

	export const addToast = helpers.addToast;
	export const removeToast = helpers.removeToast;
	export const updateToast = helpers.updateToast;
</script>

<script lang="ts">
	import { createToaster, melt } from "@melt-ui/svelte";
	import MangaDexVarThemeProvider from "../MangaDexVarThemeProvider.svelte";
	import { isSidebarRtl } from "@mangadex/componnents/sidebar/states/isRtl";
	import { decoHStore } from "$routes/+layout.svelte";
	import { XIcon } from "svelte-feather-icons";
	import { flip } from "svelte/animate";
	import { fly } from "svelte/transition";
	import ToastProgress from "./ToastProgress.svelte";
</script>

<div use:portal class="portal" class:rtl={$isSidebarRtl} style="--decoH: {$decoHStore}px">
	<MangaDexVarThemeProvider>
		{#each $toasts as { id, data, ...toast } (id)}
			<div animate:flip={{ duration: 500 }}>
				<div
					use:melt={$content(id)}
					class="toast-container"
					in:fly={{ duration: 150, x: $isSidebarRtl ? "-100%" : "100%" }}
					out:fly={{ duration: 150, x: $isSidebarRtl ? "-100%" : "100%" }}
				>
					<ToastProgress getPercentage={toast.getPercentage} />
					<div class="toast">
						<div>
							<h3 use:melt={$title(id)}>
								{data.title}
								<span data-toast-variant={data.variant ?? "accent"} class="status"
								></span>
							</h3>
							<div use:melt={$description(id)} class="description">
								{data.description}
							</div>
						</div>
						<button use:melt={$close(id)} aria-label="close notification" class="close">
							<XIcon size="16" />
						</button>
					</div>
				</div>
			</div>
		{/each}
	</MangaDexVarThemeProvider>
</div>

<style lang="scss">
	.portal {
		position: fixed;
		top: var(--decoH);
		z-index: 50;
		margin: 1rem; /* 16px */
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.5rem; /* 8px */
	}
	@media (min-width: 768px) {
		.portal {
			top: auto;
			bottom: 0px;
		}
	}
	.portal:not(.rtl) {
		right: 0px;
	}
	.portal.rtl {
		left: 0px;
	}
	.toast-container {
		color: var(--text-color);
		border-radius: 0.5rem; /* 8px */
		background-color: var(--accent-l1);
		border: 2px solid var(--mid-tone);
		position: relative;
	}
	.toast {
		position: relative;
		display: flex;
		width: 24rem;
		max-width: calc(100vw - 2rem);
		align-items: center;
		justify-content: space-between;
		gap: 1rem; /* 16px */
		padding: 1.25rem; /* 20px */
	}
	h3 {
		margin: 0px;
		display: flex;
		align-items: center;
		gap: 0.5rem; /* 8px */
		font-weight: 600;
		font-size: 16px;
	}
	.status {
		width: 0.375em;
		height: 0.375em;
		border-radius: 9999px;
	}
	.status:global([data-toast-variant="accent"]) {
		background-color: var(--accent-l5);
	}
	.status:global([data-toast-variant="danger"]) {
		background-color: var(--danger);
	}
	.status:global([data-toast-variant="primary"]) {
		background-color: var(--primary);
	}
	.status:global([data-toast-variant="green"]) {
		background-color: var(--status-green);
	}
	.status:global([data-toast-variant="red"]) {
		background-color: var(--status-red);
	}
	.status:global([data-toast-variant="yellow"]) {
		background-color: var(--status-yellow);
	}
	.status:global([data-toast-variant="blue"]) {
		background-color: var(--status-blue);
	}
	.status:global([data-toast-variant="gray"]) {
		background-color: var(--status-gray);
	}
	.status:global([data-toast-variant="purple"]) {
		background-color: var(--status-purple);
	}
	.close {
		position: absolute;
		right: 1rem; /* 16px */
		top: 1rem; /* 16px */
		display: grid;
		width: 24px;
		height: 24px;
		justify-content: center;
		align-items: center;
		border-radius: 9999px;
		background-color: inherit;
		border: none;
		color: var(--text-color);
	}
	.close:hover {
		background-color: var(--accent-l1-hover);
	}
	.close:active {
		background-color: var(--accent-l1-active);
	}
	.description {
		font-size: 12px;
	}
</style>
