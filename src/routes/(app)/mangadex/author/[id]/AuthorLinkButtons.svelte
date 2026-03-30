<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { getFaviconSrcQuery } from "@mangadex/utils/favicons/getFaviconSrc";
	import { getContextClient } from "@urql/svelte";
	import { readable } from "svelte/store";
	import { BoxIcon, ExternalLinkIcon, GlobeIcon } from "@lucide/svelte";
	import { SiX as TwitterIcon, SiYoutube as YoutubeIcon } from "@icons-pack/svelte-simple-icons";
	import { openUrl as shellOpen } from "@tauri-apps/plugin-opener";
	import type { AuthorLinks } from "./layout.context";
	import Weibo from "@mangadex/componnents/icon/Weibo.svelte";
	import Tumblr from "@mangadex/componnents/icon/Tumblr.svelte";

	const client = getContextClient();
	interface Props {
		links: AuthorLinks;
	}

	let { links }: Props = $props();
	let twitter = getFaviconSrcQuery(
		() => links.twitter ?? "",
		() => links.twitter != undefined
	);
	let pixiv = getFaviconSrcQuery(
		() => links.pixiv ?? "",
		() => links.pixiv != undefined
	);
	let melonBook = getFaviconSrcQuery(
		() => links.melonBook ?? "",
		() => links.melonBook != undefined
	);
	let fanbox = getFaviconSrcQuery(
		() => links.fanBox ?? "",
		() => links.fanBox != undefined
	);
	let booth = getFaviconSrcQuery(
		() => links.booth ?? "",
		() => links.booth != undefined
	);
	let nicoVideo = getFaviconSrcQuery(
		() => links.nicoVideo ?? "",
		() => links.nicoVideo != undefined
	);
	let skeb = getFaviconSrcQuery(
		() => links.skeb ?? "",
		() => links.skeb != undefined
	);
	let fantia = getFaviconSrcQuery(
		() => links.fantia ?? "",
		() => links.fantia != undefined
	);
	let tumblr = getFaviconSrcQuery(
		() => links.tumblr ?? "",
		() => links.tumblr != undefined
	);
	let youtube = getFaviconSrcQuery(
		() => links.youtube ?? "",
		() => links.youtube != undefined
	);
	let weibo = getFaviconSrcQuery(
		() => links.weibo ?? "",
		() => links.weibo != undefined
	);
	let naver = getFaviconSrcQuery(
		() => links.naver ?? "",
		() => links.naver != undefined
	);
	let website = getFaviconSrcQuery(
		() => links.website ?? "",
		() => links.website != undefined
	);
</script>

