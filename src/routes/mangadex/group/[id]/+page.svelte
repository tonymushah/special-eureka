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
						<RiVipCrown2Fill color="var(--primary)" size="1em" />
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
