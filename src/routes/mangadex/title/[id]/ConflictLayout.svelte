<script lang="ts">
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import type { LayoutData } from "./$types";
	import { ArrowLeftIcon } from "svelte-feather-icons";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import TagComponnentsFlex from "@mangadex/componnents/tag/TagComponnentsFlex.svelte";
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";
	import FlagIcon from "@mangadex/componnents/FlagIcon.svelte";
	import MangaStatus from "@mangadex/componnents/manga/page/top-info/MangaStatus.svelte";
	import { lowerCase, startCase } from "lodash";
	import ContentRatingTag from "@mangadex/componnents/content-rating/ContentRatingTag.svelte";

	interface Props {
		ingnoreConflict: boolean;
	}

	let { conflicts, ingnoreConflict = $bindable() }: Pick<LayoutData, "conflicts"> & Props =
		$props();
</script>

<div class="error">
	<h2>This title has conflicts with your current content profile.</h2>
	<div class="conflicts">
		{#if conflicts.tags.length != 0}
			<section>
				<h3>Tags</h3>
				<TagComponnentsFlex
					tags={conflicts.tags}
					onclick={(e) => {
						const { id } = e;
						goto(
							route("/mangadex/tag/[id]", {
								id
							})
						);
					}}
				/>
			</section>
		{/if}
		{#if conflicts.originalLanguage}
			<section>
				<h3>Original Language</h3>
				<div class="lang">
					<FlagIcon lang={conflicts.originalLanguage} />
					<span>{startCase(lowerCase(conflicts.originalLanguage))}</span>
				</div>
			</section>
		{/if}
		{#if conflicts.status}
			<section>
				<MangaStatus status={conflicts.status} />
			</section>
		{/if}
		{#if conflicts.publicationDemographic}
			<section>
				<h3>Publication Demographic</h3>
				<p>{startCase(lowerCase(conflicts.publicationDemographic))}</p>
			</section>
		{/if}
		{#if conflicts.contentRating}
			<section>
				<h3>Content Rating</h3>
				<ContentRatingTag contentRating={conflicts.contentRating} />
			</section>
		{/if}
	</div>
	<div class="buttons">
		<PrimaryButton
			isBase
			onclick={() => {
				history.back();
			}}
		>
			<h3>
				<ArrowLeftIcon />
				Get back
			</h3>
		</PrimaryButton>
		<ButtonAccent
			isBase
			onclick={() => {
				ingnoreConflict = !ingnoreConflict;
			}}
		>
			<h3>Continue</h3>
		</ButtonAccent>
	</div>
</div>

<style lang="scss">
	.error {
		display: flex;
		height: -webkit-fill-available;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		flex-wrap: nowrap;
		background-color: color-mix(in srgb, var(--danger-l1) 50%, transparent 50%);
		h2 {
			margin: 0px;
		}
	}
	.buttons {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 8px;
		margin: 10px;
		h3 {
			margin: 0px;
			display: flex;
			align-items: center;
			gap: 12px;
		}
	}
	.conflicts {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		section {
			h3 {
				margin: 0px;
				text-decoration: underline;
			}
		}
	}
</style>
