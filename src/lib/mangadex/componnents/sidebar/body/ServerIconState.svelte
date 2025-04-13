<script lang="ts">
	import { getMangaDexThemeContext } from "@mangadex/utils/contexts";
	import { mount as _mount, unmount as _unmount } from "@mangadex/utils/offline_app_state";
	import { getContextClient, subscriptionStore } from "@urql/svelte";
	import { ServerIcon } from "svelte-feather-icons";
	import Toast from "toastify-js";
	import { onDestroy } from "svelte";
	import { isMounted } from "@mangadex/stores/offlineIsMounted";
	import { isSidebarRtl } from "../states/isRtl";
	const client = getContextClient();
	const theme = getMangaDexThemeContext();
	let toast = $derived(
		Toast({
			position: $isSidebarRtl ? "left" : "right",
			gravity: "bottom",
			style: {
				fontFamily: "Poppins"
			},

			close: true
		})
	);
	onDestroy(() => {
		try {
			toast.hideToast();
		} catch (e) {
			console.error(e);
		}
	});
	let isLoading = $state(false);
	const mount = async () => {
		if (!isLoading) {
			isLoading = true;
			const res = await _mount(client);
			const error = res.error;
			try {
				toast.hideToast();
			} catch (e) {
				console.warn(e);
			}
			if (error) {
				error.graphQLErrors.forEach((e) => console.error(e));
				toast.options.text = "Error on loading offline data";
				if (toast.options.style) toast.options.style.background = $theme.danger.default;
				toast.showToast();
			} else {
				toast.options.text = "Offline data loaded";
				if (toast.options.style) toast.options.style.background = $theme.status.green;
				toast.showToast();
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
				error.graphQLErrors.forEach((e) => console.error(e));
				toast.options.text = "Error on unmounting offline data";
				if (toast.options.style) toast.options.style.background = $theme.danger.default;
				toast.showToast();
			} else {
				toast.options.text = "Offline data unmounted";
				if (toast.options.style) toast.options.style.background = $theme.status.green;
				toast.showToast();
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
