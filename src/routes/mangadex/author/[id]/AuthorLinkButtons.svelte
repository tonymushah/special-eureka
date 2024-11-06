<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import type { AuthorLinks } from "./proxy+layout";
	import { getFaviconSrc } from "@mangadex/utils/favicons/getFaviconSrc";
	import { getContextClient } from "@urql/svelte";
	import { readable } from "svelte/store";
	import {
		BoxIcon,
		ExternalLinkIcon,
		GlobeIcon,
		TwitterIcon,
		YoutubeIcon
	} from "svelte-feather-icons";
	import { open as shellOpen } from "@tauri-apps/api/shell";
	import { RiTumblrLine, RiWeiboLine } from "svelte-remixicon";

	const client = getContextClient();
	export let links: AuthorLinks;
	$: twitter = links.twitter
		? getFaviconSrc({
				client,
				url: links.twitter
			})
		: readable(undefined);
	$: pixiv = links.pixiv
		? getFaviconSrc({
				client,
				url: links.pixiv
			})
		: readable(undefined);
	$: melonBook = links.melonBook
		? getFaviconSrc({
				client,
				url: links.melonBook
			})
		: readable(undefined);
	$: fanbox = links.fanBox
		? getFaviconSrc({
				client,
				url: links.fanBox
			})
		: readable(undefined);
	$: booth = links.booth
		? getFaviconSrc({
				client,
				url: links.booth
			})
		: readable(undefined);
	$: nicoVideo = links.nicoVideo
		? getFaviconSrc({
				client,
				url: links.nicoVideo
			})
		: readable(undefined);
	$: skeb = links.skeb
		? getFaviconSrc({
				client,
				url: links.skeb
			})
		: readable(undefined);
	$: fantia = links.fantia
		? getFaviconSrc({
				client,
				url: links.fantia
			})
		: readable(undefined);
	$: tumblr = links.tumblr
		? getFaviconSrc({
				client,
				url: links.tumblr
			})
		: readable(undefined);
	$: youtube = links.youtube
		? getFaviconSrc({
				client,
				url: links.youtube
			})
		: readable(undefined);
	$: weibo = links.weibo
		? getFaviconSrc({
				client,
				url: links.weibo
			})
		: readable(undefined);
	$: naver = links.naver
		? getFaviconSrc({
				client,
				url: links.naver
			})
		: readable(undefined);
	$: website = links.website
		? getFaviconSrc({
				client,
				url: links.website
			})
		: readable(undefined);
</script>

{#if links.twitter}
	<ButtonAccent
		variant="3"
		on:click={() => {
			if (links.twitter) shellOpen(links.twitter);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if $twitter}
					<img src={$twitter} alt={links.twitter} />
				{:else}
					<TwitterIcon size="20" />
				{/if}
			</div>
			<h4>Twitter/X</h4>
		</div>
	</ButtonAccent>
{/if}

{#if links.pixiv}
	<ButtonAccent
		variant="3"
		on:click={() => {
			if (links.pixiv) shellOpen(links.pixiv);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if $pixiv}
					<img src={$pixiv} alt={links.pixiv} />
				{:else}
					<ExternalLinkIcon size="20" />
				{/if}
			</div>
			<h4>Pixiv</h4>
		</div>
	</ButtonAccent>
{/if}

{#if links.melonBook}
	<ButtonAccent
		variant="3"
		on:click={() => {
			if (links.melonBook) shellOpen(links.melonBook);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if $melonBook}
					<img src={$melonBook} alt={links.melonBook} />
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
		on:click={() => {
			if (links.fanBox) shellOpen(links.fanBox);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if $fanbox}
					<img src={$fanbox} alt={links.fanBox} />
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
		on:click={() => {
			if (links.booth) shellOpen(links.booth);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if $booth}
					<img src={$booth} alt={links.booth} />
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
		on:click={() => {
			if (links.nicoVideo) shellOpen(links.nicoVideo);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if $nicoVideo}
					<img src={$nicoVideo} alt={links.nicoVideo} />
				{:else}
					<TwitterIcon size="20" />
				{/if}
			</div>
			<h4>nicoVideo</h4>
		</div>
	</ButtonAccent>
{/if}

{#if links.skeb}
	<ButtonAccent
		variant="3"
		on:click={() => {
			if (links.skeb) shellOpen(links.skeb);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if $skeb}
					<img src={$skeb} alt={links.skeb} />
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
		on:click={() => {
			if (links.fantia) shellOpen(links.fantia);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if $fantia}
					<img src={$fantia} alt={links.fantia} />
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
		on:click={() => {
			if (links.tumblr) shellOpen(links.tumblr);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if $tumblr}
					<img src={$tumblr} alt={links.tumblr} />
				{:else}
					<RiTumblrLine size="20px" />
				{/if}
			</div>
			<h4>Tumblr</h4>
		</div>
	</ButtonAccent>
{/if}

{#if links.youtube}
	<ButtonAccent
		variant="3"
		on:click={() => {
			if (links.youtube) shellOpen(links.youtube);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if $youtube}
					<img src={$youtube} alt={links.youtube} />
				{:else}
					<YoutubeIcon size="20" />
				{/if}
			</div>
			<h4>Youtube</h4>
		</div>
	</ButtonAccent>
{/if}

{#if links.weibo}
	<ButtonAccent
		variant="3"
		on:click={() => {
			if (links.weibo) shellOpen(links.weibo);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if $weibo}
					<img src={$weibo} alt={links.weibo} />
				{:else}
					<RiWeiboLine size="20px" />
				{/if}
			</div>
			<h4>Weibo</h4>
		</div>
	</ButtonAccent>
{/if}

{#if links.naver}
	<ButtonAccent
		variant="3"
		on:click={() => {
			if (links.naver) shellOpen(links.naver);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if $naver}
					<img src={$naver} alt={links.naver} />
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
		on:click={() => {
			if (links.website) shellOpen(links.website);
		}}
		isBase
	>
		<div class="button-inner">
			<div class="icon">
				{#if $website}
					<img src={$website} alt={links.website} />
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
