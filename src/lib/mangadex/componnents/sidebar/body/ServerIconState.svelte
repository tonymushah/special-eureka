<script lang="ts">
	import { isMounted } from "@mangadex/stores/offlineIsMounted";
	import { getMangaDexThemeContext } from "@mangadex/utils/contexts";
	import { mount as _mount, unmount as _unmount } from "@mangadex/utils/offline_app_state";
	import { getContextClient } from "@urql/svelte";
	import { onDestroy } from "svelte";
	import { ServerIcon } from "svelte-feather-icons";
	import { isSidebarRtl } from "../states/isRtl";
	import { addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";

	const client = getContextClient();
	const theme = getMangaDexThemeContext();

	let isLoading = $state(false);
	const mount = async () => {
		if (!isLoading) {
			isLoading = true;
			const res = await _mount(client);
			const error = res.error;
			if (error) {
				addToast({
					data: {
						title: "Error on loading offline data",
						description: error.message,
						variant: "danger"
					}
				});
			} else {
				addToast({
					data: {
						title: "Offline data loaded",
						variant: "green"
					}
				});
			}

			isLoading = false;
		}
	};
	const unmount = async () => {
		if (!isLoading) {
			isLoading = true;
			const res = await _unmount(client);
			const error = res.error;
			if (error) {
				addToast({
					data: {
						title: "Error on unmounting offline data",
						description: error.message,
						variant: "danger"
					}
				});
			} else {
				addToast({
					data: {
						title: "Offline data unmounted",
						variant: "green"
					}
				});
			}
			isLoading = false;
		}
	};
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
			if ($isMounted) {
				await unmount();
			} else {
				await mount();
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
