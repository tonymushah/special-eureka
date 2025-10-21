<script lang="ts">
	// TODO migrate to mutations
	import { isMounted } from "@mangadex/stores/offlineIsMounted";
	import { mount as _mount, unmount as _unmount } from "@mangadex/utils/offline_app_state";
	import { getContextClient } from "@urql/svelte";
	import { ServerIcon } from "svelte-feather-icons";
	import { addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import { createMutation } from "@tanstack/svelte-query";

	const client = getContextClient();

	let mount = createMutation(() => ({
		mutationKey: ["sidebar", "offline", "mount"],
		async mutationFn() {
			await _mount(client);
		},
		networkMode: "always",
		onError(error) {
			addToast({
				data: {
					title: "Error on loading offline data",
					description: error.message,
					variant: "danger"
				}
			});
		},
		onSuccess() {
			addToast({
				data: {
					title: "Offline data loaded",
					variant: "green"
				}
			});
		}
	}));

	let unmount = createMutation(() => ({
		mutationKey: ["sidebar", "offline", "unmount"],
		async mutationFn() {
			await _unmount(client);
		},
		networkMode: "always",
		onError(error) {
			addToast({
				data: {
					title: "Error on unmounting offline data",
					description: error.message,
					variant: "danger"
				}
			});
		},
		onSuccess() {
			addToast({
				data: {
					title: "Offline data unmounted",
					variant: "green"
				}
			});
		}
	}));

	let isLoading = $derived(mount.isPending);
	let isEnabled = $derived($isMounted);
	let isDisabled = $derived(!isEnabled);
</script>

<a
	href={undefined}
	class:isDisabled
	class:isEnabled
	class:isLoading
	onclick={async () => {
		if (!isLoading) {
			if (!$isMounted) {
				await mount.mutateAsync();
			} else {
				await unmount.mutateAsync();
			}
		}
	}}
	tabindex="0"
>
	<ServerIcon size="24" />
</a>

<style lang="scss">
	.isLoading {
		color: var(--status-blue);
	}
	.isEnabled {
		color: var(--status-green);
	}
	.isDisabled {
		color: var(--status-red);
	}
</style>
