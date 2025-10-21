<script lang="ts">
	import dexChanXIndex from "@mangadex/assets/artworks/dex-and-index.png";
	import dexChanReading from "@mangadex/assets/artworks/dex-chan-reading.png";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import UserRoleBadge from "@mangadex/componnents/user/UserRoleBadge.svelte";
	import UsersPageBase from "@mangadex/componnents/users/page/UsersPageBase.svelte";
	import isFollowingUser, { isChangingUserFollowing } from "@mangadex/gql-docs/user/id/follow";
	import { isLogged } from "@mangadex/utils/auth";
	import { writeText } from "@tauri-apps/plugin-clipboard-manager";
	import { openUrl as shellOpen } from "@tauri-apps/plugin-opener";
	import { BookmarkIcon, ExternalLinkIcon, FlagIcon } from "svelte-feather-icons";
	import type { LayoutData } from "./$types";
	import NavTab from "./NavTab.svelte";
	import { dev } from "$app/environment";
	import ReportDialog from "@mangadex/componnents/report/dialog/ReportDialog.svelte";
	import { ReportCategory } from "@mangadex/gql/graphql";

	interface Props {
		data: LayoutData;
		children?: import("svelte").Snippet;
	}

	let { data, children }: Props = $props();
	const isFollowed = isFollowingUser(data.id);
	let isFollowing = $derived($isFollowed);
	let openReportDialog = $state(false);
</script>

<ReportDialog bind:open={openReportDialog} objectId={data.id} category={ReportCategory.User} />

<UsersPageBase
	title={data.username}
	profilePicture={dexChanReading}
	profileBanner={dexChanXIndex}
	notAlterImage
>
	{#snippet _left()}
		<div class="buttons">
			<PrimaryButton
				isBase
				disabled={$isChangingUserFollowing || !$isLogged}
				onclick={() => {
					$isFollowed = !$isFollowed;
				}}
			>
				<p>
					{#if isFollowing}
						<BookmarkIcon /> Unfollow
					{:else}
						Follow
					{/if}
				</p>
			</PrimaryButton>
			<ButtonAccent
				isBase
				onclick={() => {
					shellOpen(`https://mangadex.org/user/${data.id}`);
				}}
			>
				<p><ExternalLinkIcon /> Open in browser</p>
			</ButtonAccent>
			<ButtonAccent
				isBase
				disabled={!$isLogged || dev}
				onclick={() => {
					openReportDialog = true;
				}}
			>
				<p><FlagIcon />Report</p>
			</ButtonAccent>
		</div>
	{/snippet}
	{#snippet topRight()}
		<div>
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
	{/snippet}
	{#snippet _right()}
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
