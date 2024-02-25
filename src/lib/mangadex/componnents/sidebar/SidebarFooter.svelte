<script lang="ts">
	import { graphql } from "@mangadex/gql";
	import { isLoggedSubDoc, userMeSubDoc } from "@mangadex/gql-docs/userMe";
	import { sub_end } from "@mangadex/utils";
	import { getContextClient, subscriptionStore } from "@urql/svelte";
	import { onDestroy, onMount } from "svelte";
	import { UserCheckIcon, UserXIcon, UserIcon } from "svelte-feather-icons";
	import { v4 } from "uuid";
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
		initial_user_name = me.data?.user.me.attributes.username;
		isRefreshing = false;
	}
	onMount(async () => {
		await loadUserMe();
	});
	const sub_ids = [v4(), v4()];
	const userMe = subscriptionStore({
		client,
		query: userMeSubDoc,
		variables: {
			sub_id: sub_ids[0]
		}
	});
	const isLogged = subscriptionStore({
		client,
		query: isLoggedSubDoc,
		variables: {
			sub_id: sub_ids[1]
		}
	});
	onDestroy(() => {
		sub_ids.forEach((id) => sub_end(id));
	});

	$: label = $userMe.data?.watchUserMe.username ?? "Login";
</script>

<Menu bind:label>
	<div
		slot="icon"
		role="button"
		tabindex="0"
		on:keypress={(e) => {}}
		class:isRefreshing
		on:click={async () => {
			await loadUserMe();
		}}
	>
		{#if isRefreshing}
			<UserIcon size="24" />
		{:else if $isLogged.data?.watchIsLogged}
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
