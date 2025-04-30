<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import TimeAgo from "@mangadex/componnents/TimeAgo.svelte";
	import UsersPageBase from "@mangadex/componnents/users/page/UsersPageBase.svelte";
	import { writeText } from "@tauri-apps/plugin-clipboard-manager";
	import { openUrl as shellOpen } from "@tauri-apps/plugin-opener";
	import { BookmarkIcon, ExternalLinkIcon, FlagIcon } from "svelte-feather-icons";
	import type { LayoutData } from "./$types";
	import NavTab from "./NavTab.svelte";
	import ScanalationGroupLinkButtons from "./ScanalationGroupLinkButtons.svelte";

	interface Props {
		data: LayoutData;
		children?: import("svelte").Snippet;
	}

	let { data, children }: Props = $props();
	let description = $derived(data.description ?? undefined);
	$effect(() => {
		console.log(`duration: ${data.publishDelay}`);
	});
	$effect(() => {
		console.log(`since: ${data.createdAt}`);
	});
	let createdSince = $derived(data.createdAt);
	//$: console.log(`since date: ${createdSince}`);
</script>

<UsersPageBase title={data.name} {description}>
	{#snippet _left()}
		<div class="buttons">
			<PrimaryButton isBase>
				<p><BookmarkIcon />Follow</p>
			</PrimaryButton>
			<ButtonAccent
				isBase
				onclick={() => {
					shellOpen(`https://mangadex.org/group/${data.id}`);
				}}
			>
				<p><ExternalLinkIcon /> Open in browser</p>
			</ButtonAccent>
			<ButtonAccent isBase>
				<p><FlagIcon />Report</p>
			</ButtonAccent>
			<ScanalationGroupLinkButtons
				website={data.website ?? undefined}
				twitter={data.twitter ?? undefined}
				ircChannel={data.ircChannel ?? undefined}
				ircServer={data.ircServer ?? undefined}
				mangaUpdates={data.mangaUpdates ?? undefined}
				discord={data.discord ?? undefined}
				email={data.email ?? undefined}
			/>
		</div>
	{/snippet}

	{#snippet topRight()}
		<div class="info">
			<p>
				Group ID: <span
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
					{data.titles}
					<span>
						title{#if data.titles > 1}s{/if} scanlated
					</span>
				</p>
				<p>
					{data.uploads}
					<span>
						upload{#if data.uploads > 1}s{/if}
					</span>
				</p>
			</section>
			<section class="state">
				<p>
					State: {#if data.locked}Locked{:else}Unlocked{/if}{#if data.official}
						, Official
					{/if}
					{#if data.verified}
						, Verified
					{/if}
					{#if data.exLicensed}
						exLicensed
					{/if}
				</p>
				<p>
					Created <TimeAgo date={createdSince} />
				</p>
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
	.info {
		section {
			p {
				margin: 4px 0px;
			}
		}
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
	.copiable:hover {
		text-decoration: underline;
		cursor: pointer;
	}
	.content {
		margin-top: 8px;
	}
</style>
