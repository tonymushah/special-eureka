<script lang="ts">
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import { ContentRating } from "@mangadex/gql/graphql";
	import { getMangaSearchContentRatingContextStoreWritable } from "../contexts/contentRating";
	import { PlusIcon, MinusIcon } from "svelte-feather-icons";

	const selected = getMangaSearchContentRatingContextStoreWritable();
	function toggleContentRating(rating: ContentRating) {
		selected.update((ratings) => {
			const includes = ratings.includes(rating);
			if (includes) {
				return ratings.filter((entry) => entry != rating);
			} else {
				ratings.push(rating);
				return ratings;
			}
		});
	}
</script>

<section class="layout">
	<Title type={3}>Content Rating</Title>
	<div class="content">
		<button
			class:selected={$selected.includes(ContentRating.Safe)}
			on:click={() => toggleContentRating(ContentRating.Safe)}
		>
			<div class="icon">
				{#if $selected.includes(ContentRating.Safe)}
					<MinusIcon />
				{:else}
					<PlusIcon />
				{/if}
			</div>
			Safe
		</button>
		<button
			class:selected={$selected.includes(ContentRating.Suggestive)}
			on:click={() => toggleContentRating(ContentRating.Suggestive)}
		>
			<div class="icon">
				{#if $selected.includes(ContentRating.Suggestive)}
					<MinusIcon />
				{:else}
					<PlusIcon />
				{/if}
			</div>
			Suggestive
		</button>
		<button
			class:selected={$selected.includes(ContentRating.Erotica)}
			on:click={() => toggleContentRating(ContentRating.Erotica)}
		>
			<div class="icon">
				{#if $selected.includes(ContentRating.Erotica)}
					<MinusIcon />
				{:else}
					<PlusIcon />
				{/if}
			</div>
			Erotica
		</button>
		<button
			class:selected={$selected.includes(ContentRating.Pornographic)}
			on:click={() => toggleContentRating(ContentRating.Pornographic)}
		>
			<div class="icon">
				{#if $selected.includes(ContentRating.Pornographic)}
					<MinusIcon />
				{:else}
					<PlusIcon />
				{/if}
			</div>
			Pornographic
		</button>
	</div>
</section>

<style lang="scss">
	.layout {
		display: grid;
		gap: 5px;
	}
	.content {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	button {
		display: flex;
		flex-direction: row;
		gap: 5px;
		padding: 5px;
		transition: background-color 200ms ease-in-out;
		background-color: var(--accent-l1);
		color: var(--text-color);
		font-size: var(--font-size);
		font-family: var(--fonts);
		border: none;
		border-radius: 0.25em;
	}
	button:hover {
		background-color: var(--accent-l1-hover);
	}
	button:active {
		background-color: var(--accent-l1-active);
	}
	button.selected {
		background-color: var(--primary-l1);
	}
	button.selected:hover {
		background-color: color-mix(in srgb, var(--primary-l1) 50%, var(--accent-l1-hover) 50%);
	}
	button.selected:active {
		background-color: color-mix(in srgb, var(--primary-l1) 50%, var(--accent-l1-active) 50%);
	}
</style>
