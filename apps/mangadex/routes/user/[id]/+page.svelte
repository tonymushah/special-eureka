<script lang="ts">
	import UsersSimpleBase from "@mangadex/componnents/users/simple/UsersSimpleBase.svelte";
	import type { PageData } from "./$types";
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";
	import { RiVipCrown2Fill } from "svelte-remixicon";

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<div class="groups">
	{#each data.groups as group (group.id)}
		<UsersSimpleBase
			name={group.name}
			on:click={() => {
				goto(
					route("/mangadex/group/[id]", {
						id: group.id
					})
				);
			}}
		>
			{#if group.isLeader}
				<div>
					<RiVipCrown2Fill color="var(--primary)" size="1em" />
				</div>
			{/if}
		</UsersSimpleBase>
	{:else}
		<p>This user is not affilated to any group</p>
	{/each}
</div>

<style lang="scss">
	.groups {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 8px;
	}
</style>
