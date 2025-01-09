<script lang="ts">
	import { kebabCase } from "lodash";
	import UsersPageBaseLayout from "./UsersPageBaseLayout.svelte";
	import Markdown from "@mangadex/componnents/markdown/Markdown.svelte";
	import profilePictureDef from "./images/story-profile-picture.jpg";
	import profileBannerDef from "./images/story-profile-banner.jpg";
	import type { Snippet } from "svelte";

	interface Props {
		profilePicture?: string;
		profileBanner?: string;
		title: string;
		description?: string;
		topRight?: Snippet;
		_left?: Snippet;
		_right?: Snippet;
	}
	let {
		profilePicture = profilePictureDef,
		profileBanner = profileBannerDef,
		title,
		description = "",
		topRight,
		_left,
		_right
	}: Props = $props();
	let profilePictureAlt = $derived(`profile-picture-${kebabCase(title)}`);
</script>

<UsersPageBaseLayout {profileBanner}>
	{#snippet left()}
		<article>
			<div class="cover">
				<img alt={profilePictureAlt} src={profilePicture} />
			</div>
		</article>
	{/snippet}
	{#snippet right()}
		<article class="right">
			<div class="top">
				<h1>
					{title}
				</h1>
			</div>
			<div class="bottom">
				{@render topRight?.()}
			</div>
		</article>
	{/snippet}
	{#snippet bottom()}
		<article class="bottom">
			<div class="top">
				{@render topRight?.()}
			</div>
			<div class="left">
				{@render _left?.()}
			</div>
			<div class="right">
				<Markdown source={description} />
				{@render _right?.()}
			</div>
		</article>
	{/snippet}
</UsersPageBaseLayout>

<style lang="scss">
	@media (width< 500px) {
		article.right {
			div.bottom {
				display: none;
			}
		}

		article.bottom {
			div.top {
				display: block;
			}
		}
	}
	@media (width >= 500px) {
		article.right {
			div.bottom {
				display: block;
			}
		}
		article.bottom {
			display: flex;
			div.left {
				--left-width: calc(var(--img-size) + var(--img-padding));
				min-width: var(--left-width);
				max-width: var(--left-width);
			}
			div.top {
				display: none;
			}
		}
	}
	@media (250px > width) {
		:root {
			--img-size: 3em;
			--img-padding: 0.2em;
		}
		img {
			padding: var(--img-padding);
		}
	}
	@media (250px <= width < 500px) {
		:root {
			--img-size: 3em;
			--img-padding: 0.4em;
		}
		h1 {
			font-size: 1em;
		}
		img {
			padding: var(--img-padding);
		}
	}
	@media (500px <= width < 800px) {
		:root {
			--img-size: 8em;
			--img-padding: 0.6em;
		}
		h1 {
			font-size: 1.2em;
		}
		img {
			padding: var(--img-padding);
		}
	}
	@media (800px <= width < 1200px) {
		:root {
			--img-size: 10em;
			--img-padding: 0.8em;
		}
		h1 {
			font-size: 2em;
		}
		img {
			padding: var(--img-padding);
		}
	}
	@media (width > 1200px) {
		:root {
			--img-size: 12em;
			--img-padding: 1em;
		}
		h1 {
			font-size: 2em;
		}
		img {
			padding: var(--img-padding);
		}
	}
	.cover {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	h1 {
		font-weight: 800;
		margin: 0.5em 0em;
	}
	img {
		border-radius: 100vh;
		object-fit: cover;
		width: var(--img-size);
		height: var(--img-size);
		aspect-ratio: 1/1;
	}
	article.bottom {
		padding: 0.5em;
		.right {
			width: -webkit-fill-available;
		}
	}
</style>
