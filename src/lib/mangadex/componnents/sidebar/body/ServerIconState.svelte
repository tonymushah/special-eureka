<script lang="ts">
	// TODO migrate to mutations
	import { isMounted } from "@mangadex/stores/offlineIsMounted";
	import { mount as _mount, unmount as _unmount } from "@mangadex/utils/offline_app_state";
	import { getContextClient } from "@urql/svelte";
	import { ServerIcon } from "@lucide/svelte";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import { createMutation } from "@tanstack/svelte-query";

	const client = getContextClient();

	let mount = createMutation(() => ({
		mutationKey: ["sidebar", "offline", "mount"],
		async mutationFn() {
			await _mount(client);
		},
		networkMode: "always",
		onError(error) {
			addErrorToast("Error on loading offline data", error);
		},
		onSuccess() {
			addToast({
				title: "Offline data loaded",
				type: "success"
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
			addErrorToast("Error on unmounting offline data", error);
		},
		onSuccess() {
			addToast({
				title: "Offline data unmounted",
				type: "success"
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
