<script lang="ts">
	import UsersPageBase from "@mangadex/componnents/users/page/UsersPageBase.svelte";
	import type { LayoutData } from "./$types";
	import UserRolesComp from "@mangadex/componnents/user/UserRolesComp.svelte";
	import UserRoleBadge from "@mangadex/componnents/user/UserRoleBadge.svelte";
	import { writeText } from "@tauri-apps/api/clipboard";

	export let data: LayoutData;
</script>

<UsersPageBase title={data.username}>
	<div slot="right">
		<p>
			User ID: <span
				on:keydown={() => {}}
				role="button"
				tabindex={0}
				on:click={() => {
					writeText(data.id);
				}}
				class="copiable">{data.id}</span
			>
		</p>
		<section class="uploads">
			<p>
				{data.uploads}
				<span>
					upload{#if data.uploads > 1}s{/if}
				</span>
			</p>
		</section>
		<section class="roles">
			{#each data.roles as role}
				<UserRoleBadge {role} />
			{/each}
		</section>
		<slot />
	</div>
</UsersPageBase>

<style lang="scss">
	.roles {
		display: flex;
		gap: 0.5em;
	}
	.copiable:hover {
		text-decoration: underline;
		cursor: pointer;
	}
</style>
