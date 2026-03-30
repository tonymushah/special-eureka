<script lang="ts">
	import { CopyIcon, ExternalLinkIcon, GlobeIcon, MailIcon } from "@lucide/svelte";
	import { SiX as TwitterIcon } from "@icons-pack/svelte-simple-icons";
	import { writeText } from "@tauri-apps/plugin-clipboard-manager";
	import { openUrl as shellOpen } from "@tauri-apps/plugin-opener";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { getContextClient } from "@urql/svelte";
	import { readable } from "svelte/store";
	import Discord from "@mangadex/componnents/icon/Discord.svelte";
	import { getFaviconSrcQuery } from "@mangadex/utils/favicons/getFaviconSrc";

	interface Props {
		website?: string | undefined;
		twitter?: string | undefined;
		ircServer?: string | undefined;
		ircChannel?: string | undefined;
		mangaUpdates?: string | undefined;
		discord?: string | undefined;
		email?: string | undefined;
	}

	let {
		website = undefined,
		twitter = undefined,
		ircServer = undefined,
		ircChannel = undefined,
		mangaUpdates = undefined,
		discord = undefined,
		email = undefined
	}: Props = $props();

	const client = getContextClient();
	let websiteFavicon = getFaviconSrcQuery(
		() => website ?? "",
		() => website != undefined
	);
	let twitterFavicon = getFaviconSrcQuery(
		() => twitter ?? "",
		() => twitter != undefined
	);
	let mangaUpdatesFavicon = getFaviconSrcQuery(
		() => mangaUpdates ?? "",
		() => mangaUpdates != undefined
	);
</script>

{#if twitter}
	<ButtonAccent
		variant="3"
		onclick={() => {
			if (twitter) shellOpen(twitter);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if twitterFavicon.isSuccess}
					<img src={twitterFavicon.data} alt={twitter} />
				{:else}
					<TwitterIcon size={20} />
				{/if}
			</div>
			<h4>Twitter/X</h4>
		</div>
	</ButtonAccent>
{/if}

{#if website}
	<ButtonAccent
		variant="3"
		onclick={() => {
			if (website) shellOpen(website);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if websiteFavicon.isSuccess}
					<img src={websiteFavicon.data} alt={website} />
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
		onclick={() => {
			if (mangaUpdates) shellOpen(mangaUpdates);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if mangaUpdatesFavicon.isSuccess}
					<img src={mangaUpdatesFavicon.data} alt={mangaUpdates} />
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
		onclick={() => {
			if (discord) shellOpen(`https://discord.gg/${discord}`);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				<Discord size="20" />
			</div>
			<h4>Discord</h4>
		</div>
	</ButtonAccent>
{/if}

{#if ircChannel}
	<ButtonAccent
		variant="3"
		onclick={() => {
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
		onclick={() => {
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
		onclick={() => {
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
