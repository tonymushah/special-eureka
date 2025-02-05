<script lang="ts">
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import { MangaStatus } from "@mangadex/gql/graphql";
	import { PlusIcon, MinusIcon } from "svelte-feather-icons";
	import { getMangaSearchPublicationStatusContextStoreWritable } from "../contexts/publicationStatus";

	const selected = getMangaSearchPublicationStatusContextStoreWritable();
	function toggleStatus(staus: MangaStatus) {
		selected.update((statuses) => {
			const includes = statuses.includes(staus);
			if (includes) {
				return statuses.filter((entry) => entry != staus);
			} else {
				statuses.push(staus);
				return statuses;
			}
		});
	}
</script>

<section class="layout">
	<Title type={3}>Publication Status</Title>
	<div class="content">
		<button
			class:ongoing={$selected.includes(MangaStatus.Ongoing)}
			onclick={() => toggleStatus(MangaStatus.Ongoing)}
		>
			<div class="icon">
				{#if !$selected.includes(MangaStatus.Ongoing)}
					<MinusIcon />
				{:else}
					<PlusIcon />
				{/if}
			</div>
			Ongoing
		</button>
		<button
			class:completed={$selected.includes(MangaStatus.Completed)}
			onclick={() => toggleStatus(MangaStatus.Completed)}
		>
			<div class="icon">
				{#if !$selected.includes(MangaStatus.Completed)}
					<MinusIcon />
				{:else}
					<PlusIcon />
				{/if}
			</div>
			Complete
		</button>
		<button
			class:hiatus={$selected.includes(MangaStatus.Hiatus)}
			onclick={() => toggleStatus(MangaStatus.Hiatus)}
		>
			<div class="icon">
				{#if !$selected.includes(MangaStatus.Hiatus)}
					<MinusIcon />
				{:else}
					<PlusIcon />
				{/if}
			</div>
			Hiatus
		</button>
		<button
			class:cancelled={$selected.includes(MangaStatus.Cancelled)}
			onclick={() => toggleStatus(MangaStatus.Cancelled)}
		>
			<div class="icon">
				{#if !$selected.includes(MangaStatus.Cancelled)}
					<MinusIcon />
				{:else}
					<PlusIcon />
				{/if}
			</div>
			Cancelled
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
	button.ongoing {
		background-color: var(--status-green);
	}
	button.ongoing:hover {
		background-color: color-mix(in srgb, var(--status-green) 50%, var(--accent-l1-hover) 50%);
	}
	button.ongoing:active {
		background-color: color-mix(in srgb, var(--status-green) 50%, var(--accent-l1-active) 50%);
	}
	button.cancelled {
		background-color: var(--status-red);
	}
	button.cancelled:hover {
		background-color: color-mix(in srgb, var(--status-red) 50%, var(--accent-l1-hover) 50%);
	}
	button.cancelled:active {
		background-color: color-mix(in srgb, var(--status-red) 50%, var(--accent-l1-active) 50%);
	}
	button.completed {
		background-color: var(--status-blue);
	}
	button.completed:hover {
		background-color: color-mix(in srgb, var(--status-blue) 50%, var(--accent-l1-hover) 50%);
	}
	button.completed:active {
		background-color: color-mix(in srgb, var(--status-blue) 50%, var(--accent-l1-active) 50%);
	}
	button.hiatus {
		background-color: var(--status-purple);
	}
	button.hiatus:hover {
		background-color: color-mix(in srgb, var(--status-purple) 50%, var(--accent-l1-hover) 50%);
	}
	button.hiatus:active {
		background-color: color-mix(in srgb, var(--status-purple) 50%, var(--accent-l1-active) 50%);
	}
</style>
