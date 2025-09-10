<script lang="ts">
	import { isLogged, userMe } from "@mangadex/utils/auth";
	import { getContextClient } from "@urql/svelte";
	import { onMount } from "svelte";
	import { UserCheckIcon, UserIcon, UserXIcon } from "svelte-feather-icons";
	import Menu from "./base/Menu.svelte";
	import { userMeOnSidebarFooterQuery } from "./footer";
	import { goto } from "$app/navigation";
	import { addErrorToast } from "../theme/toast/Toaster.svelte";
	import { route } from "$lib/ROUTES";
	import { debounce } from "lodash";

	const client = getContextClient();
	let initial_user_name: string | undefined = $state(undefined);
	let isRefreshing = $state(false);

	const loadUserMe = debounce(async function (): Promise<string> {
		isRefreshing = true;
		try {
			const me = await client.query(userMeOnSidebarFooterQuery, {}).toPromise();
			if (me.error) {
				throw me.error;
			}
			initial_user_name = me.data?.user.me.attributes.username;

			if (me.data == undefined) {
				throw new Error("No data??");
			}
			return me.data.user.me.id;
		} finally {
			isRefreshing = false;
		}
	});

	onMount(async () => {
		await loadUserMe();
	});

	let label = $derived($userMe?.name ?? "Guest");
</script>

<Menu
	{label}
	onclick={async () => {
		try {
			const id = await loadUserMe();
			if (id) {
				goto(
					route("/mangadex/user/[id]", {
						id: id
					})
				);
			}
		} catch (error) {
			addErrorToast("Cannot load info", error);
		}
	}}
	oncontextmenu={async (e) => {
		e.preventDefault();
		e.stopPropagation();
		try {
			await loadUserMe();
		} catch (error) {
			addErrorToast("Cannot load info", error);
		}
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
