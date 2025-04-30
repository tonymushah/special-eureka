<script lang="ts">
	import { graphql } from "@mangadex/gql/exports";
	import { isLogged, userMe } from "@mangadex/utils/auth";
	import { getContextClient } from "@urql/svelte";
	import { onMount } from "svelte";
	import { UserCheckIcon, UserIcon, UserXIcon } from "svelte-feather-icons";
	import Menu from "./base/Menu.svelte";
	import { userMeOnSidebarFooterQuery } from "./footer";
	const client = getContextClient();
	let initial_user_name: string | undefined = $state(undefined);
	let isRefreshing = $state(false);
	async function loadUserMe() {
		isRefreshing = true;
		const me = await client.query(userMeOnSidebarFooterQuery, {}).toPromise();
		if (me.error) {
			console.error(me.error);
		}
		initial_user_name = me.data?.user.me.attributes.username;
		isRefreshing = false;
	}
	onMount(async () => {
		await loadUserMe();
	});

	let label = $derived($userMe?.name ?? "Login");
</script>

<Menu
	{label}
	onclick={async () => {
		await loadUserMe();
	}}
>
	{#snippet icon()}
		<div role="button" tabindex="0" onkeypress={(e) => {}} class:isRefreshing>
			{#if isRefreshing}
				<UserIcon size="24" />
			{:else if $isLogged}
				<UserCheckIcon size="24" />
			{:else}
				<UserXIcon size="24" />
			{/if}
		</div>
	{/snippet}
</Menu>

<style lang="scss">
	.isRefreshing {
		color: var(--status-blue);
	}
</style>
