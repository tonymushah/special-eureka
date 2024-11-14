<script lang="ts">
	import { graphql } from "@mangadex/gql";
	import { isLogged, userMe } from "@mangadex/utils/auth";
	import { getContextClient } from "@urql/svelte";
	import { onMount } from "svelte";
	import { UserCheckIcon, UserIcon, UserXIcon } from "svelte-feather-icons";
	import Menu from "./base/Menu.svelte";
	const client = getContextClient();
	let initial_user_name: string | undefined = undefined;
	let isRefreshing = false;
	async function loadUserMe() {
		isRefreshing = true;
		const me = await client
			.query(
				graphql(/* GraphQL */ `
					query userMeOnSidebarFooter {
						user {
							me {
								id
								attributes {
									username
									roles
								}
							}
						}
					}
				`),
				{}
			)
			.toPromise();
		if (me.error) {
			console.error(me.error);
		}
		initial_user_name = me.data?.user.me.attributes.username;
		isRefreshing = false;
	}
	onMount(async () => {
		await loadUserMe();
	});

	$: label = $userMe?.name ?? "Login";
</script>

<Menu
	bind:label
	on:click={async () => {
		await loadUserMe();
	}}
>
	<div slot="icon" role="button" tabindex="0" on:keypress={(e) => {}} class:isRefreshing>
		{#if isRefreshing}
			<UserIcon size="24" />
		{:else if $isLogged}
			<UserCheckIcon size="24" />
		{:else}
			<UserXIcon size="24" />
		{/if}
	</div>
</Menu>

<style lang="scss">
	.isRefreshing {
		color: var(--status-blue);
	}
</style>
