<script lang="ts">
	import UsersSimpleBase from "@mangadex/componnents/users/simple/UsersSimpleBase.svelte";
	import type { PageData } from "./$types";
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import { ChessKing } from "@lucide/svelte";

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<AppTitle title="{data.username} - MangaDex" />

<div class="groups">
	{#each data.groups as group (group.id)}
		<UsersSimpleBase
			name={group.name}
			onclick={() => {
				goto(
					route("/mangadex/group/[id]", {
						id: group.id
					})
				);
			}}
		>
			{#if group.isLeader}
				<div>
					<ChessKing color="var(--primary)" size="16" />
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
