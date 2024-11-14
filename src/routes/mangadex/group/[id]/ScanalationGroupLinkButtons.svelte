<script lang="ts">
	import {
		BoxIcon,
		CopyIcon,
		ExternalLinkIcon,
		GlobeIcon,
		MailIcon,
		TwitterIcon,
		YoutubeIcon
	} from "svelte-feather-icons";
	import { writeText } from "@tauri-apps/api/clipboard";
	import { open as shellOpen } from "@tauri-apps/api/shell";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { getContextClient } from "@urql/svelte";
	import { getFaviconSrc } from "@mangadex/utils/favicons/getFaviconSrc";
	import { readable } from "svelte/store";
	import { RiDiscordFill } from "svelte-remixicon";

	export let website: string | undefined = undefined;
	export let twitter: string | undefined = undefined;
	export let ircServer: string | undefined = undefined;
	export let ircChannel: string | undefined = undefined;
	export let mangaUpdates: string | undefined = undefined;
	export let discord: string | undefined = undefined;
	export let email: string | undefined = undefined;

	const client = getContextClient();
	$: websiteFavicon = website
		? getFaviconSrc({
				client,
				url: website
			})
		: readable(undefined);
	$: twitterFavicon = twitter
		? getFaviconSrc({
				client,
				url: twitter
			})
		: readable(undefined);
	$: mangaUpdatesFavicon = mangaUpdates
		? getFaviconSrc({
				client,
				url: mangaUpdates
			})
		: readable(undefined);
</script>

{#if twitter}
	<ButtonAccent
		variant="3"
		on:click={() => {
			if (twitter) shellOpen(twitter);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if $twitterFavicon}
					<img src={$twitterFavicon} alt={twitter} />
				{:else}
					<TwitterIcon size="20" />
				{/if}
			</div>
			<h4>Twitter/X</h4>
		</div>
	</ButtonAccent>
{/if}

{#if website}
	<ButtonAccent
		variant="3"
		on:click={() => {
			if (website) shellOpen(website);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if $websiteFavicon}
					<img src={$websiteFavicon} alt={website} />
				{:else}
					<GlobeIcon size="20" />
				{/if}
			</div>
			<h4>Website</h4>
		</div>
	</ButtonAccent>
{/if}

{#if mangaUpdates}
	<ButtonAccent
		variant="3"
		on:click={() => {
			if (mangaUpdates) shellOpen(mangaUpdates);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if $mangaUpdatesFavicon}
					<img src={$mangaUpdatesFavicon} alt={mangaUpdates} />
				{:else}
					<ExternalLinkIcon size="20" />
				{/if}
			</div>
			<h4>MangaUpdates</h4>
		</div>
	</ButtonAccent>
{/if}

{#if discord}
	<ButtonAccent
		variant="3"
		on:click={() => {
			if (discord) shellOpen(discord);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				<RiDiscordFill size="20" />
			</div>
			<h4>Discord</h4>
		</div>
	</ButtonAccent>
{/if}

{#if ircChannel}
	<ButtonAccent
		variant="3"
		on:click={() => {
			if (ircChannel) writeText(ircChannel);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				<CopyIcon size="20" />
			</div>
			<h4>IrcChannel</h4>
		</div>
	</ButtonAccent>
{/if}

{#if ircServer}
	<ButtonAccent
		variant="3"
		on:click={() => {
			if (ircServer) writeText(ircServer);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				<CopyIcon size="20" />
			</div>
			<h4>IrcServer</h4>
		</div>
	</ButtonAccent>
{/if}

{#if email}
	<ButtonAccent
		variant="3"
		on:click={() => {
			if (email) writeText(email);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				<MailIcon size="20" />
			</div>
			<h4>Contact E-Mail</h4>
		</div>
	</ButtonAccent>
{/if}

<style lang="scss">
	.button-inner {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
		margin: 2px;
		display: flex;
		gap: 8px;
		margin: 0px;
		font-weight: 700;
		font-size: 1.125em;
		align-items: center;
		justify-content: center;
		.icon {
			display: flex;
			align-items: center;
			justify-content: center;
			img {
				width: 20px;
				height: 20px;
			}
		}
		h4 {
			text-wrap: nowrap;
			margin: 0px;
		}
	}
</style>
