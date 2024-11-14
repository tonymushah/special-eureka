<script lang="ts">
	import UsersPageBase from "@mangadex/componnents/users/page/UsersPageBase.svelte";
	import type { LayoutData } from "./$types";
	import UserRolesComp from "@mangadex/componnents/user/UserRolesComp.svelte";
	import UserRoleBadge from "@mangadex/componnents/user/UserRoleBadge.svelte";
	import { writeText } from "@tauri-apps/api/clipboard";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { ExternalLinkIcon, FlagIcon, BookmarkIcon } from "svelte-feather-icons";
	import { open as shellOpen } from "@tauri-apps/api/shell";
	import NavTab from "./NavTab.svelte";

	export let data: LayoutData;
</script>

<UsersPageBase title={data.username}>
	<div slot="left" class="buttons">
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
	<div slot="top-right">
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
	</div>
	<div slot="right">
		<section class="nav-tab">
			<NavTab id={data.id} />
		</section>
		<section class="content">
			<slot />
		</section>
	</div>
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
