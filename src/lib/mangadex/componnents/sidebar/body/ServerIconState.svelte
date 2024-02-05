<script lang="ts">
	import { graphql } from "@mangadex/gql";
	import { sub_end } from "@mangadex/utils";
	import { mount as _mount, unmount as _unmount } from "@mangadex/utils/offline_app_state";
	import { getContextClient, mutationStore, queryStore, subscriptionStore } from "@urql/svelte";
	import { onDestroy } from "svelte";
	import { ServerIcon } from "svelte-feather-icons";
	import { v4 } from "uuid";
	const client = getContextClient();
	const sub_id = v4();
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
	let isLoading = false;
	const mount = async () => {
		if (!isLoading) {
			isLoading = true;
			const res = await _mount(client);
			const error = res.error;
			if (error) {
                error.graphQLErrors.forEach((e) => console.error(e))
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
				error.graphQLErrors.forEach((e) => console.error(e))
			}
			isLoading = false;
		}
	};
	$: isEnabled = $offline_server_state_sub.data?.watchIsAppMounted;
	$: isDisabled = !isEnabled;
</script>

<a
	href={undefined}
	class:isDisabled
	class:isEnabled
	class:isLoading
	on:click={async () => {
		if (!isLoading) {
			if ($offline_server_state_sub.data?.watchIsAppMounted == true) {
				await unmount();
			} else {
				await mount();
			}
		}
	}}
>
	<ServerIcon size="24" />
</a>

<style lang="scss">
	.isLoading {
		color: blue;
	}
	.isEnabled {
		color: green;
	}
	.isDisabled {
		color: red;
	}
</style>
