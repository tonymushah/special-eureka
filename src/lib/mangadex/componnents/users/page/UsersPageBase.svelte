<!-- @migration-task Error while migrating Svelte code: This migration would change the name of a slot making the component unusable -->
<script lang="ts">
	import { kebabCase } from "lodash";
	import UsersPageBaseLayout from "./UsersPageBaseLayout.svelte";
	import Markdown from "@mangadex/componnents/markdown/Markdown.svelte";
	import profilePictureDef from "./images/story-profile-picture.jpg";
	import profileBannerDef from "./images/story-profile-banner.jpg";

	export let profilePicture: string = profilePictureDef;
	export let profileBanner: string = profileBannerDef;
	export let title: string;
	export let description: string = "";
	$: profilePictureAlt = `profile-picture-${kebabCase(title)}`;
</script>

<UsersPageBaseLayout bind:profileBanner>
	<article slot="left">
		<div class="cover">
			<img alt={profilePictureAlt} src={profilePicture} />
		</div>
	</article>
	<article class="right" slot="right">
		<div class="top">
			<h1>
				{title}
			</h1>
		</div>
		<div class="bottom">
			<slot name="top-right" />
		</div>
	</article>
	<article class="bottom" slot="bottom">
		<div class="top">
			<slot name="top-right" />
		</div>
		<div class="left">
			<slot name="left" />
		</div>
		<div class="right">
			<Markdown bind:source={description} />
			<slot name="right" />
		</div>
	</article>
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
