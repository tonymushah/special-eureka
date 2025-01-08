<script lang="ts">
	import Toast from "toastify-js";
	import { graphql } from "@mangadex/gql";
	import { sub_end } from "@mangadex/utils";
	import { mount as _mount, unmount as _unmount } from "@mangadex/utils/offline_app_state";
	import { getContextClient, mutationStore, queryStore, subscriptionStore } from "@urql/svelte";
	import { onDestroy } from "svelte";
	import { ServerIcon } from "svelte-feather-icons";
	import { v4 } from "uuid";
	import { getMangaDexThemeContext } from "@mangadex/utils/contexts";
	const client = getContextClient();
	const theme = getMangaDexThemeContext();
	const sub_id = v4();
	const toast = Toast({
		position: "right",
		gravity: "bottom",
		style: {
			fontFamily: "Poppins"
		},
		close: true
	});
	const offline_server_state_sub = subscriptionStore({
		client,
		query: graphql(/* GraphQL */ `
			subscription serverIconState($sub_id: UUID!) {
				watchIsAppMounted(subId: $sub_id)
			}
		`),
		variables: {
			sub_id
		}
	});
	onDestroy(() => {
		sub_end(sub_id);
	});
	let isLoading = $state(false);
	const mount = async () => {
		if (!isLoading) {
			isLoading = true;
			const res = await _mount(client);
			const error = res.error;
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
	let isEnabled = $derived($offline_server_state_sub.data?.watchIsAppMounted);
	let isDisabled = $derived(!isEnabled);
</script>

<a
	href={undefined}
	class:isDisabled
	class:isEnabled
	class:isLoading
	onclick={async () => {
		if (!isLoading) {
			if ($offline_server_state_sub.data?.watchIsAppMounted == true) {
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
