<script lang="ts">
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import { Demographic } from "@mangadex/gql/graphql";
	import { PlusIcon, MinusIcon } from "svelte-feather-icons";
	import { getMangaSearchPublicationDemographicContextStoreWritable } from "../contexts/publicationDemographic";

	const selected = getMangaSearchPublicationDemographicContextStoreWritable();
	function toggleDemographic(demographic: Demographic) {
		selected.update((demographics) => {
			const includes = demographics.includes(demographic);
			if (includes) {
				return demographics.filter((entry) => entry != demographic);
			} else {
				demographics.push(demographic);
				return demographics;
			}
		});
	}
</script>

<section class="layout">
	<Title type={3}>Demographic</Title>
	<div class="content">
		<button
			class:selected={$selected.includes(Demographic.None)}
			onclick={() => toggleDemographic(Demographic.None)}
		>
			<div class="icon">
				{#if $selected.includes(Demographic.None)}
					<MinusIcon />
				{:else}
					<PlusIcon />
				{/if}
			</div>
			None
		</button>
		<button
			class:selected={$selected.includes(Demographic.Josei)}
			onclick={() => toggleDemographic(Demographic.Josei)}
		>
			<div class="icon">
				{#if $selected.includes(Demographic.Josei)}
					<MinusIcon />
				{:else}
					<PlusIcon />
				{/if}
			</div>
			Josei
		</button>
		<button
			class:selected={$selected.includes(Demographic.Seinen)}
			onclick={() => toggleDemographic(Demographic.Seinen)}
		>
			<div class="icon">
				{#if $selected.includes(Demographic.Seinen)}
					<MinusIcon />
				{:else}
					<PlusIcon />
				{/if}
			</div>
			Seinen
		</button>
		<button
			class:selected={$selected.includes(Demographic.Shoujo)}
			onclick={() => toggleDemographic(Demographic.Shoujo)}
		>
			<div class="icon">
				{#if $selected.includes(Demographic.Shoujo)}
					<MinusIcon />
				{:else}
					<PlusIcon />
				{/if}
			</div>
			Shoujo
		</button>
		<button
			class:selected={$selected.includes(Demographic.Shounen)}
			onclick={() => toggleDemographic(Demographic.Shounen)}
		>
			<div class="icon">
				{#if $selected.includes(Demographic.Shounen)}
					<MinusIcon />
				{:else}
					<PlusIcon />
				{/if}
			</div>
			Shounen
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
