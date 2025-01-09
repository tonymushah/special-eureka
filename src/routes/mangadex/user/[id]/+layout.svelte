<script lang="ts">
	import UsersPageBase from "@mangadex/componnents/users/page/UsersPageBase.svelte";
	import type { LayoutData } from "./$types";
	import UserRolesComp from "@mangadex/componnents/user/UserRolesComp.svelte";
	import UserRoleBadge from "@mangadex/componnents/user/UserRoleBadge.svelte";
	import { writeText } from "@tauri-apps/plugin-clipboard-manager";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { ExternalLinkIcon, FlagIcon, BookmarkIcon } from "svelte-feather-icons";
	import { open as shellOpen } from "@tauri-apps/plugin-shell";
	import NavTab from "./NavTab.svelte";

	interface Props {
		data: LayoutData;
		children?: import("svelte").Snippet;
	}

	let { data, children }: Props = $props();
</script>

<UsersPageBase title={data.username}>
	{#snippet left()}
		<div class="buttons">
			<PrimaryButton isBase>
				<p><BookmarkIcon />Follow</p>
			</PrimaryButton>
			<ButtonAccent
				isBase
				on:click={() => {
					shellOpen(`https://mangadex.org/user/${data.id}`);
				}}
			>
				<p><ExternalLinkIcon /> Open in browser</p>
			</ButtonAccent>
			<ButtonAccent isBase>
				<p><FlagIcon />Report</p>
			</ButtonAccent>
		</div>
	{/snippet}
	<!-- TODO @migration-task: migrate this slot by hand, `top-right` is an invalid identifier -->
	<div slot="top-right">
		<p>
			User ID: <span
				onkeydown={() => {}}
				role="button"
				tabindex={0}
				onclick={() => {
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
	</div>
	{#snippet right()}
		<div>
			<section class="nav-tab">
				<NavTab id={data.id} />
			</section>
			<section class="content">
				{@render children?.()}
			</section>
		</div>
	{/snippet}
</UsersPageBase>

<style lang="scss">
	.nav-tab {
		margin-top: 0.5em;
	}
	.buttons {
		display: grid;
		gap: 10px;
		margin: 10px;
		p {
			display: flex;
			gap: 8px;
			margin: 0px;
			font-weight: 700;
			font-size: 1.125em;
			align-items: center;
			justify-content: center;
		}
	}
	.roles {
		display: flex;
		gap: 0.5em;
		flex-wrap: wrap;
	}
	.copiable:hover {
		text-decoration: underline;
		cursor: pointer;
	}
	.content {
		margin-top: 8px;
	}
</style>