{#if links.twitter}
	<ButtonAccent
		variant="3"
		onclick={() => {
			if (links.twitter) shellOpen(links.twitter);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if twitter.isSuccess}
					<img src={twitter.data} alt={links.twitter} />
				{:else}
					<TwitterIcon size={20} />
				{/if}
			</div>
			<h4>Twitter/X</h4>
		</div>
	</ButtonAccent>
{/if}

{#if links.pixiv}
	<ButtonAccent
		variant="3"
		onclick={() => {
			if (links.pixiv) shellOpen(links.pixiv);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if pixiv.isSuccess}
					<img src={pixiv.data} alt={links.pixiv} />
				{:else}
					<ExternalLinkIcon size={20} />
				{/if}
			</div>
			<h4>Pixiv</h4>
		</div>
	</ButtonAccent>
{/if}

{#if links.melonBook}
	<ButtonAccent
		variant="3"
		onclick={() => {
			if (links.melonBook) shellOpen(links.melonBook);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if melonBook.isSuccess}
					<img src={melonBook.data} alt={links.melonBook} />
				{:else}
					<ExternalLinkIcon size="20" />
				{/if}
			</div>
			<h4>MelonBook</h4>
		</div>
	</ButtonAccent>
{/if}

{#if links.fanBox}
	<ButtonAccent
		variant="3"
		onclick={() => {
			if (links.fanBox) shellOpen(links.fanBox);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if fanbox.isSuccess}
					<img src={fanbox.data} alt={links.fanBox} />
				{:else}
					<BoxIcon size="20" />
				{/if}
			</div>
			<h4>Fanbox</h4>
		</div>
	</ButtonAccent>
{/if}

{#if links.booth}
	<ButtonAccent
		variant="3"
		onclick={() => {
			if (links.booth) shellOpen(links.booth);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if booth.isSuccess}
					<img src={booth.data} alt={links.booth} />
				{:else}
					<ExternalLinkIcon size="20" />
				{/if}
			</div>
			<h4>booth</h4>
		</div>
	</ButtonAccent>
{/if}

{#if links.nicoVideo}
	<ButtonAccent
		variant="3"
		onclick={() => {
			if (links.nicoVideo) shellOpen(links.nicoVideo);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if nicoVideo.isSuccess}
					<img src={nicoVideo.data} alt={links.nicoVideo} />
				{:else}
					<TwitterIcon size={20} />
				{/if}
			</div>
			<h4>nicoVideo</h4>
		</div>
	</ButtonAccent>
{/if}

{#if links.skeb}
	<ButtonAccent
		variant="3"
		onclick={() => {
			if (links.skeb) shellOpen(links.skeb);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if skeb.isSuccess}
					<img src={skeb.data} alt={links.skeb} />
				{:else}
					<ExternalLinkIcon size="20" />
				{/if}
			</div>
			<h4>Skeb</h4>
		</div>
	</ButtonAccent>
{/if}

{#if links.fantia}
	<ButtonAccent
		variant="3"
		onclick={() => {
			if (links.fantia) shellOpen(links.fantia);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if fantia.isSuccess}
					<img src={fantia.data} alt={links.fantia} />
				{:else}
					<ExternalLinkIcon size="20" />
				{/if}
			</div>
			<h4>Fantia</h4>
		</div>
	</ButtonAccent>
{/if}

{#if links.tumblr}
	<ButtonAccent
		variant="3"
		onclick={() => {
			if (links.tumblr) shellOpen(links.tumblr);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if tumblr.isSuccess}
					<img src={tumblr.data} alt={links.tumblr} />
				{:else}
					<Tumblr size="20" />
				{/if}
			</div>
			<h4>Tumblr</h4>
		</div>
	</ButtonAccent>
{/if}

{#if links.youtube}
	<ButtonAccent
		variant="3"
		onclick={() => {
			if (links.youtube) shellOpen(links.youtube);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if youtube.isSuccess}
					<img src={youtube.data} alt={links.youtube} />
				{:else}
					<YoutubeIcon size={20} />
				{/if}
			</div>
			<h4>Youtube</h4>
		</div>
	</ButtonAccent>
{/if}

{#if links.weibo}
	<ButtonAccent
		variant="3"
		onclick={() => {
			if (links.weibo) shellOpen(links.weibo);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if weibo.isSuccess}
					<img src={weibo.data} alt={links.weibo} />
				{:else}
					<Weibo size="20" />
				{/if}
			</div>
			<h4>Weibo</h4>
		</div>
	</ButtonAccent>
{/if}

{#if links.naver}
	<ButtonAccent
		variant="3"
		onclick={() => {
			if (links.naver) shellOpen(links.naver);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if naver.isSuccess}
					<img src={naver.data} alt={links.naver} />
				{:else}
					<ExternalLinkIcon size="20" />
				{/if}
			</div>
			<h4>Naver</h4>
		</div>
	</ButtonAccent>
{/if}

{#if links.website}
	<ButtonAccent
		variant="3"
		onclick={() => {
			if (links.website) shellOpen(links.website);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if website.isSuccess}
					<img src={website.data} alt={links.website} />
				{:else}
					<GlobeIcon size="20" />
				{/if}
			</div>
			<h4>Website</h4>
		</div>
	</ButtonAccent>
{/if}

<style lang="scss">
	.button-inner {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
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
