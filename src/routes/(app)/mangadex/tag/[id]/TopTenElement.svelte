<script lang="ts">
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";
	import ContentRatingTag from "@mangadex/componnents/content-rating/ContentRatingTag.svelte";
	import TagComponnentsFlex from "@mangadex/componnents/tag/TagComponnentsFlex.svelte";
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";
	import { ContentRating, CoverImageQuality, type Language } from "@mangadex/gql/graphql";
	import get_cover_art from "@mangadex/utils/cover-art/get_cover_art";
	import get_value_and_random_if_undefined from "@mangadex/utils/lang/get_value_and_random_if_undefined";
	import { getContextClient } from "@urql/svelte";

	interface Props {
		mangaId: string;
		coverId: string;
		title: Map<string, string>;
		originalLanguage: Language;
		tags: {
			id: string;
			name: Map<string, string>;
		}[];
		filename: string;
		cttRating?: ContentRating;
	}

	let {
		mangaId,
		coverId,
		filename,
		title: rawTitle,
		tags: rawTags,
		cttRating: contentRating = ContentRating.Safe
	}: Props = $props();

	const client = getContextClient();

	const cover_art = get_cover_art({
		cover_id: coverId,
		manga_id: mangaId,
		filename,
		client,
		mode: CoverImageQuality.V512
	});

	let title = $derived(get_value_and_random_if_undefined(rawTitle, "en") ?? mangaId);
	let tags = $derived(
		rawTags.map((d) => ({
			id: d.id,
			name: get_value_and_random_if_undefined(d.name, "en") ?? d.id
		}))
	);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<swiper-slide
	onclick={() => {
		goto(
			route("/mangadex/title/[id]", {
				id: mangaId
			})
		);
	}}
	tabindex="0"
	class="manga-element"
	data-manga-id={mangaId}
>
	{#if $cover_art}
		<img src={$cover_art} alt={coverId} />
	{:else}
		<Skeleton width="100%" height="100%" />
	{/if}
	<div class="content">
		<h4>{title}</h4>
		<TagComponnentsFlex
			{tags}
			onclick={() => {
				goto(
					route("/mangadex/tag/[id]", {
						id: mangaId
					})
				);
			}}
		>
			{#snippet pre()}
				<ContentRatingTag {contentRating} />
			{/snippet}
		</TagComponnentsFlex>
	</div>
</swiper-slide>

<style lang="scss">
	swiper-slide {
		width: 100%;
		position: relative;
		height: 200px;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			background-position: 0 -200px;
		}
	}
	swiper-slide:focus {
		border: 1px dashed var(--mid-tone);
		border-radius: 0.5em;
	}
	swiper-slide:global([data-selecto-selected]) {
		border: 2px dashed var(--primary-l2);
		border-radius: 1em;
	}
	.content {
		position: absolute;
		bottom: 1em;
		width: 80%;
		padding: 8px 12px;
		background-color: var(--accent-l5);
		border-radius: 1em;
		display: grid;
		gap: 4px;
	}
	.content:hover {
		background-color: var(--accent-l5-hover);
	}
	.content:active {
		background-color: var(--accent-l5-active);
	}
</style>
