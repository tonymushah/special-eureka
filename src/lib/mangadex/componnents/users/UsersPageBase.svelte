<script lang="ts">
	import { kebabCase } from "lodash";
	import UsersPageBaseLayout from "./UsersPageBaseLayout.svelte";
	import Title from "../theme/texts/title/Title.svelte";
	import Markdown from "../markdown/Markdown.svelte";

	export let profilePicture: string;
	export let profileBanner: string;
	export let title: string;
	export let description: string;
	$: profilePictureAlt = `profile-picture-${kebabCase(title)}`;
</script>

<UsersPageBaseLayout bind:profileBanner>
	<article slot="left">
		<div class="cover">
			<img alt={profilePictureAlt} src={profilePicture} />
		</div>
		<div class="bottom">
			<slot name="left" />
		</div>
	</article>
	<article slot="right">
		<div class="top">
			<h1>
				{title}
			</h1>
		</div>
		<div class="bottom">
			<Markdown bind:source={description} />
			<slot name="right" />
		</div>
	</article>
	<article class="bottom" slot="bottom">
		<slot name="left" />
		<Markdown bind:source={description} />
		<slot name="right" />
	</article>
</UsersPageBaseLayout>

<style lang="scss">
	@media (width< 500px) {
		div.bottom {
			display: none;
		}
		article.bottom {
			display: block;
		}
	}
	@media (width >= 500px) {
		div.bottom {
			display: block;
		}
		article.bottom {
			display: none;
		}
	}
	@media (250px > width) {
		:root {
			--img-size: 3em;
		}
		img {
			padding: 0.2em;
		}
	}
	@media (250px <= width < 500px) {
		:root {
			--img-size: 3em;
		}
		h1 {
			font-size: 1em;
		}
		img {
			padding: 0.4em;
		}
	}
	@media (500px <= width < 800px) {
		:root {
			--img-size: 8em;
		}
		h1 {
			font-size: 1.2em;
		}
		img {
			padding: 0.6em;
		}
	}
	@media (800px <= width < 1200px) {
		:root {
			--img-size: 10em;
		}
		h1 {
			font-size: 2em;
		}
		img {
			padding: 0.8em;
		}
	}
	@media (width > 1200px) {
		:root {
			--img-size: 12em;
		}
		h1 {
			font-size: 2em;
		}
		img {
			padding: 1em;
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
	}
</style>
