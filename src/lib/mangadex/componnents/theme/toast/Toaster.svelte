<script lang="ts" module>
	export const toaster = createToaster({
		overlap: true,
		placement: "bottom"
	});

	export const addToast: typeof toaster.create = (param) => {
		let notify = false;
		const unsub = toastNotify.subscribe((d) => {
			notify = d;
		});
		try {
			if (notify) {
				Promise.resolve()
					.then(async () => {
						if (!(await getCurrentWindow().isFocused())) {
							// Do you have permission to send a notification?
							let permissionGranted = await isPermissionGranted();

							// If not we need to request it
							if (!permissionGranted) {
								const permission = await requestPermission();
								permissionGranted = permission === "granted";
							}
							if (permissionGranted) {
								sendNotification({
									title: param.title,
									body: param.description
								});
							}
						}
					})
					.catch(console.error);
			}
			return toaster.create(param);
		} finally {
			unsub();
		}
	};
	export function addErrorToast(title: string, error?: unknown) {
		return addToast({
			title,
			description: (() => {
				if (error instanceof CombinedError && dev) {
					return JSON.stringify({
						extensions: error.graphQLErrors.map((d) => d.extensions),
						message: error.message
					});
				} else if (error instanceof Error) {
					return error.message;
				} else if (typeof error == "string") {
					return error;
				} else if (typeof error == "undefined" || error == null) {
					return undefined;
				} else {
					return "unknow error :3";
				}
			})(),
			type: "error"
		});
	}
</script>

<script lang="ts">
	import { createToaster, Toaster as ArkToaster, Toast } from "@ark-ui/svelte";
	import MangaDexVarThemeProvider from "../MangaDexVarThemeProvider.svelte";
	import { toastNotify } from "@mangadex/stores/toastNotify";
	import {
		isPermissionGranted,
		requestPermission,
		sendNotification
	} from "@tauri-apps/plugin-notification";
	import { getCurrentWindow } from "@tauri-apps/api/window";
	import { CombinedError } from "@urql/svelte";
	import { dev } from "$app/environment";
	import { X } from "@lucide/svelte";
	import toastStyles from "./toaster.module.scss";
</script>

<ArkToaster {toaster}>
	{#snippet children(toast)}
		<MangaDexVarThemeProvider>
			<Toast.Root class={toastStyles.toast}>
				<Toast.Title class={toastStyles.title}>{toast().title}</Toast.Title>
				<Toast.Description class={toastStyles.description}>{toast().description}</Toast.Description>
				<Toast.CloseTrigger class={toastStyles.close}>
					<X />
				</Toast.CloseTrigger>
			</Toast.Root>
		</MangaDexVarThemeProvider>
	{/snippet}
</ArkToaster>

<!-- 
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
								<span data-toast-variant={data.variant ?? "accent"} class="status"></span>
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
-->
<style lang="scss">
</style>
