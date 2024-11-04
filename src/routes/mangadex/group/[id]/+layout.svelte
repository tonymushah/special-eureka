<script lang="ts">
	import UsersPageBase from "@mangadex/componnents/users/page/UsersPageBase.svelte";
	import type { LayoutData } from "./$types";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import { BookmarkIcon, ExternalLinkIcon, FlagIcon } from "svelte-feather-icons";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { open as shellOpen } from "@tauri-apps/api/shell";
	import { writeText } from "@tauri-apps/api/clipboard";
	import { render as timeRender, cancel as timeCancel } from "timeago.js";
	import { onDestroy, onMount } from "svelte";
	import ScanalationGroupLinkButtons from "./ScanalationGroupLinkButtons.svelte";

	let timeAgo: HTMLTimeElement;
	onMount(() => {
		if (timeAgo) timeRender(timeAgo);
	});
	onDestroy(() => {
		if (timeAgo) timeCancel(timeAgo);
	});
	export let data: LayoutData;
	$: description = data.description ?? undefined;
	$: console.log(`duration: ${data.publishDelay}`);
	$: createdSince = new Date(data.createdAt);
</script>

<UsersPageBase title={data.name} {description}>
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
	<div slot="top-right">
		<p>
			Group ID: <span
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
				State: {#if data.locked}Locked{:else}Unlocked{/if},{#if data.official}
					Official,
				{/if}
				{#if data.verified}
					Verified,
				{/if}
				{#if data.exLicensed}
					exLicensed
				{/if}
			</p>
			<p>
				Created since <time datetime={createdSince.toDateString()} bind:this={timeAgo} />
			</p>
		</section>
	</div>
	<div slot="right">
		<section class="content">
			<slot />
		</section>
	</div>
</UsersPageBase>

<style lang="scss">
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
