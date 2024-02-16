<script lang="ts">
	import DefaultSpan from "@mangadex/componnents/theme/texts/span/DefaultSpan.svelte";
	import type { MangaStatus } from "@mangadex/gql/graphql";
	import { createEventDispatcher, onMount } from "svelte";
	import PublicationStatusTag from "../publicationStatusTag/PublicationStatusTag.svelte";
	import Layout from "./base1/Layout.svelte";
	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	export let coverImage: string;
	export let coverImageAlt: string;
	export let title: string;
	export let status: MangaStatus;
	export let description: string;
	let isLoadingImage = true;
	let isError = false;
	let isSuccess = false;
	onMount(() => {
		let timer: number | undefined = undefined;
		const img = new Image();
		img.addEventListener(
			"load",
			() => {
				if (timer) {
					window.clearTimeout(timer);
				}
				isLoadingImage = false;
				isSuccess = true;
			},
			{
				once: true
			}
		);
		img.addEventListener(
			"error",
			() => {
				if (timer) {
					window.clearTimeout(timer);
				}
				if (!isSuccess) {
					isLoadingImage = false;
					isError = true;
				}
			},
			{
				once: true
			}
		);
		img.src = coverImage;
		timer = window.setTimeout(() => {
			isLoadingImage = false;
			isError = true;
		});
	});
</script>

<Layout on:click>
	<div class="cover-image">
		<img src={coverImage} alt={coverImageAlt} />
	</div>
	<div class="content">
		<div class="title">
			<p>{title}</p>
		</div>
		<div class="publication">
			<DefaultSpan --font-size="12px"
				>Publication : <PublicationStatusTag {status} /></DefaultSpan
			>
		</div>
		<div class="description">
			<p>
				{description}
			</p>
		</div>
	</div>
</Layout>

<style lang="scss">
	div.cover-image {
		grid-area: cover;
	}
	div.cover-image > img {
		height: 160px;
		width: 100px;
		object-fit: cover;
	}
	div.title {
		font-weight: 800;
		font-size: 16px;
	}
	div.title > p {
		display: -webkit-box;
		margin: 2px;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		overflow: hidden;
		-webkit-box-orient: vertical;
	}
	div.publication {
		display: flex;
	}
	div.content {
		padding-left: 12px;
		grid-area: content;
		text-overflow: ellipsis;
		text-align: start;
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-items: center;
		gap: 8px;
	}
	div.description {
		font-size: 12px;
	}
	div.description > p {
		-webkit-box-orient: vertical;
		line-clamp: 3;
		-webkit-line-clamp: 3;
		display: -webkit-box;
		overflow: hidden;
		margin: 2px;
	}
</style>
