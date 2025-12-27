<script lang="ts">
	import UsersSimpleBase from "@mangadex/componnents/users/simple/UsersSimpleBase.svelte";
	import type { PageData } from "./$types";
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import { ChessQueen } from "@lucide/svelte";

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<AppTitle title={`${data.name} - MangaDex`} />

<main>
	<div class="members">
		{#each data.members as member}
			<UsersSimpleBase
				name={member.name}
				onclick={() => {
					goto(
						route("/mangadex/user/[id]", {
							id: member.id
						})
					);
				}}
			>
				{#if member.isLeader}
					<div>
						<ChessQueen color="var(--primary)" size="16" />
					</div>
				{/if}
			</UsersSimpleBase>
		{:else}
			<p>No one</p>
		{/each}
	</div>
</main>

<style>
	.members {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 8px;
	}
</style>
