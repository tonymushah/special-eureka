<script lang="ts">
	import UsersPageBase from "@mangadex/componnents/users/page/UsersPageBase.svelte";
	import type { LayoutData } from "./$types";
	import UserRoleBadge from "@mangadex/componnents/user/UserRoleBadge.svelte";
	import { writeText } from "@tauri-apps/plugin-clipboard-manager";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { ExternalLinkIcon, FlagIcon, BookmarkIcon } from "svelte-feather-icons";
	import { openUrl as shellOpen } from "@tauri-apps/plugin-opener";
	import NavTab from "./NavTab.svelte";
	import dexChanReading from "@mangadex/assets/artworks/dex-chan-reading.png";
	import dexChanXIndex from "@mangadex/assets/artworks/dex-and-index.png";
	import isFollowingUser, {
		followUserMutation,
		unfollowUserMutation
	} from "@mangadex/gql-docs/user/id/follow";
	import { isLogged } from "@mangadex/utils/auth";

	interface Props {
		data: LayoutData;
		children?: import("svelte").Snippet;
	}

	let { data, children }: Props = $props();
	const isFollowed = isFollowingUser(data.id, {
		toast: true,
		onSettled(error, variables) {
			console.log(error);
		}
	});
	let followMut = followUserMutation();
	let unfollowMut = unfollowUserMutation();
</script>

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
				disabled={followMut.isPending || unfollowMut.isPending || !$isLogged}
				onclick={() => {
					$isFollowed = !$isFollowed;
				}}
			>
				<p>
					{#if $isFollowed}
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
			<ButtonAccent isBase>
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
